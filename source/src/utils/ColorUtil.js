/**
 * ColorUtil
 * 内部统一使用格式：十进制整数
 * 输出（out）格式：六位数的十六进制字符串（#FFFFFF）
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */

//Color.fromString("#ff0000").lightOffset(10).toCSS();
var ColorUtil = {
    createHueColors: function (length) {
        var colors = [];
        var unit = 360 / length;

        for (var j = 0; j < length; j++) {
            colors.push(ColorUtil.toString(ColorUtil.fromHSB(j * unit, 70, 90)));
        }

        return colors;
    },

    fromString: function (color) {
        if (!color) {
            return 0;
        }
        else {
            var arr = color.match(/[0-9a-fA-F]{6}/g);
            if (arr.length) return parseInt(arr[0], 16);
        }
        return 0;
    },

    fromRGB: function (r, g, b) {
        return (r << 16) | (g << 8) | b;
    },

    fromHSB: function (H, S, B) {
        var nH, nS, nV;
        var nR, nG, nB;
        var hi, f, p, q, t;

        nH = H / 360;
        nS = S / 100;
        nV = B / 100;

        if (S == 0) {
            nR = nV * 255;
            nG = nV * 255;
            nB = nV * 255;
        }
        else {
            hi = nH * 6;
            if (hi == 6) hi = 0;
            f = hi;
            p = nV * (1 - nS);
            q = nV * (1 - nS * (hi - f));
            t = nV * (1 - nS * (1 - (hi - f)));

            if (f == 0) {
                nR = nV;
                nG = t;
                nB = p;
            }
            else if (f == 1) {
                nR = q;
                nG = nV;
                nB = p;
            }
            else if (f == 2) {
                nR = p;
                nG = nV;
                nB = t;
            }
            else if (f == 3) {
                nR = p;
                nG = q;
                nB = nV;
            }
            else if (f == 4) {
                nR = t;
                nG = p;
                nB = nV;
            }
            else {
                nR = nV;
                nG = p;
                nB = q;
            }
        }
        return ((nR * 255) << 16) | ((nG * 255) << 8) | (nB * 255);
    },

    /**
     * 更改RGB颜色值亮度
     * 有效范围：-255至255之间
     * @param color
     * @param brite
     * @return
     */
    adjustBrightness: function (color, brite) {
        color = ColorUtil.fromString(color);

        var r = Math.max(Math.min(((color >> 16) & 0xFF) + brite, 255), 0);
        var g = Math.max(Math.min(((color >> 8) & 0xFF) + brite, 255), 0);
        var b = Math.max(Math.min((color & 0xFF) + brite, 255), 0);

        return ColorUtil.toString(ColorUtil.fromRGB(r, g, b));
    },

    toString: function (color) {
        var color = color.toString(16);
        while(color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }
};


