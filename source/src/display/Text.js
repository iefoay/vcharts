/**
 * 文本元素
 * @id display.Text
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Text = inherits( function(text) {
	Element.call(this);

    this.font = "微软雅黑, 黑体, Verdana, Arial, Console";
    this.fontSize = 12;
    this.letterSpacing = 1;
    this.lineHeight = 3;
//    this.align = "start";//暂不支持
    this.color = "#666666";
    this.text = text || "";

}, Element );

extend( Text.prototype, {
    _newNode: function () {
        return xmlRenderer.newText();
    },

	update : function() {
        Element.prototype.update.call(this);

        xmlRenderer.setText(this);
        xmlRenderer.setTextFormat(this);
	}

} );

