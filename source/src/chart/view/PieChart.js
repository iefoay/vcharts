/**
 * 饼图图表
 * @id PieChart
 * @extend Chart
 * @param {String} *element DOM节点名称
 * @param {Number} width 定义图表的宽度
 * @param {Number} height 定义图表的高度
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var PieChart = inherits(function () {
    Chart.call(this);

    this._legendData = null;

    this.addChild(this.graphContainer);

}, Chart);

extend(PieChart.prototype, {
    __init__: function () {
        Chart.prototype.__init__.call(this);
    },

    _configChart: function () {
        Chart.prototype._configChart.call(this);

        var chartConfig = this._chartConfig;

        /*if (chartConfig.colors && chartConfig.colors.length > 0) {
//            this.colors = config.colors;
        }
        else {
            chartConfig.colors = ColorUtil.createHueColors(this._dataSource.length);
        }*/


        if (!this.graphs[0]) {
            this.graphs[0] = new PieSerie(this);
            this.graphContainer.addChild(this.graphs[0]);
        }
        this.graphs[0].config = chartConfig.graph;

        var config = chartConfig.tooltip;
        if (this.tooltip) {
            if (config == null || (config && config.type == this.tooltip.config.type)) {
//                this.tooltip.destroy();
//                this.removeChild(this.tooltip);
//                this.tooltip = null;
            }
        }
        if (config) {
            if (this.tooltip == null) {
                this.tooltip = new SpiderTooltip(this);
                this.addChild(this.tooltip);
            }
            this.tooltip.config = config;
        }
    },

    _refreshChart: function () {
        Chart.prototype._refreshChart.call(this);

        this.graphArea.bottom -= 1;

        var graph = this.graphs[0],
            config = graph.config,
            graphArea = this.graphArea,
        	radius = Math.min((graphArea.right-graphArea.left) / 2, (graphArea.bottom-graphArea.top) / 2);

        config.radius = radius * 2.1/3;

        var x = Math.round( this.stageWidth / 2 ),
            y = Math.round( (this.graphArea.bottom + this.graphArea.top) / 2 );

//        x += 0.5;
//        y += 0.5;

        graph.x = x;
        graph.y = y;
        graph.update();
        graph.refresh();

        this._refreshLegend();

        if (this.tooltip) {
            this.tooltip.x = x;
            this.tooltip.y = y;
            this.tooltip.update();
            this.tooltip.refresh();
        }

    }
});
