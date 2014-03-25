/**
 * 同类显示对象池集
 * 创建器、迭代器为一体。简化接口。
 * 可以减轻频繁创建对象所造成的负荷。
 * @id ElementPool
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var ElementPool = function(parent, SpriteClass) {
	this._parent = parent;
	this._SpriteClass = SpriteClass;

	this._intelList = [];
	this._currentIndex = -1;
};

extend( ElementPool.prototype, {
	/**
	 * @method 获取长度
	 * @return
	 */
	getLength : function() {
		return this._intelList.length;
	},

	/**
	 * 设置长度
	 * @method 和数组设置length一样，可以进行裁剪
	 * @param length
	 */
	setLength : function(length) {
		while(this._intelList.length > length) this._pop();
	},

	/**
	 * @method 根据序号获取对象
	 * @param index
	 * @return
	 */
	getChildAt : function(index) {
		return this._intelList[index];
	},

	/**
	 * @method 获取对象序号
	 * @param obj
	 * @return
	 */
	getChildIndex : function(obj) {
		return this._intelList.indexOf(obj);
	},

	begin : function(spriteClass) {
		this._SpriteClass = spriteClass || this._SpriteClass;
		this._currentIndex = 0;
	},

    hasNext : function () {
        return this._currentIndex < this.getLength()-1;
    },

	next : function() {
		return this.getChildAt(this._currentIndex++) || this._push();
	},

	end : function() {
		this.setLength(this._currentIndex);
	},

	/**
	 * 添加一个对象
	 * @return
	 */
	_push : function() {
		var intelObj = new this._SpriteClass();
		this._parent.addChild(intelObj);
		this._intelList.push(intelObj);
		return intelObj;
	},

	/**
	 * 删除一个对象
	 * @return
	 */
	_pop : function() {
		var intelObj = this._intelList.pop();
		if(intelObj != null) {// && this._parent.contains(intelObj)) {
			this._parent.removeChild(intelObj);
        }
		return intelObj;
	}

} );

