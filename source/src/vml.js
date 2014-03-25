/**
 * VML绘图类
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var vml = {
    type : "vml",

    //目前没有用到辅助对象，只创建显示对象，因为添加了position:absolute。
    _newNode : function(type) {
        //TODO 好像只能通过拼写字符串的方式创建对象，否则渲染有问题，特别是子对象多于一个的时候
        var str = '<v:' + type;
        if (isIE8) {//解决ie8下的渲染问题
            //xmlns = "urn:schemas-microsoft-com:vml";
            str += ' style="behavior:url(#default#VML);display:inline-block;"';
        }
        str += ' />';
        var n = doc.createElement(str);
        n.style.position = "absolute";

        return n;
    },
    _newSubNode : function(type) {
        var str = '<v:' + type;
        if (isIE8) {
            str += ' style="behavior:url(#default#VML);"';
        }
        str += ' />';
        var n = doc.createElement(str);
        return n;
    },
    newDocument : function() {
        var n = this._newNode("g");
        n.style.position = "relative";
        n.style.width = "100%";
        n.style.height = "100%";
        return n;
    },
    newGroup : function() {
        var n = this._newNode("g");
        return n;
    },
    newPath : function() {
        var n = this._newNode("shape");
        n.coordsize = "1, 1";
        n.style.width = "1px";
        n.style.height = "1px";
        return n;
    },
    newText : function() {
        var n = doc.createElement("div");
//        n.style.border = "red solid";
        n.style.position = "absolute";
        n.style.whiteSpace = "nowrap";//禁止换行，特别是中文
//        n.appendChild(doc.createTextNode(text||""));

        return n;
    },

    setAttr : function(element) {
        var n = element._dom,
            s = n.style;

        s.left = element.x;
        s.top = element.y;
        s.rotation = element.rotation;

        //s.opacity = element.alpha;//VML不支持透明？
        /*if (element.alpha == 0) {
            element._visible = false;
        }*/
        s.visibility = element.visible ? "visible" : "hidden";

//        if (element.mask) {
//            s.clip = 'rect(0 50 200 200)';
//        }
    },

    getRect : function(element) {
        var n = element._dom,
            cRect = n.getBoundingClientRect();
        var rect = {
            x : element.x,
            y : element.y,
            left : cRect.left,
            top : cRect.top,
            right : cRect.right,
            bottom : cRect.bottom,
            width : cRect.right - cRect.left,
            height : cRect.bottom - cRect.top
        };
//        console.log("offset---", n.offsetLeft, "---", n.offsetWidth);
//        console.log("client---", n.clientLeft, "---", n.clientWidth);
//        console.log("scroll---", n.scrollLeft, "---", n.scrollWidth);
//        console.log("rect---", rect.left, "---", rect.width);
//        return r;

        return rect;
    },

    draw : function(shape) {
        var n = shape._dom;

        n.stroked = shape._drawLine;
////        n.dashStyle = [5];
//        n.strokeWeight = shape.lineWidth;
//        n.strokeColor = shape.lineColor;
        n.filled = shape._drawFill;
//        n.fillColor = shape.fillColor;
//        n.fillOpacity = shape.fillAlpha;

        if (shape._drawLine) {
            shape.stroke = shape.stroke || this._newSubNode("stroke");
            shape.stroke.opacity = shape.lineAlpha;
            shape.stroke.weight = shape.lineWidth;
            shape.stroke.color = shape.lineColor;
            shape.stroke.dashStyle = shape.lineDash ? "dash" : "solid";
            n.appendChild(shape.stroke);
        } else {
            if (shape.stroke && n.contains(shape.stroke)) {
                n.removeChild(shape.stroke);
            }
        }
        if (shape._drawFill) {
            shape.fill = shape.fill || this._newSubNode("fill");
            shape.fill.opacity = shape.fillAlpha;
            shape.fill.color = shape.fillColor;
            n.appendChild(shape.fill);
        } else {
            if (shape.fill && n.contains(shape.fill)) {
                n.removeChild(shape.fill);
            }
        }

        //TODO VML对[小数]支持不佳（可能还有[科学计数法]），在某些角度会出现渲染问题。*注意*需要转换
//        n.path = NumberUtil.roundPath(shape.dataArr.join(" "));
//        console.log("Reg::", NumberUtil.roundPath(shape.dataArr.join(" ")));
        for (var i in shape.dataArr) {
            if (typeof shape.dataArr[i] === 'number') {
                shape.dataArr[i] = Math.round(shape.dataArr[i]);
            }
        }
        n.path = shape.dataArr.join(" ");
//        console.log("round::", n.path);

        //IE8不兼容
        //attr(shape._dom, a);
    },

    curveTo: function(x1, y1, x2, y2, x, y) {
        var path = [
            "c",
            x1, y1,
            x2, y2,
            x, y
        ];
        return path;
    },

    arc : function(x, y, radius, startAngle, endAngle, anticlockwise, autoMove) {
        var r = radius,
            sa = startAngle,
            ea = endAngle,
            startX = x + Math.cos(sa) * r,
            startY = y + Math.sin(sa) * r,
            endX = x + Math.cos(ea) * r,
            endY = y + Math.sin(ea) * r;

        var path = [
            anticlockwise ? (autoMove ? "ar" : "at") : (autoMove ? "wr" : "wa"),
            x-r,
            y-r,
            x+r,
            y+r,
            startX, startY,
            endX, endY
        ];
        return path;
    },

    circle : function(x, y, radius) {
        var r = radius,
//            innerR = innerRadius || 0,
//            sa = Math.PI*0.3/4,
//            sx = Math.cos(sa)*r,
//            sy = Math.sin(sa)*r,
//            ea = Math.PI,
//            ex = Math.cos(ea)*r,
//            ey = Math.sin(ea)*r,
            path;

        path = [
            'wr',
            x-r,    //左
            y-r,    //上
            x+r,    //右
            y+r,    //下
            x+r, y,   //开始坐标
            x+r, y,    //结束坐标
            "x"     //封闭
        ];

        //'ar', -r, -r, r, r;//只能用AR和AT通过四个参数定义圆，属于不规范的写法
//        var arr = ['wa', -r, -r, r, r, sx, sy, ex, ey, 'l', 0, 0, 'l', sx, sy];//弧形、扇形

        return path;

//        s.width = d;
//        s.height = d;
    },
    rect : function(x, y, width, height, radius) {
        var w = width,
            h = height,
            d = Math.min(w, h),
            r = Math.min(d / 2, radius),
            path;

        if (r>0) {
            path = [
                "M",    x+r, y,
                "L",    x+w-r, y,
                "QX",   x+w, y+r,
                "L",    x+w, y+h-r,
                "QY",   x+w-r, y+h,
                "L",    x+r, y+h,
                "QX",   x, y+h-r,
                "L",    x, y+r,
                "QY",   x+r, y
            ]
        } else {
            path = [
                "M",    x, y,
                "L",    x+w, y,
                "L",    x+w, y+h,
                "L",    x, y+h,
                "L",    x, y
            ];
        }
        return path;
//        n.path = NumberUtil.roundPath(path);

//        s.width = rect.width;
//        s.height = rect.height;
//        n.arcSize = d>0 ? rect.radius/d : 0;//如果已在DOM里，不能设置此属性
    },
    /*drawPath : function(path) {
        var n = path._dom,
            d = path.data;
        //路径只接受整数？
        d = NumberUtil.roundPath(d);
        n.path = d;
    },*/

    setText : function(text) {
//        var n = text._dom;
//        n.firstChild.nodeValue = text.text;

        var node = text._dom,
            fontSize = text.fontSize,
            spacing = 3,
            arr = text.text.split(/<br>/ig);

        for (var i = 0; i < arr.length; i++) {
            var p = node.childNodes[i];
            if (p) {
                p.firstChild.nodeValue = arr[i];
            } else {
                p = doc.createElement("p");
                p.appendChild(doc.createTextNode(arr[i]));
                node.appendChild(p);
            }
            p.style.position = "static";
            p.style.margin = "0 0";
//            p.style.fontSize = fontSize;
        }

        while (node.childNodes.length > i) {
            node.removeChild(node.lastChild);
        }
    },

    setTextFormat : function(text) {
        var node = text._dom,
            s = node.style;
        s.letterSpacing = text.letterSpacing;
        s.lineHeight = Math.max(text.fontSize + text.lineHeight, 0) + "px";
        s.fontFamily = text.font;
        s.fontSize = text.fontSize;
        s.color = text.color;
        //s.textAlign = "right";//text.align;
    }
};
