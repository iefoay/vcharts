/**
 * 种类、序列坐标轴
 * @id CategoryAxis
 * @extend Axis
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var CategoryAxis = inherits( function(chart) {
	Axis.call(this);
	this.chart  = chart;

	this.touchSide = false;

	this.labelsPool = new ElementPool(this);

}, Axis );

extend( CategoryAxis.prototype, {
	getPosition : function(index)
	{
		if (this.chart._dataSource == null) return NaN;

        var chartConfig     = this.chart._chartConfig,
            chartData = this.chart._chartData,
            categoryCount = chartData.serialLength;

		var len = this.touchSide ? (categoryCount-1) : categoryCount;
		var xp = this.axisLength * (index / len);

		return xp;
	},
	getIndex : function(x, y)
	{
        var rect = this.chart.plotArea,
            width = rect.right - rect.left,
            height = rect.bottom - rect.top;

		if (x > 0 && y > 0 && x < width && y < height) {
			var i = x / this.blockWidth;
			if (this.touchSide) {
				return Math.round(i);
			}
			else {
				return Math.floor(i);
			}
		}
		return -1;
	},
	refresh : function () {
        Axis.prototype.refresh.call(this);

        var dataSource      = this.chart._dataSource,
            chartConfig     = this.chart._chartConfig,
            config          = this.config,
            chartData = this.chart._chartData,
            startIndex = chartData.startIndex,
            endIndex = chartData.endIndex,
            categoryCount = chartData.serialLength;

		if (this.touchSide && categoryCount>1) {
			this.blockWidth = this.axisLength/(categoryCount-1);
		}
		else {
			this.blockWidth = this.axisLength/categoryCount;
		}

		_maxLength = NaN;
		_labels = [];
		this.labelsPool.begin(Text);

        this._ticks.clear();

		var r = -45;//角度
		var a = r * Math.PI / 180;//弧度
		for (var i = startIndex; i <= endIndex; i++)
		{
			var label = this.labelsPool.next();
			var text = dataSource[i][chartConfig.serialKey];
			/*if (config.labelFormatter != null) {
				label.text = config.labelFormatter(text);
			}
			else if (config.labelText) {
				label.text = StringUtil.replaceValue(this.labelText, text);
			}
			else {
				label.text(text);
			}*/
				label.text = text;

			label.fontSize = config.labelSize;
            label.color = config.labelColor;

//				labelContainer.addChild(label);
			var p = this.getPosition(i);

            this._ticks.moveTo(p, 0);
            this._ticks.lineTo(p, config.tickLength);

			if (this.touchSide == false)
			{
				p += this.blockWidth / 2;
			}
			this._transformLabel(label, p);
//				label.y = this.labelOffset;

			/*if (this.use45Label)
			{
				var front45 = label.width * Math.cos(a);
				label.rotationZ = r;

				label.x -= front45;
				label.y += front45;
			}
			else
			{
				label.x -= label.width / 2;
			}*/
		}//end for

        this._ticks.update();

		this.labelsPool.end();
	}
} );
