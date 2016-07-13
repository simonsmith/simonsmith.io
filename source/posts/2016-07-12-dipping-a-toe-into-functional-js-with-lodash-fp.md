---
title: Dipping a toe into functional JS with lodash-fp
date: 2016-07-12
type: post
published: true
---

Recently I've been making an effort to write JavaScript in a more functional
manner. It requires a change of mind in how to approach problems, but I'd like
to share some of the basics that I've learnt so far.

I'll also take a look at how
[lodash-fp](https://github.com/lodash/lodash/wiki/FP-Guide) makes functional
code a pleasant experience.

## Why write functionally?

Before going any further let's have a look at some examples of why we might even
want to entertain this whole functional idea. The first and sometimes most
revealing benefit is switching from explicit to implicit code.

### Explicit

Here is how you could square all the members of an array explicitly:

```js
function squareAll(numbers) {
  var squared = [];
  for (var i = 0; i < numbers.length; i++) {
    squared.push(numbers[i] * numbers[i]);
  }
  return squared;
}

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```

At every step of the way we have to tell the JS engine exactly what to do and
whilst it's nice to be thorough it leaves more room for bugs and unoptimised code.

It's also just plain ugly to read.

### Implicit

A more implicit approach is to use `Array.map`:

```js
function squareAll(numbers) {
  return numbers.map(num => num * num);
}

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```

Here we're leaving the details of looping and creating a new array to the `map`
array method, which is easier to read and less error prone. This is much better,
but we still need to call it on the `numbers` array manually. Could we do
better?

```js
const map = require('lodash/fp/map');

const squareAll = map(num => num * num);

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```

Okay, now we're talking!

Using `lodash-fp` means the functions are curried for us by default, and the
argument order is swapped around so it goes from the more familiar version of
`map(array, function)` to `map(function, array)`. We also no longer deal with
the `numbers` argument which is a concept known as point-free
programming.

Another nice side effect is little code to read, test and maintain.

But, a lot changed from the explicit `for` loop we had earlier, including the
introduction of terms like 'curried' and 'point-free' so now would be
an ideal time to clarify some terminology.

## A delicious curry

Currying is where a function expects a certain amount of arguments and if
provided with less, it returns another function that is awaiting the remaining
arguments.

Only once it receives all expected arguments does a result get returned.

If provided with the expected amount of arguments all at once it works as normal
and returns a result.

```js
const curry = require('lodash/fp/curry');

const greet = curry((greeting, name) => `${greeting}, ${name}!`);

// Passing both arguments allows the function to work as normal
greet('Hello', 'Simon'); // Hello, Simon!

// Passing fewer however, returns another function
const sayBye = greet('See ya');

// And once it receives all its arguments, it returns a value
sayBye('John'); // See ya, John!;
```

Here is how the [lodash-fp
documentation](https://github.com/lodash/lodash/wiki/FP-Guide) describes itself:

> The lodash/fp module promotes a more functional programming (FP) friendly style
by exporting an instance of lodash with its methods wrapped to produce immutable
auto-curried iteratee-first data-last methods.

With that in mind, we can now see why the last `squareAll` example allowed us
to pass the logic to `map` first, and then call it with an array later. We could
also have done it one step like so:

```js
map(num => num * num, [1, 2, 3, 4]); // [1, 4, 9, 16]
```

We can start to appreciate the use of currying when we look at the next section,
composition.

## Compose yourself

The idea of composing functions (or `flow` in lodash) is to build a larger
function out of many smaller ones. The data goes in one end and flows (ah ha!)
through each function until it comes out the other side. Each function in the
chain passes its return value to the next.

Let's see an example using lodash-fp:

```js
const flow = require('lodash/fp/flow');
const escape = require('lodash/fp/escape');
const trim = require('lodash/fp/trim');

const sanitise = flow(escape, trim);

sanitise('    <html>    '); // &lt;html&gt;
```

You can see that we've created a `sanitise` function from `escape` and `trim`
and when the HTML string is passed in it flows through these two functions
before being returned as expected. Again, we're just being implicit and
declaring what we want to happen, not how.

### How does currying help?

Lodash-fp functions are auto-curried, so when given fewer arguments than
expected they give back a function. This works really well with `flow`:

```js
const flow = require('lodash/fp/flow');
const get = require('lodash/fp/get');
const isEqual = require('lodash/fp/isEqual');

const data = {
  items: 45
};

const hasAllItems = flow(get('items'), isEqual(45));

hasAllItems(data) // true
```

Here we're configuring the `get` and `isEqual` functions with the arguments
needed to get the result, and now they're waiting for their final argument which
is the data. Thanks to `flow` we can pass that in at one end and let it pass
through each curried function until our expected value comes out at the end.

> For composition to work each function should be unary (accept one argument)
  and return a single value for the next function to consume. It's fine for the
  first function to be polyadic (takes multiple arguments) as long it returns a
  single value.

### One more example

What about iterating over a set of items and filtering them?

```js
const flow = require('lodash/fp/flow');
const get = require('lodash/fp/get');
const filter = require('lodash/fp/filter');
const isEqual = require('lodash/fp/isEqual');

const items = [
  {name: 'baz'},
  {name: 'foo'},
  {name: 'bar'},
  {name: 'bar'},
  {name: 'foo'},
];

const getBars = filter(
  flow(get('name'), isEqual('bar'))
);

getBars(items); // [{name: 'bar'}, {name: 'bar'}]
```

The function created by `flow` is what is used by `filter` to apply to each member
of the array. Each item is passed through the `get` and `isEqual` and if it
satisfies the condition it ends up in the new array.

Hopefully you're getting the hang of this!

## A note on point-free

You may have noticed that in the last two examples you can't see any mention of
`data` or `items` apart from when it is passed in as an argument. From the
[Wikipedia page](https://en.wikipedia.org/wiki/Tacit_programming):

> Tacit programming, also called point-free style, is a programming paradigm in
  which function definitions do not identify the arguments (or "points") on which
  they operate. Instead the definitions merely compose other functions, among
  which are combinators that manipulate the arguments.

Without trying we've written some point-free code!

It's not something to worry about too much, but keeping it in mind
has helped me transform code like this:

```js
function isSuccess(response) {
  if (response.status === 200) {return true;}
}

isSuccess(response);
```

Into something more concise:

```js
const isSuccess = flow(get('status'), isEqual(200));

isSuccess(response);
```

It's a useful guideline to follow.

## Pure functions

The last topic to look at is the concept of function purity. This is a function
that doesn't depend on state outside of its scope, and doesn't modify it either.
Its only jurisdiction is that of the arguments passed in, and even then it
should never mutate this data, but return new versions.

Not only does this make testing simpler (you can just pass different arguments
and test the results without needing to mock global objects) but it makes code
more predictable.

Here's an example where a function mutates its input:

``` js
const data = {
  foo: 'bar'
};

function sendData(data) {
  data.baz = 'test';
  API.send(data);
}

function renderData(data) {
  // render it, but now I have a baz property?
}

sendData(data);
renderData(data);
```

`sendData` needs to add an additional property before sending the payload to an
endpoint. This causes problems for `renderData` as objects are [passed by
reference](http://nsono.net/javascript-pass-by-value-or-pass-by-reference/) so
now when it comes to render the payload it has an additional `baz` property that
should not be there.

The correct approach would be to create a copy and leave the input untouched:

```js
function sendData(data) {
  const newData = assign({}, data, {baz: 'test'});
  API.send(newData);
}
```

> Functions in lodash like `pick`, `omit`, `map` etc will always return new copies
of the data.

It won't be possible to always write pure functions, especially if you're
interacting with things like `document` or `window` but it's another thing to
keep in mind.

## Practical examples

Well done for shunning the TL:DR crowd and making it this far!

After wading through all the same topics I found it hard to apply them to my
code as I wasn't often squaring numbers, or greeting users.

Thankfully it's quite easy to start writing JS in a functional way, even if it's
just in small doses. So now I'll go through some small examples that will
hopefully inspire you to carry on.

### Extracting props in a React component

```json
{
  "user": {
    "profile": {
      "username": "simonsmith",
      "age": "31",
      "img": "http://image.com",
      "gender": "male"
    }
  }
}
```

```js
// Returns {username: 'simonsmith', img: 'http://image.com', age: '31'}
const getUserProps = flow(
  getOr({}, 'user.profile'),
  pick(['username', 'img', 'age'])
);

const User = props => {
  const {username, age, img} = getUserProps(props);
  return (
    <div className="User">{username}</div>
  );
};

module.exports = User;
```

This is a pattern I find myself using often in React, grabbing the data you need
from some props. The use of `getOr` here allows us to set a default value if
`user.profile` is undefined.

### Turning an object into query string parameters

```js
const map = require('lodash/fp/map').convert({'cap': false});
const join = require('lodash/fp/join');
const flow = require('lodash/fp/flow');

const toQueryString = flow(
  map((value, key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }),
  join('&')
);

toQueryString({foo: 'bar', baz: 'moo'}) // foo=bar&baz=moo
```

One thing that may cause some confusion when coming to `lodash-fp` from regular
`lodash` is how the arguments are capped for certain functions. That means that
whilst you may be used to accessing the `value` and `key` in `map` it will only
provide you with `value` by default in `lodash-fp`.

In the above code I'm using `.convert` to change the behaviour and allowing
`toQueryString` to work as expected.

Read more about `convert` and capped arguments [in the
documentation](https://github.com/lodash/lodash/wiki/FP-Guide).

### Handling data from an API

The last example is a simplified version of some code from a real project. An
API returned a payload with a `meta` object about the response and the `body`
contained a stringified version of the main payload:

```js
const response = {
  data: {
    meta: {responseCode: '200', statusMessage: 'OK'},
    body: '{"html":{"head":"<head></head>","foot":"<footer></footer>"}}'
  }
};
```

The goal is to extract the HTML from the `body` if the response is successful,
otherwise log the error status code and message.

```js
const flow = require('lodash/fp/flow');
const get = require('lodash/fp/get');
const negate = require('lodash/fp/negate');
const toNumber = require('lodash/fp/toNumber');
const isEqual = require('lodash/fp/isEqual');
const logger = require('./logger');

// Reusable functions to reduce repetition of `foo.bar` or `foo.baz`
const getRoot = get('data');
const getMeta = flow(getRoot, get('meta'));

const getResponseCode = flow(getMeta, get('responseCode'), toNumber);
const getStatusMessage = flow(getMeta, get('statusMessage'));

// Using negate to check against any other value than `200`
const isApiFailure = flow(getResponseCode, negate(isEqual(200)));

// `JSON.parse` is also a unary function
const getHtml = flow(getRoot, get('body'), JSON.parse, get('html'));

function handleResponse(response) {
  if (isApiFailure(response)) {
    return logger(getResponseCode(response), getStatusMessage(response));
  }
  return {
    html: getHtml(response)
  };
}
```

The focus here is to prefer many small functions that do one thing. Code written
this way is simple to unit test, and in this example we pass a lot of the work
to lodash and gain extra confidence knowing that it is already well tested and
performant.

## Wrapping up

Hopefully this has shed some light on how you can start implementing functional
programming into your own projects. This post by no means covers everything, so
I've compiled a list of excellent resources from very smart people to help you
go further on your functional journey.

## Resources

* [Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/)
* [Why The Hipsters Compose Everything](https://medium.com/javascript-inside/why-the-hipsters-compose-everything-9b0aa247944a#.uh0f4j2su)
* [Pure functions in JavaScript](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)
* [Closures](https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.hlrvnchh7)
* [Learning Functional Programming with JavaScript](https://www.youtube.com/watch?v=e-5obm1G_FY) (video)
* [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA) (video)
* [JavaScript Allonge](https://leanpub.com/javascriptallongesix)
* [Lodash FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide)
