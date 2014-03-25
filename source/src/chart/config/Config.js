/**
 * 图表配置
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Config = {

//==========================================
// 图表元素
//------------------------------------------

    /**
     * 标题
     */
    title: {
        display : false,

        text: "vcharts",
        font: "微软雅黑, 黑体, Verdana, Arial, Console",
        size: 20,
        color: "#333333",
        offset: 12
    },

    /**
     * 图形
     */
    graph : {
        display : true,

        name: "某数据",

        lineThickness:  1,
        lineAlpha:  1,
        lineColor:  null,
        fillColor:  null,//使用系统分配colors中的颜色
        fillAlpha:  1 //填充透明度
    },

    pieGraph : {
        type: "slice",
        /**
         * @property {Number} radius 半径
         * @default 100
         */
        radius: 100,
        /**
         * @property {Number} innerRadius 饼空心圆半径（像素），不能大于饼图半径
         * @default 20
         */
        innerRadius: 0,

        gap: 0       //gap
    },

    serialGraph : {
        lineThickness:  2,          //@override 曲线默认为2
        useDifferentColor:  false,  //系列柱形图 使用不同的颜色
        valueKey: "value",
        maxBarWidth:    50 //柱形图
    },

    xyGraph : {
        xKey: "x",
        yKey: "y"
    },

    /**
     * 轴
     */
    axis : {
        display : true,

        offset: 0,
        axisThickness: 1,
        axisColor: "#333333",

        gridThickness: 1,
        gridColor: "#333333",
        gridType: "line",

        tickLength : 5,

        titleText: "",
        titleOffset: 0,

        labelColor: "#777777",
        labelFont: "微软雅黑, 黑体, Verdana, Arial, Console",
        labelSize: 12,
        labelInside: false,//标签是否显示在里面
        labelFormatter : function(n){return n;},
        /**
         * 文本相对图表框的位置
         * up:在线上面；middle：对齐线；down：在线下面
         */
        labelPosition: "middle",
        /**
         * 标签相对图例的间隔
         */
        labelOffset: 8,
        /**
         * 标签的旋转的度数（degrees），目前仅支持0和45度
         */
        labelRotation: 0,
        /**
         * @property 将轴放到对面的位置，仅支持左右，默认在左边
         * @default false
         */
        opposite:   false
    },

    serialAxis: {},

    /**
     * 数值轴
     */
    valueAxis: {
        valueKeys: "auto",//根据graph自动设置
        minValue: NaN,
        maxValue: NaN,
        autoGridCount: true,
        gridCount:5,
        /**
         * 是否将轴按整数为单位的方式分段，默认为false
         * 如：0.1、1、10、100，这样的数值；而不是2、3、4、5，这样的数值
         * 适用情况较少，一般不用设置此项
         */
        onlyInteger: false,
//        precision: NaN, //精度
//        oneMoreGrid: false
//        alwaysShow0: true
        unit: "",
        /**
         * 数值单位的位置（相对于标签）
         */
        unitPosition: "right"
    },

    plot: {
        display : true,

        backgroundColor: "#ffffff",
        backgroundAlpha: 1,

        borderThickness: 1,
        borderColor: "#cacaca",
        borderAlpha: 1

//        borderLeft: true,
//        borderRight: false,
//        borderTop: 1,
//        borderBottom: 1,
    },

    legend: {
        display : false,

        margin: 10,
        offset: 10,
        lineAlpha : 1,
        lineThickness : 1,
        lineColor: null,
        lineAlpha: 1
    },

    tooltip: {
        display : true,

        /**
         * <li>auto:自动，由系统选择最佳类型</li>
         * <li>all:显示全部</li>
         * <li>single:显示离鼠标最近的</li>
         * <li>group:显示鼠标最近的一组</li>
         */
        type: "auto",
//        useGraphColor: false,
        text: "",
//        formatter: function,
        font: "微软雅黑, 黑体, Verdana, Arial, Console",
        size: 12,
        color: "#777777",
        lineThickness: 1,
        lineColor: "#333333",
        lineAlpha: 0.5,
        backgroundAlpha: 0.8,
        backgroundColor: "#ffffff",
        borderThickness: 2,
        borderColor: "#333333",
        borderAlpha: 0.6
    },

//==========================================
// 图表主体
//------------------------------------------

    chart : {
        /**
         * @property {Array} colors
         * 指定图形序列的颜色值
         * 如不指定此值，每种图表会按自身规律自动分配适合的颜色，默认不指定
         * 如果数组长度不够用，则循环使用
         * @example
         *    ["#ff0033", "#ffcc00", "#ccff00", "#a3d675"];
         */
        colors: ["#EE3300", "#FFD300", "#99DD33", "#33DDFF", "#9933FF", "#EE0099"],

        /**
         * @property {String} backgroundColor 画布的背景颜色
         * @default "#ffffff"
         */
        backgroundColor: "#ffffff",
        /**
         * @property {Number} backgroundAlpha 画布的背景透明度
         * @default 1
         */
        backgroundAlpha: 1
    },

    pie : {
        /**
         * @property {String} labelKey 数据中描述种类的“key”值
         * @default "label"
         */
        labelKey: "label",
        /**
         * @property {String} valueKey 数据中描述数值的“key”值
         * @default "value"
         */
        valueKey: "value"

        /**
         //不确认名称的属性
         * 在无数据或数据错误时饼图的颜色
         errorColor = 0xcccccc;
         leavePercent = .2;
         leaveDistance = 10;
         */
    },

    coordinate : {
        graphs: [

        ],
        /**
         * @property {Array<ValueAxis>} valueAxes <a href="#ValueAxis">ValueAxis</a>
         * 数值的轴，可有多条。如果不设置，系统会默认自动生成一个轴
         */
        valueAxes: [

        ]
    },

    rectangular : {
        autoMargins: true,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },

    serial : {
        /**
         * 旋转轴
         */
        reverse: false,
        /**
         * @property {String} serialKey 数据中描述种类的“key”值
         * @default "category"
         */
        serialKey: "label",
        /**
         * @property {Boolean} autoSerialCount =true|false 是否自动设置分类轴长度，true：按数据实际长度
         * @default true
         */
        autoSerialCount: true,
        /*
         * @property {Number} minSerialCount 允许分类轴的最小长度，只有在autoSerialCount为true时有效
         * @default 3
         */
        minSerialCount: 1,
        /**
         * @property {Boolean} useDifferentColor 按种类使用不同的颜色
         */
        useSerialColor: false

    },

    newValueAxis : function () {
        var config = {};
        merge(config, Config.axis);
        merge(config, Config.valueAxis);

        config.offset = 10;
        return config;
    },

    newSerialGraph : function () {
        var config = {};
        merge(config, Config.graph);
        merge(config, Config.serialGraph);
        return config;
    },

    newPieConfig : function () {
        var config = {};
        merge(config, Config.chart);
        merge(config, Config.pie);

        config.title = {};
        merge(config.title, Config.title);

        config.graph = {};
        merge(config.graph, Config.graph);
        merge(config.graph, Config.pieGraph);

//        config.legend = {};
//        merge(config.legend, Config.legend);

        config.tooltip = {};
        merge(config.tooltip, Config.tooltip);
        return config;
    },

    newSerialConfig : function () {
        var config = {};
        merge(config, Config.chart);
        merge(config, Config.coordinate);
        merge(config, Config.rectangular);
        merge(config, Config.serial);

        config.title = {};
        merge(config.title, Config.title);

        var serialAxis = {};
        merge(serialAxis, Config.axis);
        merge(serialAxis, Config.serialAxis);
        config.serialAxis = serialAxis;

        config.graphs[0] = Config.newSerialGraph();
        config.graphs[0].type = "line";//默认有一条曲线图，如果用户设置了会被替换

        config.valueAxes[0] = Config.newValueAxis();//默认会有一个坐标

        config.plot = {};
        merge(config.plot, Config.plot);

        config.legend = {};
        merge(config.legend, Config.legend);

        config.tooltip = {};
        merge(config.tooltip, Config.tooltip);

        return config;
    }
};

