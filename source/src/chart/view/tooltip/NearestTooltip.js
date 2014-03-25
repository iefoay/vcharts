/**
 * 鼠标提示工具
 * @id NearestTooltip
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var NearestTooltip = inherits( function(chart) {
    Tooltip.call(this);
    this.chart = chart;

    this._lines = this.addChild(new Shape());
    this._tip = this.addChild(new Text());
    this._tip.visible = false;
    this._tip.update();

    this._lastItem = null;
    this._dotItems = [];

    var _this = this;
    this._over = false;//VML侦听器可能有问题
    this.overListener = function(event) {
        event = EventUtil.getEvent(event);
        vcharts.event = null;
//        console.log("NearestTooltip::", event.targetType);

        if (event.targetType == "sprite") {
            _this._over = true;
//            _this.chart.removeEventListener("mousemove", _this.moveListener);
            _this._offLast();
            _this._onItem(event.element);
        }
        else {
            _this._over = false;
//            _this.chart.addEventListener("mousemove", _this.moveListener);
        }
    };
    this.moveListener = function(event) {
        if (_this._over) return;
        event = EventUtil.getEvent(event);
        _this._findNearest(event);
    };
    this.chart.addEventListener("mouseover", this.overListener);
//    this.chart.addEventListener("mouseout", this.overListener);
    this.chart.addEventListener("mousemove", this.moveListener);
}, Tooltip );

extend( NearestTooltip.prototype, {
    destroy : function() {
//        this.chart.removeEventListener("mouseover", this.moveListener);
//        this.chart.removeEventListener("mouseout", moveListener);
//        this.chart.removeEventListener("mousemove", moveListener);
//        _tips = null;
//        this.graphics.clear();
//        while (this.numChildren > 0)	this.removeChildAt(0);
//        this.removeEventListener(Event.EXIT_FRAME, onFrame);
    },

    refresh : function() {
        this._lastItem = null;
        this._dotItems = [];
    },

    _onItem : function(item) {
        var graph = item.graph,
            chart = this.chart,
            plotArea = chart.plotArea,
            value = chart._dataSource[item.index][graph.config.valueKey];

        this._tip.text = value + "";
        this._tip.update();
        var tipRect = this._tip.getRect(),
            margin = 8;
        this._tip.x = plotArea.left + item.focusX - tipRect.width / 2;
        this._tip.y = plotArea.top + item.focusY;

        if (graph.type == "column" && this._tip.height > 0) {
            this._tip.y += margin;
        }
        else {
            this._tip.y -= margin + tipRect.height;
        }

        this._tip.visible = true;
        this._tip.update();
        item.activated = true;
        item.update();
        this._lastItem = item;
    },

    _offLast : function() {
        if (this._lastItem) {
            this._lastItem.activated = false;
            this._lastItem.update();
            this._lastItem = null;
        }
        this._tip.visible = false;
        this._tip.update();
    },

    _findNearest : function(event) {
        var chart = this.chart,
            clientRect = chart.getRect(),
            plotArea = chart.plotArea,
            mouseX = event.clientX - clientRect.left - plotArea.left,
            mouseY = event.clientY - clientRect.top - plotArea.top,
            index = chart.serialAxis.getIndex(mouseX, mouseY);

        if (index == -1) {
            this._offLast();
            return;
        }
        //当前序列上的所有点对象
        this._dotItems = [];
        for (var i = 0; i < chart.graphs.length; i++) {
            var graph = chart.graphs[i];
            if (graph.type == "line") {
                var j = binary( index, graph.pool, 0, Math.min(index, graph.pool.getLength()-1) );
                var item = graph.pool.getChildAt(j);
                if (item) {
                    this._dotItems.push(item);
                }
            }
        }
        //最近的数据点
        for (i = 0; i < this._dotItems.length; i++) {
            item = this._dotItems[i];
//            console.log(item);

            if (!nearestItem && item) {//第一个
                var nearestItem = item;
            }
            else {//选出离鼠标更近的一个
                if (Math.abs(item.y - mouseY) < Math.abs(nearestItem.y - mouseY)) {
                    nearestItem = item;
                }
            }
        }

        if (this._lastItem == nearestItem) {
            return;
        }
        else {
            this._offLast();
            if (nearestItem) {
                this._onItem(nearestItem);
            }
        }

        function binary(find, pool, low, high) {
            if (low <= high) {
                if (pool.getChildAt(low).index == find)
                    return low;
                if (pool.getChildAt(high).index == find)
                    return high;
                var mid = Math.ceil((high + low) / 2);

                if (pool.getChildAt(mid).index == find) {
                    return mid;
                }
                else if (pool.getChildAt(mid).index > find) {
                    return binary(find, pool, low, mid - 1);
                }
                else {
                    return binary(find, pool, mid + 1, high);
                }
            }
            return -1;
        }
    }

} );
