/**
 * 数值坐标轴
 * @id ValueAxis
 * @extend Axis
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

var ValueAxis = inherits( function(chart) {
   	Axis.call(this);
    this.chart = chart;

	/**
	 * @property {uint} gridCount 分割的数量
	 * @default 5
	 */
	this.gridCount = 5;


//	this.valueAxisModel = new ValueAxisData(chart, chart._chartConfig);

	this.labelContainer = new Group();
	this.addChild(this.labelContainer);
	this.labelsPool = new ElementPool(this.labelContainer, Text);

}, Axis );

extend( ValueAxis.prototype, {
	getPosition : function(value) {
        var axisdata = this.data,
            min = axisdata.min,
            max = axisdata.max;

        var dataPosition = (max - value) / (max - min);

        return dataPosition * this.axisLength;

		/*var position = this.valueAxisModel.getPosition(value) * this.axisLength;//chart.area.y +
//			trace(valueAxisModel.getPosition(value), value, axisLength);
		return position;*/
	},

	refresh : function () {
        Axis.prototype.refresh.call(this);

        var config = this.config,
            axisdata = this.data,
            dataArr = axisdata.dataArr,
            count = dataArr.length;

		this.labelsPool.begin();

//        this._ticks.clear();
        config.labelOffset = 0;//数值轴暂不要轴线，所以也没有偏移

		for (var i = 0; i < count; i++)
		{
			var value = dataArr[i];
			var text = value.toString();
            var p = this.getPosition(value);

			var label = this.labelsPool.next();
			label.font = config.labelFont;
			label.color = config.labelColor;

			if (this.labelFormatter != null) {
				label.text = this.labelFormatter(text);
			}
			else if (this.labelText) {
				label.text = StringUtil.replaceValue(this.labelText, text);
			}
			else {
				label.text = text;
			}
			/*if (this.unit && showUnit) {
				text = text + this.unit;
			}*/
			this._transformLabel(label, p);

//            this._ticks.moveTo(p, 0);
//            this._ticks.lineTo(p, config.tickLength);
		}//end for
//        this._ticks.update();

		this.labelsPool.end();
	}
} );
