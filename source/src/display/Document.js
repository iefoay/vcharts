/**
 * 舞台
 * @id Document
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Document =  inherits( function() {
    Group.call(this);
}, Group );

extend( Document.prototype, {
    _newNode: function () {
        return xmlRenderer.newDocument();
    }

} );

