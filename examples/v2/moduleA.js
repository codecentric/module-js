Module.define("moduleA", ["window", "document", "moduleB", "undefined"], function(window, document, moduleB, undefined) {

	//This function uses moduleB's functionality
	function foo() {
		return moduleB.bar();
	}
	
	return {
		foo: foo
	}
	
});