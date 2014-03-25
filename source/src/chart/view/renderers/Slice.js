/**
 * 饼图切片
 * @id ers.slices.Slice
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var Slice = inherits( function() {
	Group.call(this);
	this._border = this.addChild( new Shape() );
	this._bg = this.addChild( new Shape() );


    this.borderAlpha = 0.8;

	this.startAngle = 0;
	this.endAngle = 0;
	this.radiusIn = 30;
	this.radius = 120;

    this._onOver = false;

    this.addEventListener("mouseover", overListener);
    this.addEventListener("mouseout", overListener);

    var _this = this;
    function overListener(event) {
        _this._onOver = event.type == "mouseover";
        _this.update();
    }
}, Group );

extend( Slice.prototype, {
	update : function() {
        Group.prototype.update.call(this);

        var config   = this.config,
            color    = config.fillColor;

        if (this.activated || this._onOver) {
            color = ColorUtil.adjustBrightness(color, 25);
        }

        this._border.clear();
        this._border.beginFill(config.lineColor, config.lineAlpha);
		this._drawSector(this._border, 0);
        this._border.update();

        this._bg.clear();
        this._bg.beginFill(color, config.fillAlpha);
		this._drawSector(this._bg, config.lineThickness);
        this._bg.update();
	},

	_drawSector : function(g, borderThickness) {
        var config       = this.config,
            margin		 = 0,//config.margin,
            a,
            r			 = margin + borderThickness,
            halfAngle	 = (this.endAngle - this.startAngle) / 2,//方向
            Oradius		 = r / Math.sin(halfAngle),
            outRadius	 = this.radius - borderThickness,
            inRadius	 = Math.max( Oradius, this.radiusIn + borderThickness );

        //				r = margin + borderThickness;
        a = Math.asin( r / outRadius );
        var sOutAngle = this.startAngle + a;
        var eOutAngle = this.endAngle - a;

        if (isNaN(a) || a < 0) return;
        if (sOutAngle >= eOutAngle) return;

        a = inRadius > 0 ? Math.asin( r / inRadius ) : 0;
        var sInAngle = this.startAngle + a;
        var eInAngle = this.endAngle - a;

        if (isNaN(a) || a < 0) return;
        if (sOutAngle >= eOutAngle) return;

		//绘制外弧线
//		var startX = Math.cos(sOutAngle) * outRadius;
//		var startY = Math.sin(sOutAngle) * outRadius;

//        g.arc(0, 0, 81.9, 2.4382174743525935, 4.71238898038469);
        g.arc(0, 0, outRadius, sOutAngle, eOutAngle, false, true);
        g.arc(0, 0, inRadius, eInAngle, sInAngle, true, false);
        g.close();
	}
} );

