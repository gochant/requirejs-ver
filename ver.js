// requirejs 插件 ver
define(function () {

    function isFunction(x) {
        return Object.prototype.toString.call(x) == '[object Function]';
    }
    function clone(obj) {
        if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
            return obj;

        if (obj instanceof Date)
            var temp = new obj.constructor(); //or new Date(obj);
        else
            var temp = obj.constructor();

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

                var resource = app.widget.normalizeConfig(resourceName);
                var pkg = app.widget._getPackagesFrom(resource);
                require.config({
                    packages: [pkg]
                });
                require([pkg.name], function (templateContent) {

                    var obj = templateContent;
                    if (obj._widgetName) {
                        obj._widgetName.push(resource.name);
                    } else {
                        obj._widgetName = [resource.name];
                    }

                    if (!isFunction(templateContent)) {                   
                        templateContent = app.view.define(obj);
                        templateContent.export = function () {
                            return clone(obj);
                        };
                    }
                    templateContent._widgetName = obj._widgetName;
                    templateContent._source = resource.options._source;
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
