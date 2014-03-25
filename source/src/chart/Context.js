/**
 * 图表抽象类
 * @id Context
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Context = function (element) {
    this.element = element;

    //视图（View）
    //(hasSVG && !flash_first)
    this._viewProxy = new XMLProxy(this);// : new SWFProxy(this);

    var _this = this;
    //添加到页面上
    if (doc.body) {
        loadedHandler();
    }
    else {
        EventUtil.addHandler(win, "load", loadedHandler);
    }

    function loadedHandler() {
        if ( isString(element) ) {
            _this.element = getElementById(element);
        }
        if (!_this.element) return;
        _this.initialized = true;

        _this.setSize(
            _this._width || _this.element.style.width || 320,
            _this._height || _this.element.style.height || 160
        );

        _this._viewProxy.onStage();
    }
};

extend(Context.prototype, {

    /**设置图表数据源
     * @param data
     * @returns chart
     */
    setData: function (data) {
        this._dataSource = data;
        this._render();
        return this;
    },

    /**设置图表配置
     * @param config
     * @returns chart
     */
    setConfig: function (config) {
        //新：根据具体配置
        for (var key in config) {
//            console.log(key, config[key]);
            switch(key) {
                //可有可无的元素
                case "title":
//				case "subTitle":
                case "legend":
                case "serialAxis":
                case "tooltip":
                case "plot":
                    if (this._chartConfig[key] && config[key] != null) {
                        merge(this._chartConfig[key], config[key]);
                    }
                    else {
                        this._chartConfig[key] = config[key];
                    }
                    break;
                //不可或缺的元素
                case "graph":
                    if (this._chartConfig[key]) {
                        merge(this._chartConfig[key], config[key]);
                    }
                    else {
                        //new
                        this._chartConfig[key] = config[key];
                    }
                    break;
                //需要为每个新子对象创建完整配置
                case "valueAxes":
                    for (var i = 0; i < config[key].length; i++) {
                        var childConfig = Config.newValueAxis();
                        merge(childConfig, config[key][i]);
                        this._chartConfig[key][i] = childConfig;
                    }
                    while (this._chartConfig[key].length > i) {
                        this._chartConfig[key].pop();
                    }
                    break;
                case "graphs":
                    for (var i = 0; i < config[key].length; i++) {
                        childConfig = Config.newSerialGraph();
                        merge(childConfig, config[key][i]);
                        this._chartConfig[key][i] = childConfig;
                    }
                    while (this._chartConfig[key].length > i) {
                        this._chartConfig[key].pop();
                    }
                    break;
                default:
                    this._chartConfig[key] = config[key];
                    break;
            }
        }

        this._render();
        return this;
    },

    /** 设置图表尺寸
     * @param w
     * @param h
     * @returns chart
     */
    setSize: function (w, h) {
        this._width = w;    //记录
        this._height = h;   //

        if (this.initialized) {
            if (typeof w === "number") w = w+"px";
            if (typeof h === "number") h = h+"px";
            this.element.style.width = w;
            this.element.style.height = h;
        }

//        this._viewProxy.setSize(w, h);
        this._render();
        return this;
    },

    _render: function () {
        if (!this.initialized) return;

        if (this.timerIndex == undefined) {
            var _this = this;
            this.timerIndex = setTimeout(function() {
                _this.__onTimer();
            }, 33);
        }
    },
    __onTimer: function () {
        clearTimeout(this.timerIndex);
        this.timerIndex = undefined;

        this._parseConfig();    //加工配置
        if (this._dataSource) {
            this._parseData();  //计算数据                  //在子类中传入加工好的数据
        }
        this._viewProxy.setDataSource(this._dataSource);    //传入数据源
        this._viewProxy.setConfig(this._chartConfig);       //传入加工好的配置

        this._viewProxy.update();
    },

    //加工配置
    _parseConfig: function() {
    },

    //分析数据
    _parseData: function () {
    }
});
