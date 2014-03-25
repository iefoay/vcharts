/**
 * 柱图矩形
 * @id Bar
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var GroupBalloon = inherits( function() {
	Group.call(this);

    this.text = "";

    this._bg = this.addChild(new Shape());
    this._labelObject = this.addChild(new Text());
}, Group);

extend( GroupBalloon.prototype, {
	update : function() {
        Group.prototype.update.call(this);

        this._labelObject.text = this.text;
        this._labelObject.update();

        var config = this.config,
            textRect = this._labelObject.getRect(),
            padding = 10,
            width = Math.max(textRect.width + padding * 2, 18),
            height = Math.max(textRect.height + padding * 2, 12);

        this._labelObject.x = padding;
        this._labelObject.y = padding;
        this._labelObject.update();

        this._bg.clear();
        this._bg.beginStroke(config.borderThickness, config.borderColor, config.borderAlpha);
        this._bg.beginFill(config.backgroundColor, config.backgroundAlpha);
        this._bg.drawRect(0, 0, width, height, 5);
        this._bg.update();
	}

} );

