/**
 * This is a very basic implementation of a module register. It itself exports
 * a global variable named Module and allows for two methods being called.
 * 
 * define allows you to register module under a string identifier, the creator
 *        function will be called only once upon the building of the module using...
 * build  will return the return value of the creator function of the module, it
 *        also remembers modules, thus two calls to build will return the exact
 *        same value
 */
var Module = (function(window, document, undefined) {
	
	var built;
	var defined;
	
	init();
	
	function init() {
		built = {};
		defined = {};
	}
	
	function define(id, creatorFunction) {
		defined[id] = creatorFunction;
	}
	
	function build(id) {
		if(!defined[id]) {
			throw "Module with id " + id + " is not defined.";
		}
		
		if(!built[id]) {
			built[id] = defined[id].apply(window, [window, document, undefined]);
		}
		
		return built[id];
	}
	
	return {
		define: define,
		build: build
	}
	
})(window, document);