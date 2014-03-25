/*
 * NumberUtil
 */
var NumberUtil = {
	roundToPrecision : function(number, precision) {
		var decimalPlaces = Math.pow(10, precision || 0);
		return Math.round(decimalPlaces * number) / decimalPlaces;
	},

    roundPath : function(path) {
        return path.replace(/[-+]?\d*\.?\d+/g, function (){
//            var n = Number(arguments[0]).toFixed(0);
//            n = Number(n);
//            console.log(arguments[0]);
            return Math.round(Number(arguments[0]));
        });
    }
};
