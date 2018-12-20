---
title: Reducing repetition when constructing React props
date: 2016-12-20
draft: true
---

This is a short post on how leveraging object spread in JSX and destructuring
can ease constructing props for a component.

## Passing props along to a child component

One scenario I come across frequently is needing to pass some props down to a
child component. There are plenty of reasons why this might happen (it happens
often in container components) and it can lead to quite verbose code:

Let's assume that a `MyParent` component exists and takes the following props:

```js
<MyParent
  name="Simon"
  sendMessageToConsole={() => {console.log('clicked!')}}
  imageSrc="http://image.com/file.jpg"
/>
```

In our simplified example it needs to send these props to a `MyChild` component:

```js
class MyParent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MyChild
        name={this.props.name}
        onClick={this.props.sendMessageToConsole}
        profileImage={this.props.imageSrc}
      />
    )
  }
}
```

Whilst there is nothing strictly wrong with this code, it is verbose
and a pain to refactor.

## Extracting props with destructuring

The first step is removing the need to refer to `this.props` more than once:

```js
render() {
  const {
    name,
    sendMessageToConsole,
    imageSrc,
  } = this.props;

  return (
    <MyChild
      name={name}
      onClick={sendMessageToConsole}
      profileImage={imageSrc}
    />
  )
}
```

This is a good start and probably a technique most developers are familiar with.

## Using object spread to pass props to a component

JSX enables use of the `spread` operator on a props object. From [the React
documentation](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes):

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

Without JSX this translates to:

```js
const props = {firstName: 'Ben', lastName: 'Hector'};
return React.createElement(Greeting, props);
```

If we go back to our last example we can construct the props object and 'spread'
into the `MyChild` component:

```js
render() {
  const {
    name,
    sendMessageToConsole,
    imageSrc,
  } = this.props;

  const myChildProps = {
    name: name,
    onClick: sendMessageToConsole,
    profileImage: imageSrc,
  };

  return <MyChild {...myChildProps} />;
}
```

## Object shorthand properties and destructuring with different variable names

It doesn't seem to yield much advantage at the moment, but by making use of
object shorthand properties and the ability to assign destructured properties to
different variable names we can make this even terser.

When using destructuring we can rename the variable as part of the assignment:

```js
const {name} = this.props;
// Equal to
const name = this.props.name;
```
```js
const {name:firstName} = this.props;
// Equal to
const firstName = this.props.name;
```

And finally in our component:

```js
render() {
  const {
    name,
    sendMessageToConsole:onClick,
    imageSrc:profileImage,
  } = this.props;

  const myChildProps = {
    name,
    onClick,
    profileImage,
  };

  return <MyChild {...myChildProps} />;
}
```

### Avoid nested data structures

When using destructuring this way I tend to avoid any data structures that
are heavily nested as it can be difficult to read:

```js
const {
  user:{address,profile:{name:firstName,age}}
} = this.props;
```

This is also extremely brittle. Should one of the nested properties be `undefined`
or the React component rendered without props it will throw an error.

In this case I'd recommend using default props or [lodash get](https://lodash.com/docs/4.17.2#get)
with a fallback value:

```js
const firstName = get(this.props, `user.profile.name`, ``);
```
