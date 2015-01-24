# The most basic modularization

In this example, each code unit is represented by its own file and each file defines a global variable with the same name as the file. Eg. when loaded, `moduleA.js` creates a `var moduleA` in the global scope that makes the module accessable. The same with `moduleB`. The `App` module wires the app and represents the main entry point. `app.html` runs the app in browser environment.

## Dependencies

Dependencies are injected using a `init` method which allows to initialize a module's dependencies at run-time and not at creation-time of the module. Thus, modules can be loaded in arbitrary order. Also, implementations can be easily exchanged by passing anything to `init` that fits the contract (think mock for testing).

## Making it even simpler (or not)

We could just rely on the fact that a global variable representing our dependecies existed and access it, allowing us to get rid of the `init` method. In this case `moduleA` would just call `moduleB`, hoping it existed. This however is not recommended, as it makes it very hard to see what dependencies a module has and thus makes the code harder to read, understand and maintain.