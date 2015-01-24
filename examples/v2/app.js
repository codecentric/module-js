var App = (function(window, document, Module, undefined) {
		
	function run() {
		console.log(Module.build("moduleA").foo());
	}

	return {
		run: run
	};
	
})(window, document, Module);

//Running the app should print moduleB's bar() return value to the console, in this case
App.run();