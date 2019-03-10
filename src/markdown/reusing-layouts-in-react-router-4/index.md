---
date: 2017-02-27
title: Reusing layouts in React Router 4
path: "/reusing-layouts-in-react-router-4"
draft: false
---

In a [React Router](https://reacttraining.com/react-router) application it's
very common to want to render a default set of components on every route, such
as a header and footer:

```jsx
<div className="App">
  <div className="Header">
    Page Header
  </div>
  <div className="Content">
    {content that changes}
  </div>
  <div className="Footer">
    Page Footer
  </div>
</div>
```

In the latest version of React Router it is very easy to achieve this, as well
as creating child layouts for specific use cases.

## Creating a default layout

The default layout is where components used on every page of our app will exist.
React router offers a `render` prop which will be called when the route matches:

```jsx
// The usual way to render a pre-defined component
<Route path="/" component={SomeComponent} />

// Using the render prop allows a more manual setup
<Route path="/" render={matchProps => <SomeComponent {...matchProps} />} />
```

This is useful because we can wrap a component around the `<Route />` and
control where _our_ component is rendered whilst allowing all the usual props to
be `Route` get passed through:

```jsx
const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <div className="Header">Header</div>
          <Component {...matchProps} />
        <div className="Footer">Footer</div>
      </div>
    )} />
  )
};
```
```js
<DefaultLayout path="/" component={SomeComponent} />
```

The `rest` parameter will contain every prop passed to `DefaultLayout` except
for `component` so it allows us to 'forward' them on to the underlying `Route`
component as usual.

By supplying a `render` prop to the `Route` we can control where the `component`
prop is rendered. In this case we wrap it in some HTML that contains a header
and footer but this could just easily be a group of other components. The
`matchProps` are what usually get passed to a component rendered by `Route`.

It's important to rename the `component` prop to `Component` with de-structuring
as it effects how JSX transforms our code:

```jsx
<component />
// becomes
React.createElement("component", null); // Not what we wanted

<Component />
// becomes
React.createElement(Component, null); // Now it knows we meant a React component
```

Read [the
documentation](https://facebook.github.io/react/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)
for more information.

## Extending the default layout

Whilst our default layout will contain components shared on every page there
might be times when we want to add certain components for one view, like a blog
post for example. A way to solve this is to build upon the `DefaultLayout` and
then add the shared components just for the new view:

```jsx
const PostLayout = ({component: Component, ...rest}) => {
  return (
    <DefaultLayout {...rest} component={matchProps => (
      <div className="Post">
        <div className="Post-content">
          <Component {...matchProps} />
        </div>
        <div className="Post-aside">
          <SomeSideBar />
        </div>
      </div>
    )} />
  );
};
```
```jsx
<PostLayout path="/posts/:post" component={PostComponent} />
```

The only difference is to pass a function to the `component` prop instead of the
`render` prop. Otherwise you're free to extend layouts as many times as needed.

## That's it

Short and sweet. The new version of React Router focuses on working with the
React component model and allows simple patterns like this to shine through.

Check out [this GitHub
issue](https://github.com/ReactTraining/react-router/issues/3928) to read
discussion around using different default layouts.
