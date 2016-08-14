# requirejs-ver

veronica ��һ�� requirejs ��������ڼ��� widget

## ʹ�÷���

- �������Ϊ����ͼ

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

- ����������չ����д

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