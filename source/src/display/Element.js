/**
 * Element抽象类
 * @id Element
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Element = inherits( function() {
	Node.call(this);

    this._visible = this.visible = true;
    this._alpha = this.alpha = 1;

	this._x = this.x = 0;
	this._y = this.y = 0;
//    this.width = 0;
//    this.height = 0;
	this._rotate = this.rotation = 0;

    this.mask = null;
}, Node );

extend( Element.prototype, {

    addEventListener: function (type, listener) {
        EventUtil.addHandler(this._dom, type, listener);
    },
    removeEventListener: function (type, listener) {
        EventUtil.removeHandler(this._dom, type, listener);
    },
    /*dispatchEvent: function (event) {
        EventUtil.dispatchEvent(this._dom, event);
    },*/

	getRect : function() {
        /*var rect = this._dom.getBBox();
		*/

//        return getBBox(this._dom);

        var rect = xmlRenderer.getRect(this);
		return rect;

		//找到在某点上的对象： elementFromPoint();
	},
	/*getTranslate : function () {
		return this._dom.currentTranslate;
	},*/

    update : function() {
//        Node.prototype.update.call(this);
        xmlRenderer.setAttr(this);
    }

} );

