# Using a module register

This example uses a module register defined in `./../v1/module.js`. In `v0` each module created a new global variable which is not a very good idea as it -- as some call it -- pollutes the global scope. This might lead to conflicts in variable naming. Eg. if you use jQuery which creates a global variable named `$` and you were to name your module `$`, too, this would be a conflict.

This approach introduces a module register which allows you to register your modules using an string identifier. Each code unit is again represented by a file and each file registers (defines) a module with the register. Please take a look at `./../v1/module.js` to understand how module definitions work. Basically, `Module.define(id, function)` does the job with `id` being your module identifier and `function`  the same anonymous function we had before with the exception that it is not immediately called. It is only called when `Module.build(id)` is run.

## Dependencies

Dependencies work the same as with `v0` and are injected using a `init` method which allows to initialize a module's dependencies at run-time and not at creation-time of the module. Thus, modules can be loaded in arbitrary order. Also, implementations can be easily exchanged by passing anything to `init` that fits the contract (think mock for testing).

## Why is this better?

It is already explained in the introduction. Instead of making every module a global variable, we keep everything in the register and only have `Module` as the only global variable and (as a potential downside) implicit dependency of all our modules. This also makes namespacing easy as your module's id can be any string, e.g. `MyAwesomeNamespace.ModuleA`.