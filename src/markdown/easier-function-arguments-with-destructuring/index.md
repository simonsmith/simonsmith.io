---
date: 2018-05-11
title: Easier function arguments with destructuring
path: "/easier-function-arguments-with-destructuring"
---

This is just a simple tip but one I think is worth mentioning, particularly
after spending some time working on a large code base that I was not overly
familiar with.

## Add curly braces and carry on

Destructuring function arguments is such a useful addition to JavaScript,
especially when it can be used to perform the following change:

```js
// Before
function someFunction(isFeatureEnabled, timeout) {

}

// After
function someFunction({isFeatureEnabled, timeout}) {

}
```

Inside the function I can continue to use `isFeatureEnabled` and `timeout`
exactly as before, but it's where the function is called from that difference is
made:

```js
// Before
someFunction(true, 400);

// After
someFunction({isFeatureEnabled: true, timeout: 400});
```

For me this makes it very clear what the values being passed in are used for and
now I don't need to look up the source of the function to find out what `true`
and `400` could mean.

This can be particularly tiresome if `someFunction` is located in another file
as now it's an additional plate to keep spinning as you comprehend the code.

## Even with single arguments?

These functions can also benefit from the increased readability:

```js
getSomeDataFromApi(2);


getSomeDataFromApi({pageNum: 2});
```

## Renaming arguments


Don't be afraid to make the property names verbose if needs be as they can
always be renamed inside the function to make things easier:

```js
someOtherFunction({currentUserIsAdmin: true});

function someOtherFunction({currentUserIsAdmin: isAdmin}) {
  // ...
  // Do something with `isAdmin`
}
```

That's it!

## Related

* [Destructuring objects as function parameters in ES6]({{< ref "blog/destructuring-objects-as-function-parameters-in-es6.md" >}})
