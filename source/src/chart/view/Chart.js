/**
 * 图表视图抽象类
 * @id Chart
 * @import Legend
 * @import Tooltip
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Chart = inherits(function () {
    Group.call(this);

    if (xmlRenderer.type == "svg") this._svgDefs();

    this.title;
//	this.subTitle:Title;
    this.lengend;
    this.tooltip;

    /**
     * 存储序列图形对象
     */
    this.graphs = [];

    this.graphContainer = new Group();
}, Group);

extend(Chart.prototype, {
    _newNode: function () {
        return xmlRenderer.newDocument("VCharts v" + version);
    },

    _svgDefs: function () {
        //模板
        this.defs = this._dom.appendChild(xmlRenderer._newNode("defs"));

        var gradient = this.defs.appendChild(xmlRenderer._newNode("linearGradient"));
        gradient.id = "gradient";
        attr(gradient.appendChild(xmlRenderer._newNode("stop")), {
            "offset" : "0%",
            "stop-color" : "#ffffff",
            "stop-opacity" : 0.5
        });
        attr(gradient.appendChild(xmlRenderer._newNode("stop")), {
            "offset" : "70%",
            "stop-color" : "#ffffff",
            "stop-opacity" : 0
        });
    },

    /** 被动接受到
     * 此时已经出现在DOM中了
     */
    setSize: function (w, h) {
        this.stageWidth = w;
        this.stageHeight = h;

//        console.log("Chart::", this.stage.clientWidth, "--", this.stage.clientHeight);
    },

    setDataSource : function (data) {
        this._dataSource = data;
    },
    setConfig: function (config) {
        this._chartConfig = config;
    },
    //提供由模型处理完成后的数据
    setData : function (data) {
        this._chartData = data;
    },

    updateChart : function () {

        if (this._dataSource) {
            if (this._helper) {
                this.removeChild(this._helper);
                this._helper = null;
            }

            this._configChart();
            this._refreshChart();
        }
        else {
            if (this._helper == null) {
                this._helper = this.addChild(new Text("No data"));
                this._helper.update();
                var helperRect = this._helper.getRect();

                this._helper.x = (this.stageWidth - helperRect.width) / 2;
                this._helper.y = (this.stageHeight - helperRect.height) / 2;
                this._helper.update();
            }
        }
//        this.stageWidth = this._dom.clientWidth;//offsetWidth
//        this.stageHeight = this._dom.clientHeight;//offsetHeight
//        console.log(this._dom);
    },

    _configChart: function () {
        var chartConfig = this._chartConfig,
            config;

        //故意删除
        if (chartConfig.title == null) {
            if (this.titleObject) {
                this.removeChild(this.titleObject);
                this.titleObject = null;
            }
        }
        //修改
        else if (chartConfig.title) {
            if (!this.titleObject) {
                this.titleObject = new Text();
                this.addChild(this.titleObject);
            }
            config = chartConfig.title;
            this.titleObject.text = config.text;
            this.titleObject.font = config.font;
            this.titleObject.fontSize = config.size;
//            this.titleObject.align = "middle";
            this.titleObject.color = config.color;
            this.titleObject.update();
        }
        //保持现状

        //故意删除
        if (chartConfig.legend == null) {
            if (this.legend) {
                this.removeChild(this.legend);
                this.legend = null;
            }
        }
        //修改
        else if (chartConfig.legend) {
            if (!this.legend) {
                this.legend = new Legend(this);
                this.addChild(this.legend);
            }
            this.legend.config = chartConfig.legend;
        }
        //保持现状
    },

    _refreshChart: function () {

        this.graphArea = new Rectangle(0, 0, this.stageWidth, this.stageHeight);

        var chartConfig = this._chartConfig,
            config,
            x,
            y,
            rect;

        if (this.titleObject) {
            config = chartConfig.title;
            this.titleObject.update();
            rect = this.titleObject.getRect();
            this.graphArea.top = rect.height + config.offset;

            this.titleObject.x = (this.stageWidth - rect.width) / 2;
            this.titleObject.y = 0;
            this.titleObject.update();
//            console.log(this.graphArea)


            if (this.legend) {
                this.legend.refresh();

                config = this.legend.config;
                rect = this.legend.getRect();
                this.graphArea.bottom -= rect.height + config.offset;
            }
        }
    },
    _refreshLegend : function() {
        if (this.legend) {
            var config = this.legend.config,
                rect = this.legend.getRect(),
                x = (this.stageWidth - rect.width) / 2,
                y = this.graphArea.bottom + config.offset;

            this.legend.x = Math.round(x) + 0.5;
            this.legend.y = Math.round(y) + 0.5;
            this.legend.update();
        }
    }
});
