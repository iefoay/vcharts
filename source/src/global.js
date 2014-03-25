var doc = document,
    win = window,
    nav = navigator,
    version = appVersion,
    userAgent = navigator.userAgent,
   	isOpera = win.opera,
   	isIE = /msie/i.test(userAgent) && !isOpera,
    svgns = "http://www.w3.org/2000/svg",
    hasSVG = !!doc.createElementNS && !!doc.createElementNS(svgns, "svg").createSVGRect,

    xmlRenderer = null;

function isString(s) {
	return typeof s === 'string';
}

function getElementById(id) {
    var el = null;
    try {
        el = doc.getElementById(id);
    }
    catch (e) {
    }
    return el;
}

function attr(node, attr) {
    for (var key in attr) {
        node.setAttribute(key, attr[key]);
    }
}

var merge = extend;

