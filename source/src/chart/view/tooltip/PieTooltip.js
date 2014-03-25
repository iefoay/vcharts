/**
 * 鼠标提示工具
 * @id SpiderTooltip
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var PieTooltip = inherits( function(chart) {
    this.chart = chart;
    Tooltip.call(this);

    this._lines = this.addChild(new Shape());
}, Tooltip );

extend( PieTooltip.prototype, {
    destroy : function() {
        _tips = null;
        this.graphics.clear();
        while (this.numChildren > 0)	this.removeChildAt(0);
//        this.removeEventListener(Event.EXIT_FRAME, onFrame);
    },

    refresh : function() {
//        this.addEventListener(Event.EXIT_FRAME, onFrame);

        var dataSource = this.chart._dataSource,
            chartConfig = this.chart._chartConfig,
            config = this.config,
            pool = this.chart.graph.pool,
            poolLength = pool.getLength(),
            chartData = this.chart._chartData,
            graphData = chartData.graphArr,
            graphTotalNum = chartData.graphTotalNum;

        this._tips = [];
        pool.begin();
        for(var i = 0; i < poolLength; i++)
        {
            var sector = pool.next();

            var percent = Math.round(graphData[i] / graphTotalNum * 1000) / 10;

            var tipInfo = dataSource[i][chartConfig.labelKey] + ":" + dataSource[i][chartConfig.valueKey];
//            tipInfo = "<p>" + dataSource[i][chartConfig.labelKey] + ": " +
//                "<b><font size='"+ config.size*1.3 +"'>" + percent + "</font>%</b></p>";
            //				}
            var tip = new Text(tipInfo);
            tip.font = config.font;
            tip.fontSize = config.size;
            tip.color = config.color;
            tip.update();

            this.addChild(tip);

            this._tips[i] = tip;
        }

        this.moving();
    },

    moving : function() {
        var chartConfig = this.chart._chartConfig,
            config = this.config,
            pool = this.chart.graph.pool;

        var leftTips = [];
        var rightTips = [];
        pool.begin();
        for(var i = 0; i < this._tips.length; i++) {
            var sector = pool.next(),
                tip = this._tips[i],
                tipRect = tip.getRect();

            var middleAngle = (sector.startAngle + sector.endAngle) / 2,
                leg1 = Math.abs(Math.sin(middleAngle)) * sector.radius/3,
                leg2 = Math.abs(Math.sin(middleAngle)) * sector.radius/4,
                x1 = sector.x + Math.cos(middleAngle) * (sector.radius + leg1),
                y1 = sector.y + Math.sin(middleAngle) * (sector.radius + leg1);

            //文字基础位置
            //拐角方向:右
            if (Math.cos(middleAngle) > 0) {
                rightTips.push({ sector : sector, tip : tip });
                tip.x = x1 + leg2;
                tip.y = y1 - tipRect.height / 2;
            }
            //拐角方向:左
            else {
                leftTips.unshift({ sector : sector, tip : tip });
                tip.x = x1 - tipRect.width - leg2;
                tip.y = y1 - tipRect.height / 2;
            }
            tip.update();
        }

        this._lines.clear();
        this._lines.beginStroke(config.lineThickness, config.lineColor, config.lineAlpha);
    }

} );
