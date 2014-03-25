
var Tween = function(){
    this._motionID = -1;

    this._dur = 1;
    this._timeRate = 20;
    this._motionCount = 0;

    this._ease = Ease.cubicOut;
};

Tween.to = function(target, dur, para, ease)
{
    var tween = new Tween();

    tween._target = target;
    tween._dur = dur;
    tween._parsePara(para);
    this._ease = ease || Ease.cubicOut;

    Tween.__replace(tween);
    Tween.__list.push(tween);

    tween.start();

    return tween;
}

Tween.__list = [];
Tween.__replace = function (tween) {
    for (var i in Tween.__list) {
        var t = Tween.__list[i];
        if (t._target == tween._target) {
            for (var key in tween._para) {
                delete t._para[key];
            }
        }
    }
}

extend(Tween.prototype, {
    _parsePara : function (para) {
        this._updateParams = [];
        this._para = {};

        for (var key in para) {
            var value = para[key];
            switch (key) {
                case "onUpdate":
                    this._updateFun = value;
                    break;
                case "onUpdateParams":
                    this._updateParams = value;
                    break;
                default :
                    this._para[key] = [this._target[key], value];
                    break;
            }
        }
    },

    start : function () {
        var gap = 1000 / this._timeRate;
        this._motionCount = 0;
        this._motionTotal = Math.ceil(this._dur * 1000 / gap);

        var _this = this;
        this._motionID = setInterval(function() {
            if (_this._motionCount++ >= _this._motionTotal) {
                clearInterval(_this._motionID);
                for (var i in Tween.__list) {
                    if (Tween.__list[i] == _this) {
                        Tween.__list.splice(i, 1);
                    }
                }
            }
            else {
                _this.__onUpdate();
            }
        }, gap);
    },

    __onUpdate : function () {
        for (var key in this._para) {
            var info = this._para[key];
            var value = this._ease(this._motionCount / this._motionTotal) * (info[1] - info[0]);
            this._target[key] = info[0] + value;
        }

        this._target[this._updateFun].apply(this._target, this._updateParams);
    },

    __onComplete : function() {

    }
});


