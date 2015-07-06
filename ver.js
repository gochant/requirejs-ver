// requirejs 插件 ver
define(function () {

    function isFunction(x) {
        return Object.prototype.toString.call(x) == '[object Function]';
    }

    var loadResource = function (resourceName, parentRequire, callback, config) {

        try {
            if (window) {
                var app = window.__verApp;  // 这里使用了全局的应用程序类，不太好

                // RequireJS会返回 pkgs 里面的路径，可能会造成路径不是配置时路径
                resourceName = resourceName.replace('/main', '');
                app.widget.package(resourceName);

                parentRequire([resourceName], function (templateContent) {

                    if (!isFunction(templateContent)) {
                        templateContent = app.view.define(templateContent);
                    }
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
