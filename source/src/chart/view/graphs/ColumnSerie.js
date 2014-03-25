/**
 * 绘制数据序列的图形
 * @id ColumnSerie
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var ColumnSerie = inherits( function(chart, valueAxis) {
	Group.call(this);
    this.type = "column";
	this.chart = chart;

	this.graphIndex = 0;    //此条形图的序号
	this.graphCount = 1;    //条形图总数

	this.valueAxis = valueAxis;
	this.pool = new ElementPool(this);

}, Group );

extend( ColumnSerie.prototype, {
	refresh : function() {
		var chartConfig = this.chart._chartConfig,
            config = this.config,
            dataSource      = this.chart._dataSource,
            chartData = this.chart._chartData,
		    blockWidth = this.chart.serialAxis.blockWidth,
//            blockWidth = this.chart.serialAxis.blockWidth,
            startIndex = chartData.startIndex,
            endIndex = chartData.endIndex,
            categoryCount = chartData.serialLength;

		//原始柱子的宽度
		var barWidth = blockWidth * 0.7 / this.graphCount;
		barWidth = Math.min(barWidth, config.maxBarWidth);//控制最大宽度
		//柱子之间的间隔
		if (this.graphCount == 1) {
			var space = 0;
		}
		else {
			space = barWidth * 0.0;//间隔相对柱子的比例
		}
		var margin = blockWidth - barWidth*this.graphCount - space*(this.graphCount-1);
		var localX = margin/2 + this.graphIndex * (barWidth + space);

		this.pool.begin(Bar);
		for (var i = startIndex; i <= endIndex; i++)
		{
            var value = dataSource[i][config.valueKey];
            if (isNaN(value)) {
                continue;
            }

			var isnew = !this.pool.hasNext();
			var bar = this.pool.next();
			bar.graph = this;
			bar.index = i;
			bar.label = value;

            //样式
			if (config.useDifferentColor) {
				var fillColor = chartConfig.colors[i %  chartConfig.colors.length];
			}
			else {
                fillColor = config.fillColor;
			}
            bar.config = {
                lineAlpha : config.lineAlpha,
                lineThickness : config.lineThickness,
                lineColor : config.lineColor || ColorUtil.adjustBrightness(config.fillColor, -50),
                fillAlpha : config.fillAlpha,
                fillColor : fillColor
            };

			//使用主数值轴还是副数值轴的定位
			var x = this.chart.serialAxis.getPosition(i) + localX,
			    y = this.valueAxis.getPosition(0),
			    w = barWidth,
                h = this.valueAxis.getPosition(dataSource[i][config.valueKey]) - y;

            x = Math.round(x);
            y = Math.round(y);
            w = Math.round(w);
            h = Math.round(h);

            if (isnew) {
                bar.width = w;
                bar.height = 0;
            }
            bar.width = w;
            bar.height = h;

			bar.x = x;
            bar.y = y;
            bar.focusX = Math.round(x + w / 2);
            bar.focusY = y + h;

            bar.update();

            /*Tween.to(bar, 1, {
                width : w,
                height : h,
                onUpdate : "update"
            });*/
		}
		this.pool.end();
	}
} );
