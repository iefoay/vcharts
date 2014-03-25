/**
 * 坐标轴抽象类
 * @id CoordinateChart
 * @extend Chart
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var CoordinateContext = inherits(function (element) {
    Context.call(this, element);
}, Context);

extend(CoordinateContext.prototype, {
    _parseConfig: function () {
        Context.prototype._parseConfig.call(this);

        var chartConfig = this._chartConfig;

        if (chartConfig.colors && chartConfig.colors.length > 0) {
//            this.colors = chartConfig.colors;
        }
        else {
            chartConfig.colors = ColorUtil.createHueColors(chartConfig.graphs.length);
        }
    },

    _parseData: function () {
        Context.prototype._parseData.call(this);

        var chartConfig = this._chartConfig,
            graphs = chartConfig.graphs;

        /*if (chartConfig.colors && chartConfig.colors.length > 0) {
//            this.colors = chartConfig.colors;
        }
        else {
            chartConfig.colors = ColorUtil.createHueColors(chartConfig.graphs.length);
        }*/

        this._legendData = [];
        for (var i = 0; i < graphs.length; i++) {
            this._legendData.push({
                name: graphs[i].name,
                type: graphs[i].type,
                color: chartConfig.colors[i % chartConfig.colors.length]
            });
        }
    }
});
