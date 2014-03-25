/**
 * 显示容器
 * @id Container
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var Group =  inherits( function() {
	Element.call(this);
    this._elist = [];
}, Element );

extend( Group.prototype, {
    _newNode: function () {
        return xmlRenderer.newGroup();
    },

    length : function() {
        return this._elist.length;
    },

    addChild : function( element ) {
        if (element) {
            this._dom.appendChild(element._dom);
            this._elist.push(element);
        }
        return element;
    },

    getChildAt : function(index) {
        return this._elist[index];
    },

    removeChild : function (element) {
        if (element) {
            for (var i in this._elist) {
                if (this._elist[i] === element) {
                    this._elist.splice(i, 1);
                    this._dom.removeChild(element._dom);
                    break;
                }
            }
        }
        return element;
    },

    removeChildren : function() {
        this._elist = [];
        while (this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

} );

if (xmlRenderer.type == "vml") {
    Group.prototype.getRect = function() {
        for (var i in this._elist) {
            var childRect = this._elist[i].getRect();
            if (isNaN(left)) {
                var left = childRect.left;
            } else {
                left = Math.min(left, childRect.left);
            }
            //            console.log("Group:: left:", childRect.left, " right:", childRect.right, " width:", childRect.width);
            if (isNaN(right)) {
                var right = childRect.right;
            } else {
                right = Math.max(right, childRect.right);
            }
            if (isNaN(top)) {
                var top = childRect.top;
            } else {
                top = Math.min(top, childRect.top);
            }
            if (isNaN(bottom)) {
                var bottom = childRect.bottom;
            } else {
                bottom = Math.max(bottom, childRect.bottom);
            }
        }
        if (this._elist.length > 0) {
            return {
                left : left,
                right : right,
                top : top,
                bottom : bottom,
                width : right - left,
                height : bottom - top
            }
        }
        return {
            left : 0,
            right : 0,
            top : 0,
            bottom : 0,
            width : 0,
            height : 0
        };
    };//end function
}//end if

