/**
 * 扩展
 * @param {Object} target 
 * @param {Object} json 
 */
function extend( target, json ) {
    for ( var key in json ) {
		target[ key ] = json[ key ];
	}
    return target;
}