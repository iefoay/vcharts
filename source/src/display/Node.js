/**
 * Node抽象类
 * @id Node
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Node = function () {
    this._dom = this._newNode();
};

extend(Node.prototype, {
    _newNode: function () {
        return null;
    },
    /*setAttr : function (attr) {
        attr(this._dom, attr);
        return this;
    },
    getAttr : function (name) {
        return this._dom.getAttribute(name);
    },*/
    parent: function () {
        return this._dom.parent();
    }

    /*getStyle: function (name) {
        return this._dom.style.getPropertyPriority(name);
    },
    setStyle: function (name, value) {
        this._dom.style.setProperty(name, value);
    },*/

});

