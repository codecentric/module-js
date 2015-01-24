Module.define("moduleA", function(window, document, undefined) {

	//This module depends on another module
	var moduleB;
	
	//Via init we allow to set the dependency
	function init(_moduleB) {
		moduleB = _moduleB;
	}
	
	//This function uses moduleB's functionality
	function foo() {
		return moduleB.bar();
	}
	
	return {
		init: init,
		foo: foo
	}
	
});