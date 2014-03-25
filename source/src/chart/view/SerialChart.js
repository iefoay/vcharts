/**
 * 序列图表视图
 * @id SerialChart
 * @extend RectangularChart
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var SerialChart = inherits( function() {
	RectangularChart.call(this);

	this.serialAxis = null;

	this.areaGraphs = [];//处理面积图、堆叠面积图
	this.barGraphs = [];//处理条形图、堆叠条形图
	this.lineGraphs = [];//处理曲线图

//    this.maskRect = xmlRenderer.newRect();

}, RectangularChart );

extend( SerialChart.prototype, {
	_configChart : function () {
		RectangularChart.prototype._configChart.call(this);

		var chartConfig = this._chartConfig,
            dataSource = this._dataSource,
            chartData = this._chartData;

        //系列轴
		if (!this.serialAxis) {
            this.serialAxis = new CategoryAxis(this);
            this.axisContainer.addChild(this.serialAxis);
        }
		this.serialAxis.config = chartConfig.serialAxis;

		//根据graphs和valueAxes同时决定分配
		if (!this.valueAxis) {
            this.valueAxis = new ValueAxis(this);
            this.axisContainer.addChild(this.valueAxis);
        }
		this.valueAxis.config = chartConfig.valueAxes[0];
        //分配子视图的更新数据
        this.valueAxis.data = chartData.valueAxes[0];
//        this.valueAxes = [this.valueAxis];

        var categoryAxis = this.serialAxis,
            categoryKey = chartConfig.serialKey;

		this.graphContainer.removeChildren();
		this.graphs = [];

//			var tempAreaGraphs = [];
		var tempBarGraphs = [];
		var tempLineGraphs = [];
		for (var i = 0; i < chartConfig.graphs.length; i++)
		{
			var graph;
			switch(chartConfig.graphs[i].type)
			{
//					case "area":
//						graph = new LineGraph(chart, valueAxis);
//						areaGraphs.push(graph);
//						break;
				case "column":
				case "bar":
					graph = this.barGraphs.shift() || new ColumnSerie(this, this.valueAxis);
					tempBarGraphs.push(graph);
					break;
				case "line":
					graph = this.lineGraphs.shift() || new LineGraph(this, this.valueAxis);
					tempLineGraphs.push(graph);
					break;
				default:
					continue;
					break;
			}

			graph.config = chartConfig.graphs[i];
			this.graphs.push(graph);
		}

//			chart.areaGraphs = tempAreaGraphs;
		this.barGraphs = tempBarGraphs;
		this.lineGraphs = tempLineGraphs;
		for (i = 0; i < this.barGraphs.length; i++) {
			var barGraph = this.barGraphs[i];
			barGraph.graphCount = this.barGraphs.length;
			barGraph.graphIndex = i;
			this.graphContainer.addChild(barGraph);
		}
		for (i = 0; i < this.lineGraphs.length; i++) {
			graph = this.lineGraphs[i];
			this.graphContainer.addChild(graph);
		}

		for (i = 0; i < this.graphs.length; i++) {
			graph = this.graphs[i];
//            graph.mask = this.maskRect;
//            graph.setAttr({
//                "clip-path" : "url(#clipPath)"
//            })

            graph.config.fillColor = graph.config.fillColor || chartConfig.colors[i % this.graphs.length]
		}

        //tooltip
        if (this.tooltip) {
            this.tooltip.destroy();
            this.removeChild(this.tooltip);
            this.tooltip = null;
        }
        if (chartConfig.tooltip) {
            if (this.tooltip == null) {
                this.tooltip = new NearestTooltip(this);
                this.tooltip.x = 0.5;
                this.tooltip.y = 0.5;
                this.tooltip.update();
                this.addChild(this.tooltip);
            }
            this.tooltip.config = chartConfig.tooltip;
            //				IGraphForTooltip(graph).setTip(new PieTipSpider(this));
        }
	},

	_refreshChart : function () {
		RectangularChart.prototype._refreshChart.call(this);

		var chartConfig = this._chartConfig;

		//ColumnChart方式
		if (!chartConfig.inverted) {
			var xAxis = this.serialAxis;
			var yAxis = this.valueAxis;
		}
		//BarChart方式
		else {
			xAxis = this.serialAxis;
			yAxis = this.valueAxis;
		}

		xAxis.direction = "x";
		yAxis.direction = "y";
		
		//初始实际图表尺寸
		this.plotArea = this.graphArea.clone();	//基于图形区域定义框体区域

        //边框显示
        this.plotArea.bottom -= 1;
        this.plotArea.right -= 1;
		this._adjustPlotArea([yAxis], [], [xAxis]);	//自动调整轴显示占用的区域
		this._adjustGraphArea();

		this.plot.refresh();

        var plotArea = this.plotArea,
            x = Math.round(plotArea.left) + 0.5,
            y = Math.round(plotArea.top) + 0.5;
        this.graphContainer.x = x;
        this.graphContainer.y = y;
//        this.graphContainer.visible = false;
        this.graphContainer.update();
		for (var i = 0; i < this.graphs.length; i++)
		{
			var graph = this.graphs[i];
			graph.refresh();
//			graph.x = x;
//            graph.y = y;
//            graph.update();
		}

        this._refreshLegend();

        if (this.tooltip) {
            this.tooltip.refresh();
        }
    }
} );
