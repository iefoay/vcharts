/**
 * 坐标轴抽象类
 * @id Axis
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Axis = inherits( function() {
    Group.call(this);

    this.direction = null;
    this.axisLength;
	this.blockWidth = NaN;
	this.frontSpace = 0;
	this.backSpace = 0;

	this.title;
//    this._axisLine = this.addChild(new Shape());
    this._ticks = this.addChild(new Shape());
}, Group );

extend( Axis.prototype, {
    refresh : function () {
        var config = this.config,
//            axisLine = this._axisLine,
            ticks = this._ticks,
            axisLength = this.axisLength;

        if (this.direction == "x") {
//            axisLine.rotation = 0;
//            axisLine.update();
            ticks.rotation = 0;
            ticks.update();
        }
        else if (this.direction == "y") {
//            axisLine.rotation = 90;
//            axisLine.update();
            ticks.rotation = 90;
            ticks.update();
        }

//        axisLine.clear();
//        axisLine.beginStroke(config.axisThickness, config.axisColor);
//        axisLine.moveTo(0, 0);
//        axisLine.lineTo(axisLength, 0);
//        axisLine.update();
    },

	_transformLabel : function(label, position) {
        var config = this.config,
            labelRect = label.getRect();

        this._ticks.beginStroke(config.axisThickness, config.axisColor);

		if (this.direction == "x") {
			if (config.labelInside) {
//				position += labelOffset;
			}
			else {
//				position += blockWidth / 2;
			}

			label.x = position - labelRect.width/2;
            label.y = config.labelOffset;
            label.update();

            labelRect = label.getRect();
            this.frontSpace = Math.max(this.frontSpace, -labelRect.x);
//            this.backSpace = Math.max(this.backSpace, labelRect.x + labelRect.width - this.plotArea.right);
		}
		else if (this.direction == "y") {
			if (config.labelInside) {
//				position += config.labelOffset;
			}
			else {
//				position -= labelOffset;
			}
			label.x = -(config.labelOffset + labelRect.width);
            label.y = position - labelRect.height/2;
            label.update();

            labelRect = label.getRect();
            this.frontSpace = Math.max(this.frontSpace, labelRect.y + labelRect.height - this.axisLength);
            this.backSpace = Math.max(this.backSpace, -labelRect.y);

		}
	}
} );
