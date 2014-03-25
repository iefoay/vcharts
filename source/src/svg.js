/**
 * SVG绘图类
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var svg = xmlRenderer = {
    type : "svg",

    _newNode: function (type) {
        var node = doc.createElementNS(svgns, type);
        return node;
    },
    newDocument: function (desc) {
        var n = this._newNode("svg");
        n.style.position = "relative";
        n.style.width = "100%";
        n.style.height = "100%";
        attr(n, {
//            "encoding" : "utf-8",
            "version": "1.1"
        });

        if (desc) n.appendChild(this._newNode("desc")).appendChild(doc.createTextNode(desc));

        return n;
    },
    newGroup: function () {
        var n = this._newNode("g");
//        n.position = "static";
        return n;
    },
    newPath: function () {
        var n = this._newNode("path");
        n.style.fillRule = "evenodd";//填充区域
        return n;
    },
    newText: function () {
        var node = this._newNode("text");
        var a = {
            "font-family": "Verdana, Console, Arial, 微软雅黑, 宋体",
            "font-size": 12,
            "fill": "#666666",
            "text-anchor": "start"
        };
        attr(node, a);
        return node;
    },

    setAttr: function (element) {
        var node = element._dom,
            trans = [];
        var a = {
//            "display" : this.activated ? "inline-block" : "none"
        };
//        if (element._visible != element.visible) {
        a["visibility"] = element.visible ? "visible" : "hidden";
//        }
        if (element._alpha != element.alpha) {
            a["opacity"] = element.alpha;
        }

        if (element._x != element.x || element._y != element.y) {
            trans.push("translate(" + element.x + ", " + element.y + ")");
        }
        if (element._rotate != element.rotation) {
            trans.push("rotate(" + element.rotation + ")");
        }
        if (trans.length > 0) {
            a["transform"] = trans.join(" ");
        }

        if (element.mask) {
            a["clip-path"] = "url(#" + element.mask.id + ")";
        }

        attr(node, a);
    },

    getRect: function (element) {
        var cRect = element._dom.getBoundingClientRect();
        var rect = {
            x: element.x,
            y: element.y,
            left: cRect.left,
            right: cRect.right,
            top: cRect.top,
            bottom: cRect.bottom,
            width: cRect.width,
            height: cRect.height
        };
        return rect;
    },

    draw: function (shape) {
        var a = {
            "stroke": shape._drawLine ? shape.lineColor : "none",
            "stroke-dasharray": shape.lineDash ? 5 : "none",
            "stroke-width": shape.lineWidth,
            "stroke-opacity": shape.lineAlpha,
            "fill": shape._drawFill ? shape.fillColor : "none",
            "fill-opacity": shape.fillAlpha
        };

        if (shape.gradientType == "linear" || shape.gradientType == "rad") {
            if (shape.gradientType == "linear") {
                var gradient = shape.appendChild(this._newNode("linearGradient"));
            }

            for (var i = 0; i < shape.colors.length; i++) {
                var stop = gradient.appendChild(this._newNode("stop"));
                attr(stop, {
                    "offset": shape.ratios[i] * 100 + "%",
                    "stop-color": shape.colors[i],
                    "stop-opacity": shape.alphas[i]
                });
            }
        }

        attr(shape._dom, {d: shape.dataArr.join(" ")});
        attr(shape._dom, a);
    },

    curveTo: function(x1, y1, x2, y2, x, y) {
        var path = [
            "C",
            x1, y1,
            x2, y2,
            x, y
        ];
        return path;
    },

    arc : function(x, y, radius, startAngle, endAngle, anticlockwise, autoMove) {
//        console.log(this);
        var r = radius,
            sa = startAngle,
            ea = endAngle,
            startX = x + Math.cos(sa) * r,
            startY = y + Math.sin(sa) * r,
            endX = x + Math.cos(ea) * r,
            endY = y + Math.sin(ea) * r,
            large = Math.abs(endAngle-startAngle) > Math.PI ? 1 : 0,
            sweep = anticlockwise ? 0 : 1;

        var path = [
            autoMove ? "M" : "L",
            startX, startY,
            "A", r, r, 0, large, sweep, endX, endY
        ];
        return path;
    },

    circle: function (x, y, radius) {
        var r = radius,
            path;

        path = [
            "M", x+r, y,
            "a", r, r, 0, 0, 1, -2 * r, 0,//顺时针方向
            "a", r, r, 0, 0, 1, 2 * r, 0
        ];

        return path;
    },

    rect: function (x, y, width, height, radius) {
        var w = width,
            h = height,
            d = Math.min(w, h),
            r = Math.min(d / 2, radius),
            path;

        if (r > 0) {
            var wl = w - r * 2,
                hl = h - r * 2;
            path = [
                "M", x + r, y,
                "h", wl,
                "q", r, 0, r, r,
                "v", hl,
                "q", 0, r, -r, r,
                "h", -wl,
                "q", -r, 0, -r, -r,
                "v", -hl,
                "q", 0, -r, r, -r
            ];
        } else {
            path = [
                "M", x, y,
                "h", w,
                "v", h,
                "h", -w,
                "v", -h
            ];
        }

        return path;
    },

    setText: function (text) {
        var node = text._dom,
            fontSize = text.fontSize,
            spacing = Math.max(-text.fontSize, text.lineHeight),
            arr = text.text.split(/<br>/ig);

        // TODO Safari新建TextNode后不能正确读取偏移值，搞了一天;(
        for (var i = 0; i < arr.length; i++) {
            var tspan = node.childNodes[i];
            if (tspan) {
                tspan.firstChild.nodeValue = arr[i];
            }
            else {
                tspan = this._newNode("tspan");
                var tn = tspan.appendChild(doc.createTextNode(arr[i]));
//                tn.style.setProperty("whiteSpace", "pre-wrap");
                node.appendChild(tspan);
            }

            attr(tspan, {
                "font-size": fontSize,
                "x": 0,
                "y": i * (fontSize + spacing),
                "dy": fontSize
            });

//            span.firstChild.appendData("dsjfow");
        }

        while (node.childNodes.length > i) {
            node.removeChild(node.lastChild);
        }
    },

    setTextFormat: function (text) {
        var node = text._dom;
        var a = {
            "font-family": text.font,
            "letter-spacing" : text.letterSpacing,
            //"font-size" :    text.fontSize,//在每个tspan分别设置
            //"text-anchor": text.align,
            "fill": text.color
        };
        attr(node, a);
    }
};
