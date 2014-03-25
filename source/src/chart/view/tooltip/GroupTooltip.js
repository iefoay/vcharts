/**
 * 鼠标提示工具
 * @id GroupTooltip
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var GroupTooltip = inherits( function(chart) {
    Tooltip.call(this);
    this.chart = chart;

    this.stageX = 0;
    this.stageY = 0;
    this._directionH = true;
    this._directionV = true;
    this._lastIndex = -1;
    this.lastItems = [];

    this._first = true;

    this._balloon = this.addChild(new GroupBalloon());

    this.chart.addEventListener("mouseover", moveListener);
    this.chart.addEventListener("mouseout", moveListener);
    this.chart.addEventListener("mousemove", moveListener);

    var _this = this;
    function outListener(event) {
//        console.log(event);
//        _this.chart.mouse
    }

    function moveListener(event) {
//        _this.onOver = event.type == "mouseover";

        //event.clientX == pageX
        //Firefox 不支持 event.offsetX、node.offsetLeft

        var clientRect = _this.chart.getRect();

        _this.stageX = event.clientX - clientRect.left;
        _this.stageY = event.clientY - clientRect.top;
        _this.refresh();
    }

}, Tooltip );

extend( GroupTooltip.prototype, {
    destroy : function() {
        this.resetLastItems();
    },

    refresh : function() {

        var chart = this.chart,
            plotArea = chart.plotArea,
            mouseX = this.stageX,
            mouseY = this.stageY,
            index = chart.serialAxis.getIndex(mouseX - plotArea.left, mouseY - plotArea.top),
            dataSource = chart._dataSource,
            chartConfig = chart._chartConfig,
            chartData = chart._chartData,
            graphs = chart.graphs;

        this._balloon.config = this.config;

        if (index == -1 || index > chartData.endIndex-chartData.startIndex) {
            this.resetLastItems();

            this._lastIndex = index;

            this._balloon.visible = false;
            Tween.to(this._balloon, 0.5, {
                alpha : 0,
                onUpdate : "update"
            });
            return;
        }


        if (index != this._lastIndex) {
            this.resetLastItems();

            var text = dataSource[index][chartConfig.serialKey];

//				text += "<img src='http://img.t.sinajs.cn/t4/appstyle/gift/images/common/pic/normal_face.png' width='50' height='50'/>"
            for (var i = 0; i < graphs.length; i++)
            {
                var graph = graphs[i],
                    config = graph.config,
                    value = dataSource[index][config.valueKey],
                    item = graph.pool.getChildAt(index);

                text += "<br>" + config.name + "："+ value;
                item.activated = true;
                item.update();
                this.lastItems.push(item);
            }

            this._balloon.text = text;
            this._balloon.update();
        }

        var balloonRect = this._balloon.getRect(),
            balloonWidth = balloonRect.width,
            balloonHeight = balloonRect.height,
            balloonX = chart.serialAxis.getPosition(index) + plotArea.left,
            balloonY = mouseY,
            padding = 8,
            left = padding,
            top = padding,
            right = chart.width-padding,
            bottom = chart.height-padding;

        if (!chart.serialAxis.touchSide) {
            balloonX += chart.serialAxis.blockWidth / 2;
        }

        if (this._directionH) {
            if (balloonX + balloonWidth > right) {
                balloonX = balloonX - balloonWidth - padding;
                this._directionH = false;
            }
            else {
                balloonX = balloonX + padding;
            }
        }
        else {
            if (balloonX - balloonWidth < left) {
                balloonX = balloonX + padding;
                this._directionH = true;
            }
            else {
                balloonX = balloonX - balloonWidth - padding;
            }
        }

        if (this._directionV) {
            if (balloonY + balloonHeight > bottom) {
                balloonY = balloonY - balloonHeight - padding;
                this._directionV = false;
            }
            else {
                balloonY = balloonY + padding;
            }
        }
        else {
            if (balloonY - balloonHeight < top) {
                balloonY = balloonY + padding;
                this._directionV = true;
            }
            else {
                balloonY = balloonY - balloonHeight - padding;
            }
        }

        this._balloon.visible = false;

        if (this._first) {
            this._first = false;

            this._balloon.x = balloonX;
            this._balloon.alpha = 0;
        }
        else {
            Tween.to(this._balloon, 0.1, {
                x : balloonX,
                onUpdate : "update"
            });
        }
        this._balloon.y = balloonY;
        this._balloon.update();

        Tween.to(this._balloon, 0.8, {
            alpha : 1,
            onUpdate : "update"
        });

        this._lastIndex = index;
    },

    resetLastItems : function()
    {
        while (this.lastItems.length > 0)
        {
            var item = this.lastItems.pop();
            item.activated = false;
            item.update();
        }
    }

} );
