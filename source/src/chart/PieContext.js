/**
 * 饼图图表
 * @id PieChart
 * @extend Chart
 * @param {String} *element DOM节点名称
 * @param {Number} width 定义图表的宽度
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var PieContext = inherits(function (element) {

    this.type = "pie";
    this._chartConfig = Config.newPieConfig();

    Context.call(this, element);

    this.graph = null;

}, Context);

extend(PieContext.prototype, {
    _parseConfig : function () {
        Context.prototype._parseConfig.call(this);

        var chartConfig = this._chartConfig,
            dataSource = this._dataSource;

        if (chartConfig.colors && chartConfig.colors.length > 0) {
//            this.colors = config.colors;
        }
        else {
            chartConfig.colors = ColorUtil.createHueColors(dataSource.length);
        }
    },
    _parseData: function () {
        Context.prototype._parseData.call(this);

        var config = this._chartConfig,
            dataSource = this._dataSource,
            _totalNum = 0,
            graphicsData = [],
            graphicsTotal = 0,
            legendData = [];

        for (var i in dataSource) {
            var value = dataSource[i][config.valueKey] = Number(dataSource[i][config.valueKey]);
            _totalNum += value;
        }

//        this._graphicsData = [];
//        this._graphicsTotal = 0;
        if (_totalNum > 0) {
            for (i in dataSource) {
                var value = dataSource[i][config.valueKey];
                var percent = value / _totalNum;
                var v;
                if (percent > 0 && percent < 0.01)
                    v = 0.01 * _totalNum;
                else
                    v = value;
                graphicsTotal += v;
                graphicsData.push(v);
            }
        }

        for (i = 0; i < dataSource.length; i++) {
            legendData.push({
                name: dataSource[i][config.labelKey],
                color: config.colors[i % config.colors.length]
            });
        }

        //为视图提供更新数据
        this._viewProxy.setData({
            graphArr:         graphicsData,
            graphTotalNum:    graphicsTotal,
            legendArr:        legendData
        })
    }
});
