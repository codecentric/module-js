var App = (function(window, document, moduleA, moduleB, undefined) {
	
	//moduleA and moduleB are in this case global variables that get passed to
	//this function but would be available anywhere.
	
	//We now wire our modules together via init
	moduleA.init(moduleB);
	
	function run() {
		console.log(moduleA.foo());
	}

	return {
		run: run
	};
	
})(window, document, moduleA, moduleB); //Note: moduleA and B are passed from the global scope

//Running the app should print moduleB's bar() return value to the console, in this case
App.run();