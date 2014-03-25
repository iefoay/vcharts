/**
 * 类的继承
 * @param {Function} thisClass
 * @param {Function} superClass
 */
var inherits = (function() {
	
	function Clazz() {
	}
	
	return function( thisClass, superClass ) {
	
	    var key, tempPrototype, thisPrototype = thisClass.prototype;
		Clazz.prototype = superClass.prototype;
	    tempPrototype = thisClass.prototype = new Clazz();
	    
	    for ( key in thisPrototype ) {
	        tempPrototype[ key ] = thisPrototype[ key ];
	    }
		
	    thisClass.prototype.constructor = thisClass;
	    thisClass.superClass = superClass.prototype;
	    
	    return thisClass;
	};
	
})();