/*
 * IconText
 * @id IconText
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var IconText = inherits(function () {
    Group.call(this);

    this._bg = this.addChild(new Shape());
    this._labelObject = this.addChild(new Text());

    this.onOver = false;
}, Group);

extend(IconText.prototype, {
    update : function () {
        Group.prototype.update.call(this);

        var config = this.config;

//        this._dom.style.whiteSpace = "nowrap";
//        this._dom.style.position = "static";
//        this._dom.style.styleFloat = "left";
//        var n = this._bg._dom;
//        n.style.position = "static";
//        n = this._labelObject._dom;
//        n.style.position = "static";
//        n.style.display = "block";

        this._labelObject.text = this.text;
        this._labelObject.x = 18;
        this._labelObject.update();

        var labelRect = this._labelObject.getRect(),
            w = 9,
            y;

        this._bg.clear();
        if (this.type == "line") {
            this._bg.beginStroke(2, config.fillColor, config.fillAlpha);
            y = Math.round(labelRect.height / 2);
            this._bg.moveTo(0, y);
            this._bg.lineTo(12, y);
        }
        else {
            this._bg.beginStroke(config.lineThickness, config.lineColor, config.lineAlpha);
            this._bg.beginFill(config.fillColor, config.fillAlpha);
            y = Math.max(0, Math.round( (labelRect.height - w) / 2 ));
            this._bg.drawRect(y, y, w, w);
        }
        this._bg.update();
    }
});

