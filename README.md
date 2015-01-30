# Module

Module is an extremely light-weight implementation of a register for JavaScript modules.

A module is just a code unit represented by a function. Modules are registered and retrieved via Modules two methods define and build. Module supports automatic dependency detection and injection through parameter names.

## How to use

Define a module:

```js
Module.define("MyModule", function(window, document, undefined, MyOtherModuleDependency) {
 /* ... */
});
```

Retrieve a module:
```js
var myModule = Module.build("MyModule");
```

Notes: `MyOtherModuleDependency` is injected on the call to `build` into the creator function registered on `Module.define`, since it is a dependency. If one or more of your dependencies has not been registered `build` will fail. Subsequent calls to `build` will return the exact same object. `window`, `document` and `undefined` are static dependencies that do not need to be and can not be defined. Check the code yourself it is short and easy to understand.

## Blog article and examples

The road to creating Module is described in a blog article on our corporate blog: COMING SOON. 

There are multiple iterations of Module available in the v{1,2} folders along with examples in the examples folder. The examples also contain a README.md that explains how things work. The examples/final folder contains a basic explanation of the idea behind Module.

## Limitations

*Circular dependencies* will currently lead to an endless recursion.

*Code mini/uglification* will most likely rename the parameters of your module's creator function, which kills Module's ability to find the correct dependency to inject.

*Reserved words*. Usage of these as module ids might lead to unwanted behavior.