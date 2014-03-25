/**
 * 坐标轴抽象类
 * @id RectangularChart
 * @extend CoordinateChart
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var RectangularContext = inherits( function(element) {
    CoordinateContext.call(this, element);
}, CoordinateContext );

extend( RectangularContext.prototype, {
    /*_parseData: function () {
        CoordinateContext.prototype._parseData.call(this);
    }*/
} );
