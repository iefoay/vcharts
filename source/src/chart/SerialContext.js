/**
 * 序列图表
 * @id SerialChart
 * @extend RectangularChart
 * @param {String} *element DOM节点名称
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var SerialContext = inherits( function(element) {
    this.type = "serial";
    this._chartConfig = Config.newSerialConfig();

    RectangularContext.call(this, element);


    this._startIndex = 0;
    this._endIndex = Number.MAX_VALUE;
    this._serialCount = 1;

}, RectangularContext );

extend( SerialContext.prototype, {
    _parseConfig : function () {
        RectangularContext.prototype._parseConfig.call(this);
        var chartConfig = this._chartConfig,
            valueAxes = chartConfig.valueAxes,
            graphs = chartConfig.graphs;

        if (valueAxes.length == 1) {
            //默认自动添加所有图形中的Key
            valueAxes[0].valueKeys = [];
            for (var i = 0; i < graphs.length; i++) {
                valueAxes[0].valueKeys[i] = graphs[i].valueKey;

                switch (graphs[i].type) {
                    //保证有0
                    case "column":
                    case "bar":
                        valueAxes[0].minValue = 0;
                        break;
                }
            }
        }
    },

    _parseData : function () {
        RectangularContext.prototype._parseData.call(this);

        var chartConfig = this._chartConfig,
            dataSource = this._dataSource;

        if (!dataSource) {
            return;
        }

        //if (chartConfig.autoSerialCount) {
        this._startIndex = 0;
        this._endIndex = Math.max(this._startIndex, dataSource.length - 1);
        this._serialCount = Math.max(chartConfig.minSerialCount, dataSource.length - this._startIndex);


        var valueAxisData = new ValueAxisData(chartConfig.valueAxes[0]);
        valueAxisData.parseData(dataSource, chartConfig.valueAxes[0].valueKeys, this._startIndex, this._endIndex);


        //设置显示数据
        this._viewProxy.setData({
            startIndex : this._startIndex,
            endIndex : this._endIndex,
            serialLength : this._serialCount,
            valueAxes:  [{
                dataArr:    valueAxisData.axisData,
                min:        valueAxisData.minimum,
                max:        valueAxisData.maximum
            }],
            valueLines : valueAxisData.axisData,    //数值线数据
            legendArr:     this._legendData
        });
    }
} );
