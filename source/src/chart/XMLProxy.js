/*
 * XMLProxy
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var XMLProxy = function (context) {
    this.context = context;
};

extend(XMLProxy.prototype, {
    onStage : function() {
        if (this.initialized) {
            console.log("已初始化！");
            return;
        }

        var stage = this.context.element;
        this._chartView = this._newChart(this.context.type);
//        this._chartView.stage = stage;//舞台（DIV容器）

        /*
         var s = new Stage();
         stage.appendChild(s._dom);

         var g = new Group();
         s.addChild(g);

         var rect = new Shape();
         g.addChild(rect);
         //            rect.width = 80;
         //            rect.height = 150;
         rect.beginStroke(5, "red");
         rect.beginFill("green", 0.3);
         //            rect.drawRect(10, 10, 120, 100, 5);
         //            rect.drawCircle(100, 100, 60, 10);
         rect.x = 100.5;
         rect.y = 100.5;
         rect.moveTo(100, 100);
         //            rect.lineTo(200, 50);
         //            rect.curveTo(100,100, 400,100, 400,200);
         rect.arc(100, 100, 39, 2.1, 4.2);
         //            rect.lineTo(100, 100);
         //            rect.lineTo(120, 30);
         //            rect.arc(100, 100, 20, 5, -1, true);
         rect.close();
         //            rect.radius = 5;
         rect.update();
         /*
         var text = new Text("dsf");
         text.text = "AFDKLJEIfkjewoDSKS";
         text.update();
         g.addChild(text);

         var path = new Shape();
         path.beginStroke(2, "red");
         path.moveTo(0, 0);
         path.lineTo(20, 100);
         //            path.data = "M10,10 L80,30 L50,35 M50,50 L100,100 L300, 110";
         //            path.data = "M0,0L0,5M209.66666666666666,0L209.66666666666666,5M419.3333333333333,0L419.3333333333333,5 ";
         path.update();
         g.addChild(path);

         var r = rect.getRect(),
         n = rect._dom;

         var groupRect = g.getRect();

         //            console.log("offset---", n.offsetLeft, "---", n.offsetWidth);
         //            console.log("client---", n.clientLeft, "---", n.clientWidth);
         //            console.log("scroll---", rrr.width, "---", rrr.scrollHeight);
         console.log("rect---", groupRect.width, "---", groupRect.height);
         //            console.log(r.left, ",", r.right);
         //            console.log(n.style.marginWidth);


         var c = new Shape();
         //            c.alpha = 0.3;
         c.beginStroke(2, "green");
         c.beginFill("red");
         c.drawCircle(150, 150, 120, 10);
         c.update();
         g.addChild(c);

         var it = new IconText();
         g.addChild(it);
         it.text = "ww";
         it.config = {
         fillColor : "red",
         fillAlpha : 1,
         lineThickness : 1,
         lineColor : "blue",
         lineAlpha : 1
         };
         it.update();
         console.log(it.getRect().width);

         return;
         */

        while (stage.lastChild) stage.removeChild(stage.lastChild);
        stage.appendChild(this._chartView._dom);
        stage = null;

        this.initialized = true;
        this._readyCallback();
    },
    _newChart: function (type) {
        switch (type) {
            case "pie":
                return new PieChart();
                break;
            case "serial":
                return new SerialChart();
                break;
        }
        return null;
    },

    _readyCallback: function () {

        var _this = this;
        var stage = this.context.element;

        this._width = stage.clientWidth;
        this._height = stage.clientHeight;
        this._chartView.setSize(stage.clientWidth, stage.clientHeight);
        setInterval(interval, 2000);
        function interval() {
            if (_this._width != stage.clientWidth || _this._height != stage.clientHeight) {
                _this._width = stage.clientWidth;
                _this._height = stage.clientHeight;
                _this._chartView.setSize(stage.clientWidth, stage.clientHeight);
                _this._chartView.updateChart();
            }
        }

        if (this._dataSource) {
            this._chartView.setDataSource(this._dataSource);
            this._dataSource = null;
        }
        if (this._chartConfig) {
            this._chartView.setConfig(this._chartConfig);
            this._chartConfig = null;
        }
        if (this._chartData) {
            this._chartView.setData(this._chartData);
            this._chartData = null;
        }
        if (this._needRefresh) {
            this._chartView.updateChart();
            this._needRefresh = false;
        }
    },

    /*setSize: function (w, h) {
        this._width = w;    //记录
        this._height = h;   //
        if (this.initialized) {
            this._chartView.setSize(w, h);
        }
    },*/

    setDataSource: function (data) {
        if (this.initialized) {
            this._chartView.setDataSource(data);
        }
        else {
            this._dataSource = data;
        }
    },

    setConfig: function (config) {
        if (this.initialized) {
            this._chartView.setConfig(config);
        }
        else {
            this._chartConfig = config;
        }
    },

    //只在初始化完成后调用
    setData: function (data) {
        if (this.initialized) {
            this._chartView.setData(data);
        }
    },

    update: function () {
        if (this.initialized) {
            this._chartView.updateChart();
        }
        else {
            this._needRefresh = true;
        }
    }
});
