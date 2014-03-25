/**
 * 柱图矩形
 * @id Bar
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Bar = inherits( function() {
	Group.call(this);

    this.activated = false;
	this.onOver = false;

    this._bg = this.addChild(new Shape());
    this._light = this.addChild(new Shape());

    this.addEventListener("mouseover", overListener);

    var _this = this;
    function overListener(event) {
        event = EventUtil.getEvent(event);
        event.element = _this;
        event.targetType = "sprite";
    }
}, Group );

extend( Bar.prototype, {
    update : function() {
        Group.prototype.update.call(this);

        var config = this.config,
            color = config.fillColor,
            x = Math.min(this.width, 0),
            y = Math.min(this.height, 0),
            w = Math.abs(this.width),
            h = Math.abs(this.height);

        if (this.activated) {
            color = ColorUtil.adjustBrightness(config.fillColor, 25);
        }

        this._bg.clear();
        this._bg.beginFill(color, config.fillAlpha);
        this._bg.drawRect(x, y, w, h);
        this._bg.update();

        this._light.clear();
//        color = "url(#gradient" + ")";
        this._light.beginStroke(1, config.lineColor, config.lineAlpha);
        this._light.beginFill(color);
        this._light.drawRect(x, y, w, h);
        this._light.update();
    }
} );

