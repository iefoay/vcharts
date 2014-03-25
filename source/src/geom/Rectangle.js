/**
 * Rectangle
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Rectangle = function(left, top, right, bottom) {
	this.left = left==null ? 0 : left;
	this.top = top==null ? 0 : top;
	this.right = right==null ? 0 : right;
	this.bottom = bottom==null ? 0 : bottom;
};

extend( Rectangle.prototype, {
	check : function() {
		if (this.right < this.left) this.right = this.left;
		if (this.bottom < this.top) this.bottom = this.top;
	},
	getWidth : function() {
		return this.right - this.left;
	},
	getHeight : function() {
		return this.bottom - this.top;
	},
	clone : function() {
		return new Rectangle(this.left, this.top, this.right, this.bottom);
	}
} );
