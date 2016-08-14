// requirejs 插件 ver
define(function () {

    function isFunction(x) {
        return Object.prototype.toString.call(x) === '[object Function]';
    }
    function clone(obj) {
        if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
            return obj;

        var temp = obj instanceof Date ? new obj.constructor() : obj.constructor(); //or new Date(obj);

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }

        return temp;
    }

    var loadResource = function (resourceName, parentRequire, callback, config) {

        try {
            if (window) {
                var app = window.__verApp;  // 这里使用了全局的应用程序类，不太好

                // RequireJS会返回 pkgs 里面的路径，可能会造成路径不是配置时路径
                resourceName = resourceName.replace('/main', '');
                app.widget.package(resourceName);

                // 修复加载@路径失败的bug
                var name = resourceName.split('@')[0];
                require([name], function (templateContent) {

                    var obj = templateContent;
                    if (obj._widgetName) {
                        obj._widgetName.push(name);
                    } else {
                        obj._widgetName = [name];
                    }

                    if (!isFunction(templateContent)) {
                        templateContent = app.view.define(obj);
                        templateContent.export = function () {
                            return clone(obj);
                        };
                    }
                    templateContent._widgetName = obj._widgetName;
                    templateContent._source = app.widget.splitNameParts(resourceName).source;
                    callback(templateContent);

                });
            }
        } catch (e) {
            callback();
        }
    };

    return {
        load: loadResource
    };
});
