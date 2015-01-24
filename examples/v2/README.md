# Using a module register with explicit dependencies

This example uses a module register defined in `./../v2/module.js`. It basically works the same way as in `v1`, allowing us to  define modules and register them with the module register. However, we now allow (or require) explicit dependency information for each module.

Since `moduleA` depends on `moduleB`, the module definition includes this information. The module register saves this information on definition-time. When `moduleA` is requested to be built. The module register will first build all the dependencies and then inject them into the creator function of `moduleA`. Please take a look at `./../v2/module.js` to understand how module definitions work and how the recursive dependency build process works.

## Dependencies

Dependencies are now injected automatically when the creator function is called. This allows us to remove any init methods we had before. Also the whole wiring process can be removed from `App` because module now handles the wiring automatically.

## Why is this better?

This approach removed the need for a lot of initialization code,  especially the need to explicitly call all the init method and build the modules manually in the correct order now is left to the register. As you can see in `moduleA` it however is a bit cumbersome that we have to explicitly name `window`, `document` and `undefined` in the module's dependencies. In this case we could of course just remove them from the dependencies as well as the function parameters as they are not really needed by the module.