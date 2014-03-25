/**
 * 绘制图形区域
 * @id RectangularPlot
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var RectangularPlot = inherits(function (chart) {
    Group.call(this);
    this.chart = chart;

    this._bg = this.addChild(new Shape());
    this._grid = this.addChild(new Shape());
    this._basicGrid = this.addChild(new Shape());

}, Group);

extend(RectangularPlot.prototype, {
    refresh: function () {
        var config = this.config,
            plotRect = this.chart.plotArea,
            x = plotRect.left,
            y = plotRect.top,
            w = plotRect.right - plotRect.left,
            h = plotRect.bottom - plotRect.top,
            chartData = this.chart._chartData,
            valueAxis = this.chart.valueAxis,
            dataArr = chartData.valueAxes[0].dataArr;

        this._grid.clear();
        this._grid.beginStroke(config.borderThicknesss, config.borderColor, config.borderAlpha);
        this._basicGrid.clear();
        this._basicGrid.beginStroke(4, config.borderColor, config.borderAlpha);
        for (var i = 0; i < dataArr.length; i++) {
            var value = dataArr[i];
            var position = Math.round(valueAxis.getPosition(value) + y);
            if (value == 0) {
                this._basicGrid.moveTo(Math.round(x), position);
                this._basicGrid.lineTo(Math.round(x + w), position);
            }
            else {
                this._grid.moveTo(Math.round(x), position);
                this._grid.lineTo(Math.round(x + w), position);
            }
        }
        this._grid.lineDash = true;
        this._grid.update();
        this._basicGrid.update();

         /*this._bg.clear();
         this._bg.beginFill(config.backgroundColor, config.backgroundAlpha);
         this._bg.drawRect(x, y, w, h);
         this._bg.update();*/
    }
});
