var EventUtil = {
    addHandler : function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {//IE5+
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },
    removeHandler : function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = null;
        }
    },
    /*createEvent : function(attr) {
        if (doc.createEvent) {
            var event = doc.createEvent("HTMLEvents");
            event.initEvent("change", true, false);
            return extend(event, attr);
        }
        return extend(doc.createEventObject(), attr);
    },
    dispatchEvent : function(element, event) {
        if (element.dispatchEvent) {
            element.dispatchEvent(event);
        }
        else {
            element.fireEvent("on" + event.type, event);
        }
    },*/
    getEvent : function(event) {
        event = event || win.event;
        if (!win.addEventListener && win.attachEvent) {//IE8-
            vcharts.event = vcharts.event || {};
            event = extend(vcharts.event, event);
        }
        return event;
    },
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation : function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};


