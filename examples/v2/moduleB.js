Module.define("moduleB", ["window", "document", "undefined"], function(window, document, undefined) {
	
	function bar() {
		return "moduleB says bar()";
	}
	
	return {
		bar: bar
	}
	
});