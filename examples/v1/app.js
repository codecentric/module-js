var App = (function(window, document, Module, undefined) {
	
	//Setup code builds all modules (not: order does not matter) ...
	var moduleB = Module.build("moduleB");
	var moduleA = Module.build("moduleA");
	
	//... and wires them together using their init-functions.
	moduleA.init(moduleB);
	
	function run() {
		console.log(moduleA.foo());
	}

	return {
		run: run
	};
	
})(window, document, Module);

//Running the app should print moduleB's bar() return value to the console, in this case
App.run();