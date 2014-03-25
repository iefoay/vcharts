/*
 * @id ValueAxisData
 * 数值轴的计算
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var ValueAxisData = function(config) {
//	this.chart = chart;
	this.config = config;

	this.axisData = null;
};

extend( ValueAxisData.prototype, {

	/*getPosition :function(value)
	{
//		console.log("ValueAxisData", this.maximum, value, this.minimum)
		return (this.maximum - value) / (this.maximum - this.minimum);
	},*/

	parseData : function (data, keys, startIndex, endIndex) {
		this.__searchMinAndMax(data, keys, startIndex || 0, endIndex || Number.MAX_VALUE);

//			this.minimum = this.dataMininum = min;
//			this.maximum = this.dataMaxinum = max;
		if (!isNaN(this.config.minValue)) {
			this.minimum = Math.min(this.minimum, this.config.minValue);//用户设置的数值
		}
		this.__checkMinAndMax();

		var range = this.maximum - this.minimum;

		//如果长度为0，强制显示一个
		/*if (config.autoGridCount == true) {
			var tempLength = (config.axisLength == 0) ? 1 : config.axisLength / (config.blockMin * 2.5);//间隔系数，暂定
		}
		else {*/
			var tempLength = this.config.gridCount;
//			}
		var tempMajorUnit = range / tempLength;
//			trace(maxNumLabels,range,tempMajorUnit)
		this.__calculateUnit(tempMajorUnit);

//		console.log("ValueAxisData", tempMajorUnit,range, tempLength);

		this.__adjustMin();this.__adjustMax();
		this.axisData = this.__calculateAxisData(true);
	},
	__searchMinAndMax : function(valuedata, keys, startIndex, endIndex)
	{
		var tempMininum;
		var tempMaxinum;

		endIndex = Math.min(valuedata.length, endIndex);
		for (var i = startIndex; i <= endIndex; i++)
		{
			var o = valuedata[i];
//				if (o.useSubAxis) continue;
			for (var n in keys)
			{
				var value = o[keys[n]];
				if (isNaN(value)) continue;

				tempMininum = isNaN(tempMininum) ? value : Math.min(value, tempMininum);
				tempMaxinum = isNaN(tempMaxinum) ? value : Math.max(value, tempMaxinum);
			}
		}

		this.minimum = this.dataMininum = tempMininum;
		this.maximum = this.dataMaxinum = tempMaxinum;
	},
	__calculateUnit : function(tempMajorUnit)
	{
		//10为底的对数
		var order = Math.ceil(Math.log(tempMajorUnit) * Math.LOG10E);

		if (this.config.onlyInteger || order == 0)//?只有10进制整数
		{
			tempMajorUnit = Math.pow(10, order);
		}
		else
		{
			var diff = Math.ceil(tempMajorUnit / Math.pow(10,order-1));
			tempMajorUnit = diff * Math.pow(10,order-1);
		}

		this.majorUnit = NumberUtil.roundToPrecision(tempMajorUnit, 10);
	},
	__checkMinAndMax : function()
	{
		if (this.minimum > this.maximum)
		{
			var tempnum = this.minimum;
			this.minimum = this.maximum;
			this.maximum = tempnum;
		}
		else if (this.minimum == this.maximum)
		{
			this.maximum = this.maximum + 1;
		}

		/*if (this.config.alwaysShow0 && this.minimum > 0)
		{
			this.minimum = 0;
		}*/
	},
	__adjustMin : function()
	{
		if (this.minimum != 0)
		{
			var oldMinimun = this.dataMininum;
			this.minimum = Math.floor(this.dataMininum / this.majorUnit) * this.majorUnit;
			if (oldMinimun == this.minimum)
			{
				this.minimum -= this.majorUnit;
			}
		}
		this.minimum = NumberUtil.roundToPrecision(this.minimum, 10);
	},
	__adjustMax : function()
	{
		if (this.maximum != 0)
		{
			var oldMaximum = this.dataMaxinum;
			this.maximum = Math.ceil(this.dataMaxinum / this.majorUnit) * this.majorUnit;
			if (oldMaximum == this.maximum)// && valueAxisStyle.oneMoreGrid
			{
				this.maximum += this.majorUnit;
			}
		}
		this.maximum = NumberUtil.roundToPrecision(this.maximum, 10);
	},
	__calculateAxisData : function(minlen)
	{
		var tempUnit = this.majorUnit;
		if (tempUnit == 0)
		{
			return [];
		}
		var value = this.minimum;

		//主轴创建前的修正工作，包括：最少1段
		if (minlen)
		{
			var length = this.config.autoGridCount ? 1 : this.config.gridCount;
			for (var i = 0; value < this.maximum || i < length; i++)
			{
				value = NumberUtil.roundToPrecision(value + tempUnit, 10);
			}

			//适当延长最大值
			/*if (config.oneMoreGrid && this.dataMaxinum > value - tempUnit/2)
			{
				this.maximum = roundToPrecision(value + tempUnit, 10);
			}
			//修正最大值
			else
			{*/
				this.maximum = value;
//				}
		}

		//开始创建轴数据（数组）
		value = this.minimum;
		var data = [value];//[getAxisData(value)];
		while (value < this.maximum)
		{
			value = NumberUtil.roundToPrecision(value + tempUnit, 10);
			data.push(value);//getAxisData(value)
		}

		return data;
	}
} );
