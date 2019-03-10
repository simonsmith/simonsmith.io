---
title: Destructuring objects as function parameters in ES6
date: 2015-07-28
path: "/destructuring-objects-as-function-parameters-in-es6"
draft: false
---

One of the new features available in ES6 is destructuring, which is a succinct way to extract values from objects and arrays.

I won't be covering [every aspect of destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) but I will go over my favourite usage of it which is extracting values from objects in function parameters.

## Extracting values from a configuration object

A very common pattern is to allow functions to accept an object, often used in configuration as the order of the properties does not matter. Then the values can be used in the function body:

```js
// ES5
function myFunc(opts) {
  var name = opts.name;
  var age = opts.age;
}

myFunc({ name: 'John', age: 25 });
```

The previous example can be rewritten like so in ES6

``` js
// ES6
function myFunc({name, age}) {

}
```

## Default values

The point of using an object in this way is usually to allow default values so that the user only has to pass in the ones they wish to change. This usually involves checking if the value is undefined or using some sort of [`assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) function:

``` js
// ES5
function myFunc(opts) {
  var name = opts.name === undefined ? 'Default user' : opts.name;
  var age = opts.age === undefined ? 'N/A' : opts.age;
}
```

``` js
// ES6
function myFunc({name = 'Default user', age = 'N/A'}) {

}

// It can also be split onto multiple lines
function myFunc({
  name = 'Default user',
  age = 'N/A'
}) {

}
```

When you have an object with several properties this can really reduce the sea of `something === undefined` checks at the top of your function.

## Allowing the configuration object to be optional

If you're happy with the default values then you would expect to just call the function with no arguments:

``` js
myFunc(); // error!
```

The problem here is that behind the scenes our `opts` object is undefined so trying to reference `opts.name` or `opts.age` will throw an error.

The way to circumvent this is to set a default value for the configuration object itself:

``` js
function myFunc({name = 'Default user', age = 'N/A'} = {}) {

}
```

This syntax looked a bit odd to me at first but when you think the object on the left side of the `=` operator might be undefined then it makes sense that we can also set a default value for that too.

Here's how you might do that in ES5 land:

``` js
function myFunc() {
  var opts = arguments[0] === undefined ? {} : arguments[0];
  var name = opts.name === undefined ? 'Default user' : opts.name;
  var age = opts.age === undefined ? 'N/A' : opts.age;
}
```

## Renaming the extracted values

One useful technique is to give the object keys descriptive names for use on the outside of the function, but inside rename them to something simpler:

``` js
function myFunc({someLongPropertyName: prop}) {
  console.log(prop);
}

myFunc({someLongPropertyName: 'Hello'})
// logs 'Hello'
```

And of course this can be combined with default values:

``` js
function myFunc({someLongPropertyName: prop = 'Default string'} = {}) {
  console.log(prop);
}
```

This is very useful when your function(s) is being used by other developers as it allows you use very descriptive keys to form your API.

Another side effect is to rename them to take advantage of shorthand property naming which is another ES6 nicety:

``` js
function getComponent({containerClass: className = 'Component'} = {}) {
  // Here we can avoid {className: className}
  return React.createElement(SomeComponent, {className});
}

// Users of the function know exactly what the className does
getComponent({containerClass: 'Container'});
```

And we're done.

## Resources

* [ES6 In Depth: Destructuring](https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/)
* [Destructuring and parameter handling in ECMAScript 6](http://www.2ality.com/2015/01/es6-destructuring.html)
