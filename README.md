# requirejs-ver

veronica 的一个 requirejs 插件，用于加载 widget

## 使用方法

- 引入后作为子视图

```js
define([
  'ver!sub-view'
], function (SubView) {

    return {
        views: function () {
            return {
                'sub': {
                    host: '.data-sub',
                    initializer: SubView,
                    options: {
                        data: {}
                    }
                }
            }
        }
    };
});
```

- 引入后进行扩展或重写

```js
define([
  'ver!sub-view'
], function (baseFactory) {
    var base = baseFactory.export();

    var originalRender = base.render;
    base.render = function () {
        originalRender.apply(this, Array.prototype.slice.call(arguments));

        // custom code
        console.log('rendered');
    }

    return base;
});
```