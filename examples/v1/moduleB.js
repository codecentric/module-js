Module.define("moduleB", function(window, document, undefined) {
	
	function bar() {
		return "moduleB says bar()";
	}
	
	return {
		bar: bar
	}
	
});