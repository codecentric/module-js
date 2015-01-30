/**
 * This is a bit more elaborate version of a module register that automatically
 * resolves dependencies when building modules. A module can define dependencies
 * to other modules or the three static dependencies: window, document, undefined.
 *
 * The build process recursivley resolves all dependencies of a module and calls
 * the creator function with all the built dependencies (in the same order).
 * 
 * define allows you to register module under a string identifier; the creator
 *        function will be called only once upon the building of the module. The
 *        dependencies of the module need to be specified as string identifiers
 *        need to be registered on build-time of the module.
 * build  will return the return value of the creator function of the module, which
 *        will receive the built dependencies in their original order; it
 *        also remembers modules, thus two calls to build will return the exact
 *        same value
 */
var Module = (function(window, document, undefined) {
	
	var STATIC_DEPENDENCIES = ["window", "document", "undefined"];
	
	var built;
	var defined;
	
	init();
	
	function init() {
		built = {
			window: window,
			document: document,
			undefined: undefined
		};
		defined = {};
	}
	
	function define(id, dependencies, creatorFunction) {
		if(defined[id] || STATIC_DEPENDENCIES.indexOf(id) !== -1) {
			throw "Module with id " + id + " is already defined.";
		}
		
		defined[id] = {
			dependencies: dependencies,
			creatorFunction: creatorFunction
		};
	}
	
	function build(id) {
		if(!defined[id] && STATIC_DEPENDENCIES.indexOf(id) === -1) {
			throw "Module with id " + id + " is not defined.";
		}
		
		if(!built[id] && id !== "undefined") {
			//Collect dependencies
			var dependencyIds = defined[id].dependencies;
			var builtDependencies = [];
			for(var i = 0; i < dependencyIds.length; i++) {
				builtDependencies.push(build(dependencyIds[i]));
			}
			built[id] = defined[id].creatorFunction.apply(window, builtDependencies);
		}
		
		return built[id];
	}
	
	return {
		define: define,
		build: build
	}
	
})(window, document);