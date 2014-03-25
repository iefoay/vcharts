/**
 * 鼠标提示工具
 * @id SpiderTooltip
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var SpiderTooltip = inherits( function(chart) {
    this.chart = chart;
    Tooltip.call(this);

    this._lines = this.addChild(new Shape());
}, Tooltip );

extend( SpiderTooltip.prototype, {
    destroy : function() {
        _tips = null;
        this._lines.clear();
        while (this.numChildren > 0)	this.removeChildAt(0);
//        this.removeEventListener(Event.EXIT_FRAME, onFrame);
    },

    refresh : function() {
//        this.addEventListener(Event.EXIT_FRAME, onFrame);

        var dataSource = this.chart._dataSource,
            chartConfig = this.chart._chartConfig,
            config = this.config,
            chartData = this.chart._chartData,
            graphData = chartData.graphArr,
            graphTotalNum = chartData.graphTotalNum;

        var graph = this.chart.graphs[0],
            pool = graph.pool,
            poolLength = pool.getLength();

        this._tips = [];
        pool.begin();
        for(var i = 0; i < poolLength; i++)
        {
            var sector = pool.next();

            //				getStyle("tipFun").call(null, dataProvider[i]);
            /*if (config.tipFun != null){
             var tipInfo = config.tipFun(chart.dataProvider[i]);
             }*/
            /*if (pieChartStyle && pieChartStyle.tipFun != null){
             var tipInfo = pieChartStyle.tipFun.call(null, dataProvider[i]) : ;
             }*/
            //				else{

            var percent = Math.round(graphData[i] / graphTotalNum * 1000) / 10;

            var label = dataSource[i][chartConfig.labelKey],
                value = dataSource[i][chartConfig.valueKey];

            var tipInfo = label + ": " + percent + "%";
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
            config = this.config;

        var graph = this.chart.graphs[0],
            pool = graph.pool;

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
        this.repareTips(leftTips);
        this.repareTips(rightTips);
    },

    repareTips : function(tips) {
        var i = 0;
        /*if (tips.length > 1) {
            var leftTop = globalToLocal(new Point(0, 0));
            if (tips[i].tip.y < leftTop.y) {
                tips[i].tip.y = leftTop.y;
            }

            //从上至下遍历
            for (i = 0; i < tips.length - 1; i++) {
                if (tips[i+1].tip.y < tips[i].tip.y + tips[i].tip.height) {
                    tips[i+1].tip.y = tips[i].tip.y + tips[i].tip.height;
                }
            }

            //保证最下面一个在面面里
            var rightBottom = this.globalToLocal(new Point(stage.stageWidth, stage.stageHeight));
            if (tips[i].tip.y > rightBottom.y - tips[i].tip.height) {
                tips[i].tip.y = rightBottom.y - tips[i].tip.height;
            }

            //从下至上遍历
            for (i = tips.length - 1; i > 1; i--) {
                if (tips[i-1].tip.y > tips[i].tip.y - tips[i-1].tip.height) {
                    tips[i-1].tip.y = tips[i].tip.y - tips[i-1].tip.height;
                }
            }
        }*/


        for (i = 0; i < tips.length; i++)
        {
            var sector = tips[i].sector,
                tip = tips[i].tip,
                tipRect = tip.getRect();

            var middleAngle	 = (sector.startAngle + sector.endAngle) / 2,
                leg0		 = Math.min((sector.radius - sector.radiusIn) / 2, 5),
                leg1		 = Math.abs(Math.sin(middleAngle)) * sector.radius/3,
                leg2		 = Math.abs(Math.sin(middleAngle)) * sector.radius/4,
                x1			 = sector.x + Math.cos(middleAngle) * (sector.radius - leg0),
                y1			 = sector.y + Math.sin(middleAngle) * (sector.radius - leg0),
                x2			 = sector.x + Math.cos(middleAngle) * (sector.radius + leg1),
                y2			 = tip.y + tipRect.height / 2;

            this._lines.moveTo(x1, y1);
            this._lines.lineTo(x2, y2);

            //根据文字调整后的位置画线
            //拐角方向:右
            if (Math.cos(middleAngle) > 0) {
                this._lines.lineTo(x2 + leg2, y2);
            }
            //拐角方向:左
            else {
                this._lines.lineTo(x2 - leg2, y2);
            }
        }

        this._lines.update();
    }

} );
