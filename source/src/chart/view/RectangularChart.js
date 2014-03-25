/**
 * 带矩形坐标轴的图表视图
 * @id RectangularChart
 * @extend CoordinateChart
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var RectangularChart = inherits( function() {
	CoordinateChart.call(this);

    this.repeatCount = 0;

	this._top = 0;
	this._bottom = 0;
	this._left = 0;
	this._right = 0;

}, CoordinateChart );

extend( RectangularChart.prototype, {
	_newPlot : function() {
		return new RectangularPlot(this);
	},

    _svgDefs: function () {
        CoordinateChart.prototype._svgDefs.call(this);

        //剪裁
        this.graphClip = xmlRenderer._newNode("clipPath");
        this.graphClip.id = "vcharts-graph-clip";
        this.defs.appendChild(this.graphClip);

        this.clipRect = new Shape();
        this.graphClip.appendChild(this.clipRect._dom);
    },

	_adjustAxes : function(leftAxes, rightAxes, bottomAxes) {
		//计算并检查是否还需要继续校正
		var maxTop = 0;		//最大的上边距
		var maxBottom = 0;	//最大的下边距
		var addLeft = 0;	//累计轴占用的左边距
		for (var i = 0; i < leftAxes.length; i++)
		{
			var axis = leftAxes[i];
			axis.axisLength = this.plotArea.bottom - this.plotArea.top;
			axis.refresh();
			maxTop		= Math.max(maxTop, axis.backSpace, 0);
			maxBottom	= Math.max(maxBottom, axis.frontSpace, 0);
			if (axis.config.labelInside == false) {
				addLeft += axis.config.offset + axis.getRect().width;
			}
            axis.x = Math.round(this.plotArea.left - axis.config.offset);
            axis.y = Math.round(this.plotArea.top);
            axis.update();
		}
		var addRight = 0;	//累计轴占用的右边距
		for (i = 0; i < rightAxes.length; i++)
		{
			axis = rightAxes[i];
			axis.axisLength = this.plotArea.bottom - this.plotArea.top;
			axis.refresh();
			maxTop		= Math.max(maxTop, axis.backSpace, 0);
			maxBottom	= Math.max(maxBottom, axis.frontSpace, 0);
			if (axis.config.labelInside == false) {
				addRight += axis.config.offset + axis.getRect().width;
			}
            axis.x = Math.round(this.plotArea.right + axis.config.offset);
            axis.y = Math.round(this.plotArea.top);
            axis.update();
		}
		var maxLeft = 0;	//最大的横轴左边距
		var maxRight = 0;	//最大的横轴右边距
		var addTop = 0;		//累计轴占用的上边距
		var addBottom = 0;	//累计轴占用的下边距
		for (i = 0; i < bottomAxes.length; i++)
		{
			axis = bottomAxes[i];
			axis.axisLength = this.plotArea.right - this.plotArea.left;
			axis.refresh();
			maxLeft	= Math.max(maxLeft, axis.frontSpace, 0);

			maxRight	= Math.max(maxRight, axis.backSpace, 0);
			if (axis.config.labelInside == false) {
				addBottom += axis.config.offset + axis.getRect().height;
			}
            axis.x = Math.round(this.plotArea.left);
            axis.y = Math.round(this.plotArea.bottom + axis.config.offset);
            axis.update();
		}

		this._top		 = Math.max(addTop, 	maxTop);
		this._bottom	 = Math.max(addBottom, 	maxBottom);
		this._left  	 = Math.max(addLeft, 	maxLeft);
		this._right 	 = Math.max(addRight, 	maxRight);
    },

	_adjustPlotArea : function(leftAxes, rightAxes, bottomAxes) {
        var chartConfig = this._chartConfig;

        this._adjustAxes(leftAxes, rightAxes, bottomAxes);
        /*console.log(this.plotArea,
            "t:", addTop, maxTop,
            "b:", addBottom, maxBottom,
            "l:", addLeft, maxLeft,
            "r:", addRight, maxRight);*/

		var repeat = false;
		if (this.plotArea.top < this.graphArea.top + this._top) {
			this.plotArea.top = this.graphArea.top + this._top;
			repeat = true;
		}
		if (this.plotArea.left < this.graphArea.left + this._left) {
			this.plotArea.left = this.graphArea.left + this._left;
			repeat = true;
		}
		if (this.plotArea.right > this.graphArea.right - this._right) {
			this.plotArea.right = this.graphArea.right - this._right;
            if (this.plotArea.right < this.plotArea.left) {
                this.plotArea.right = this.plotArea.left;
                this.graphArea.right = this.plotArea.bottom + this._right;
                repeat = false;
            }
            else {
                repeat = true;
            }
		}
		if (this.plotArea.bottom > this.graphArea.bottom - this._bottom) {
			this.plotArea.bottom = this.graphArea.bottom - this._bottom;
            if (this.plotArea.bottom < this.plotArea.top) {
                this.plotArea.bottom = this.plotArea.top;
                this.graphArea.bottom = this.plotArea.bottom + this._bottom;
                repeat = false;
            }
            else {
                repeat = true;
            }
		}

        /*console.log("==============V");
        console.log(this.plotArea.top);
        console.log(this.plotArea.bottom);
        console.log(this.plotArea.left);
        console.log(this.plotArea.right);
        console.log("--------------^");*/

		if (chartConfig.autoMargins && repeat && this.repeatCount++ < 5) {
			this._adjustPlotArea(leftAxes, rightAxes, bottomAxes);
		}
        else {
            this._adjustAxes(leftAxes, rightAxes, bottomAxes);
//            console.log(this.repeatCount);
            this.repeatCount = 0;
        }
	},

	/**
	 * 根据plotArea再次调整graphArea
	 */
	_adjustGraphArea : function() {
        var plotRect = this.plotArea;
        if (this.clipRect) {
            this.clipRect.clear();
            this.clipRect.drawRect(0, 0,
                plotRect.right - plotRect.left,
                plotRect.bottom - plotRect.top);
            this.clipRect.update();
        }
	}

} );
