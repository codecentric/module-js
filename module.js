var Module = (function(window, document, undefined) {
	
	var STATIC_DEPENDENCIES = ["window", "document", "undefined"];
	
	// Regex to determine dependencies out of parameter names, which originate from this
	// Stackoverflow answer: http://stackoverflow.com/a/12108723 and originally seem
	// to come from a portion of AngularJS.
	var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	
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
	
	function define(id, creatorFunction) {
		if(defined[id] || STATIC_DEPENDENCIES.indexOf(id) !== -1) {
			throw "Module with id " + id + " is already defined.";
		}
		
		defined[id] = {
			dependencies: parameterNames(creatorFunction),
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
	
	function parameterNames(fn) {
	  var parameterNames = [];
	  var functionText = fn.toString().replace(STRIP_COMMENTS, '');
	  var functionParameters = functionText.match(FN_ARGS)[1].split(FN_ARG_SPLIT);
	  for(var i = 0; i < functionParameters.length; i++) {
		  parameterNames.push(functionParameters[i].match(FN_ARG)[2]);
	  }
	  return parameterNames;
	}
	
	return {
		define: define,
		build: build
	}
	
})(window, document);