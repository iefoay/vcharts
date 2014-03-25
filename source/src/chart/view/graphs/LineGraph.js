/**
 * 绘制数据序列的图形
 * @id LineGraph
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var LineGraph = inherits( function(chart, valueAxis) {
    Graph.call(this);
    this.type = "line";
	this.chart = chart;
	this.valueAxis = valueAxis;

	this.lineShape = this.addChild(new Shape());
	this.dotContainer = this.addChild(new Group());
	this.pool = new ElementPool(this.dotContainer);

}, Graph );

extend( LineGraph.prototype, {
	refresh : function() {
		var config = this.config,
            plotArea = this.chart.plotArea,
            chartData = this.chart._chartData,
//            blockWidth = this.chart.serialAxis.blockWidth,
            startIndex = chartData.startIndex,
            endIndex = chartData.endIndex,
		    categoryCount = chartData.serialLength;

		var localX = this.chart.serialAxis.touchSide ? 0 : this.chart.serialAxis.blockWidth/2;


		this.pool.begin(Dot);
		for (var i = startIndex; i <= endIndex; i++)
		{
            var value = this.chart._dataSource[i][config.valueKey];
            if (isNaN(value)) {
                continue;
            }

			var isnew = this.pool.hasNext();
			var dot = this.pool.next();
			dot.graph = this;
			dot.index = i;
			dot.label = this.chart._dataSource[i][config.valueKey];

			dot.config = {
                lineAlpha : config.lineAlpha,
                lineThickness : config.lineThickness,
                lineColor : config.lineColor || config.fillColor,
                fillAlpha : 1,
                fillColor : "#ffffff"
            };

			//使用主数值轴还是副数值轴的定位
			var x = this.chart.serialAxis.getPosition(i) + localX;
			var y = this.valueAxis.getPosition(this.chart._dataSource[i][config.valueKey]);

            dot.focusX = x;
            dot.focusY = y;

			if (isnew || true) {
				dot.x = x;
                dot.y = plotArea.bottom - plotArea.top;
			}

            dot.y = y;

			dot.update();

			/*Tween.to(dot, 1, {
				y:		y,
				onUpdate : "update"
			});*/
		}
        /*Tween.to(this, 1, {
            onUpdate : "__refreshLines"
        });*/

		this.pool.end();
		this.__refreshLines();
	},
	__refreshLines : function()
	{
        var config = this.config;

        this.lineShape.clear();
		this.lineShape.beginStroke(config.lineThickness, config.lineColor || config.fillColor);

		this.pool.begin();
		var firstDot = this.pool.getChildAt(0);
		if (firstDot) {
            this.lineShape.moveTo(firstDot.x, firstDot.y);
		}

		for(var i = 0; i < this.pool.getLength(); i++)
		{
			var dot = this.pool.next();
            if (last && last.index + 1 == dot.index) {
                this.lineShape.lineTo(dot.x, dot.y);
            }
            else {
                this.lineShape.moveTo(dot.x, dot.y);
            }
            var last = dot;
		}
		this.lineShape.update();
	}
} );
