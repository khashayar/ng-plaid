# ng-plaid

[Plaid Link](https://github.com/plaid/link) wrapper for [AngularJS](https://angularjs.org/). Currently only supports
[custom integration](https://github.com/plaid/link#step-2-custom-integration).




### Installing

**Bower**

`bower install ng-plaid --save`

**NPM**

`npm install ng-plaid --save`

---


### Getting Started

Checkout the [official documentation](https://github.com/plaid/link) for additional details on using Plaid Link.

#### Step 1: Add the plaid link script

Make sure you have the plaid link script loaded on your page:

```
<body>
...

<script src="https://cdn.plaid.com/link/stable/link-initialize.js"></script>
</body>
```


#### Step 2: Inject `ng-plaid`

Inject `ng-plaid` into your app module:

```
angular.module('MyApp', [
    ...
    'ng-plaid',
    ...
]);
```


#### Step 3: Pre-configure the Plaid Link handler

You can configure the handler 2 ways, by using the `plaidProvider` and calling `.init` inside a config block or
directly on the `.create` method (see step 4). `init` accepts a single object parameter.
[Available configuration parameters](https://github.com/plaid/link#custom-integration)

```
...
.config([
    'plaidProvider',

    function(plaidProvider) {
        plaidProvider.init({
            clientName: 'My App',
            env: 'tartan',
            key: 'test_key',
            product: 'auth'
        });
    }
])
...
```


#### Step 4: Call `.create` to create the handler
The first parameter accepts a configuration object just like `init` in `plaidProvider`. In addition you can pass the
`onSuccess` and `onExit` callback functions as the second and third parameters.

```
.controller('ctrl', ['plaid'

    function(plaid) {
        plaid.create(
        // configurations here will override matching plaidProvider.init configurations
        {
            clientName: 'My App',
            env: 'tartan',
            key: 'test_key',
            product: 'auth'
        },

        // success callback
        function(token) {
            console.log('token: ', token);

            // pass the token to your sever to retrieve an `access_token`
            // see https://github.com/plaid/link#step-3-write-server-side-handler
        },

        // user exit callback
        function() {...});
    }
]);
```


#### Step 5: Call `.open` to open the Plaid Link interface

You can pass an optional bankType parameter to open directly to a specific bank.
https://plaid.com/docs/#institutions contains the valid `bankType`'s you can pass.

```
plaid.open(bankType);   // bankType is optional
```

You can use `plaid.isLoaded()` to determine if the link module has been loaded before attempting to call `.open`.
