/**
 * 绘制数据序列的图形
 * @id PieSerie
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var PieSerie = inherits( function(chart) {
    Graph.call(this);
	this.chart = chart;

	this.pool = new ElementPool(this);

}, Graph );

extend( PieSerie.prototype, {
	refresh : function() {
        var chartConfig = this.chart._chartConfig,
            colors = chartConfig.colors,
            config = this.config,
            graphArr = this.chart._chartData.graphArr,
            graphTotalNum = this.chart._chartData.graphTotalNum,
            dataLen = this.chart._dataSource.length,
            beginAngle = (dataLen > 1) ? -Math.PI/2 : -Math.PI,
		    startAngle = beginAngle;

		this.pool.begin(Slice);
		for(var i = 0; i < dataLen ; i ++) {
            var color = colors[i %  colors.length];
			var isnew = this.pool.length == i;

			var sector = this.pool.next();
			sector.index = i;

            sector.config = {
                lineThickness : config.lineThickness,
                lineColor : config.lineColor || ColorUtil.adjustBrightness(color, -20),
                lineAlpha : config.lineAlpha,
                fillColor : color,
                fillAlpha : config.fillAlpha,
                margin : config.gap
            };
			
//					sector.outlineThicknesss = chartStyle.gap;
			//为了能看到数据值很小的图形，设置最小值
			var sectorAngle = Math.PI * 2 * (graphArr[i] / graphTotalNum);
			var endAngle = startAngle + sectorAngle;
			endAngle = Math.max(endAngle, startAngle);
			endAngle = Math.min(endAngle, beginAngle + Math.PI * 2);

            var radius = config.radius,
       			radiusIn = config.radius * config.innerRadius;

			if (isnew || true) {
				sector.radius = radius;
				sector.radiusIn = radiusIn;
				sector.startAngle = startAngle;
				sector.endAngle = endAngle;
			}
			sector.update();

			/*tweenLite = TweenLite.to(sector, _animationDuration, {
				radius:		chart.radius,
				radiusIn:	chart.innerRadius,
				startAngle:	startAngle,
				endAngle:	endAngle,
				onUpdate:	sector.render,
				ease:		Cubic.easeOut
			});//, onComplete:refreshTip});
//			_tweenLitees.push(tweenLite);
			*/
			startAngle = endAngle;
		}
		this.pool.end();
	}
} );
