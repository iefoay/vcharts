/**
 * 统一绘图命令
 * @author yaofei <oiue@163.com>
 * License: http://vcharts.cn/LICENSE
 */
var M = "M",
    L = "L",
    C = "C",
    Q = "Q",
    A = "A",
    Z = 'Z';
if (hasSVG) {
    xmlRenderer = svg;
}
else if (isIE) {
    var isIE8 = userAgent.indexOf('MSIE 8.0') > -1;
    if (!doc.namespaces.v) {
        document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
        document.createStyleSheet().cssText =
            'v\\: * { behavior:url(#default#VML); display: inline-block; } ';
    }
    Q = 'qb';
    A = 'ar';
    Z = 'x';
    extend(xmlRenderer, vml);
}
else {
    throw "抱歉，vcharts不支持此浏览器！";
}