/**
 * 带坐标轴的图表视图
 * @id CoordinateChart
 * @extend Chart
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var CoordinateChart = inherits(function () {
    Chart.call(this);

    /**
     * @property {Plot} plot 绘图区域
     */
    this.plot;

    this.plot = this.addChild(this._newPlot());
    this.plot.x = 0.5;
    this.plot.y = 0.5;
    this.plot.update();


    this.axisContainer = this.addChild(new Group());
    this.axisContainer.x = 0.5;
    this.axisContainer.y = 0.5;
    this.axisContainer.update();
//    this.axisContainer.mouseChildren = this.axisContainer.mouseEnabled = false;

//        this.tooltipContainer = new Group();
//        this.tooltipContainer.mouseChildren = this.tooltipContainer.mouseEnabled = false;
//        this.addChild(this.tooltipContainer);

    this.addChild(this.graphContainer);

}, Chart);

extend(CoordinateChart.prototype, {
    _newPlot: function () {
        return null;
    },

    _configChart : function () {
        Chart.prototype._configChart.call(this);

        var chartConfig = this._chartConfig;
        this.plot.config = chartConfig.plot;
    }
});
