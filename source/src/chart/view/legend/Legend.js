/**
 * 坐标轴抽象类
 * @id Legend
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Legend = inherits(function (chart) {
    Group.call(this);
    this.chart = chart;

    this.pool = new ElementPool(this);
}, Group);

extend(Legend.prototype, {
    refresh: function () {
        var chartConfig = this.chart._chartConfig,
            colors      = chartConfig.colors,
            config = this.config,
            legendArr = this.chart._chartData.legendArr;

        var currentX = 0;
        var currentY = 0;

        this.pool.begin(IconText);
        for (var i = 0; i < legendArr.length; i++)
        {
            var iconText = this.pool.next(),
                color = colors[i % colors.length],
                legend = legendArr[i];
            iconText.text = legend.name;
            iconText.type = legend.type;

            iconText.config = {
                fillColor : color,
                fillAlpha : config.fillAlpha,
                lineThickness : config.lineThickness,
                lineColor : config.lineColor || ColorUtil.adjustBrightness(color, -50),
                lineAlpha : config.lineAlpha
            };
            //iconText.index =


            iconText.update();
            var rect = iconText.getRect();

//            console.log(rect.width, "=Legend=", rect.height);

            if (currentX + rect.width > this.chart.stageWidth) {
                currentX = 0;
                currentY += rect.height + 5;
                iconText.x = Math.round(currentX);
                iconText.y = Math.round(currentY);
            }
            else {
                iconText.x = Math.round(currentX);
                iconText.y = Math.round(currentY);
                currentX += rect.width + config.margin;
            }
            iconText.update();
        }
        this.pool.end();
    }

});
