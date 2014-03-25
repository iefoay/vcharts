/*
 * Point
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Point = function(x, y) {
	this.x = x==null ? 0 : x;
	this.y = y==null ? 0 : y;
};

extend( Point.prototype, {
	clone : function() {
		return new Point(this.x, this.y);
	}
} );
