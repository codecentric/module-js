var moduleB = (function(window, document, undefined) {
	
	function bar() {
		return "moduleB says bar()";
	}
	
	return {
		bar: bar
	}
	
})(window, document);