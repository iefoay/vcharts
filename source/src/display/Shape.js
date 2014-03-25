/**
 * 图形元素基类
 * @id Shape
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Shape = inherits(function () {
    Element.call(this);

    this._drawLine = false;

    this.lineDash = false;
    this.lineWidth = 1;
    this.lineColor = "#333333";
    this.lineAlpha = 1;

    this._drawFill = false;

    this.fillColor = "#ffeeff";
    this.fillAlpha = 1;

    this.gradientType = "solid";//solid | linear | radial
    this.colors = ["#ffffff", "#ffffff"];
    this.alphas = [1, 1];
    this.ratios = [0, 1];

    this.dataArr = [M, 0, 0];
}, Element);

extend(Shape.prototype, {
    _newNode: function () {
        return xmlRenderer.newPath();
    },

    /*
     * 设置描边属性
     * @method beginStroke
     * @public
     * @param {Number} lineWidth 线条宽度，不传值则继续使用上次的值
     * @param {Number} lineAlpha 线条透明度，不传值则继续使用上次的值
     * @example
     * graphics.beginStroke();
     */
    beginStroke: function (thickness, color, alpha) {
        this._drawLine = true;
        this.lineWidth = thickness || this.lineWidth;
        this.lineColor = color || this.lineColor;
        this.lineAlpha = alpha || this.lineAlpha;
        return this;
    },
    stopStroke: function () {
        this._drawLine = false;
        return this;
    },
    beginFill: function (color, alpha) {
        this._drawFill = true;
        this.fillColor = color || this.fillColor;
        this.fillAlpha = alpha || this.fillAlpha;
        return this;
    },

    stopFill: function () {
        this._drawFill = false;
        return this;
    },

    clear : function() {
        this.dataArr = [M, 0, 0];
        return this;
    },

    close : function() {
        if (this.dataArr.length > 1 && this.dataArr[this.dataArr.length] != Z) {
            this.dataArr.push(Z);
        }
        return this;
    },
    moveTo : function(x, y) {
        this.dataArr.push(M, x, y);
        return this;
    },
    lineTo : function(x, y) {
        this.dataArr.push(L, x, y);
        return this;
    },
    curveTo : function(x1, y1, x2, y2, x, y) {
        this.dataArr.push(C, x1, y1, x2, y2, x, y);
//        this.dataArr = this.dataArr.concat(xmlRenderer.curveTo.apply(this, arguments));
        return this;
    },
    arc : function(x, y, radius, startAngle, endAngle, anticlockwise, autoMove) {
        anticlockwise = !!anticlockwise;
        autoMove = !!autoMove;
//        if (!isNaN(startAngle))  startAngle = startAngle % Math.PI * 2;
//        if (!isNaN(endAngle))    endAngle = endAngle % Math.PI * 2;
//        this.dataArr.push(M, 100, 100, Q, 200,200, 300,200, 400,100, 700, 200);
        this.dataArr = this.dataArr.concat(xmlRenderer.arc.apply(this, arguments));
        return this;
    },

    drawRect: function(x, y, width, height, radius) {
        this.dataArr = this.dataArr.concat(xmlRenderer.rect.apply(this, arguments));
        return this;
    },

    drawCircle: function(x, y, radius) {
        this.dataArr = this.dataArr.concat(xmlRenderer.circle.apply(this, arguments));
        return this;
    },

    update : function() {
        Element.prototype.update.call(this);
        xmlRenderer.draw(this);

        return this;
    }
});

