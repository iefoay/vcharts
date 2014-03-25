/**
 * 线图关键点
 * @id Dot
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var Dot = inherits(function () {
    Group.call(this);

    this.activated = false;

    this._bg = this.addChild(new Shape());

}, Group);

extend(Dot.prototype, {
    update : function () {
        var config = this.config;

        this.visible = this.activated;

        this._bg.clear();
        //ColorUtil.adjustBrightness(color, -er)
        if (this.activated) {
            this._bg.beginStroke(config.lineThickness, config.lineColor, config.lineAlpha);
            this._bg.beginFill(config.fillColor);
            this._bg.drawCircle(0, 0, 4);
        }
        this._bg.update();

        Group.prototype.update.call(this);
    }
});

