---
title: Handling props and class names in React
date: 2016-02-02
path: "/handling-props-and-class-names-in-react"
---

If you spend any time writing React then you'll find a common task
is managing components and their props. This post will detail a pattern that
I've found works quite well.

## A Profile

Let's imagine a `Profile` component that would be responsible for displaying a
username:

``` js
import React from 'react';

const {div} = React.DOM;

const Profile = props => div({className: 'Profile Profile--large'}, props.username);

export default Profile;
```

> If this looks unfamiliar then take a moment to read up on [stateless functional
components](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components).

Currently it just accepts one prop (which is the username) and renders it in a `div`
with some default classes. Here's how you might construct it:

``` js
React.createElement(Profile, {
  username: 'simonsmith'
});
```

And the output:

``` html
<div class="Profile Profile--large">simonsmith</div>
```

Nothing groundbreaking at the moment.

## Adding more props

Now we'll throw in a couple of extra props, one to distinguish this user as an
admin, and also some additional classes for styling:

``` js
React.createElement(Profile, {
  username: 'simonsmith',
  isAdmin: true,
  className: 'u-flexGrow1'
});
```

We're mixing presentation and logic related props together here, but that's
fine. In theory we should be able to throw any additional component props in the
mix such as `onClick` or `aria-hidden` and expect it work. The `Profile` component can extract
the props it cares about and send the rest along to the rendered HTML.

I've found that extracting the 'logic' props at the top of the `render`
method makes it clear what the component relies on:

``` js
const {isAdmin, className, username} = props;
```

The second thing to do is create an object that contains the remaining props.
The [`omit` function](https://lodash.com/docs#omit) from lodash is perfect
for this:

``` js
const elemProps = omit(
  props,
  'username',
  'className',
  'isAdmin'
);
```

This creates a new object with any remaining props that may have been passed in,
and now they can be passed directly to the `div` root element.

If you're using [Babel](http://babeljs.io) and the [object rest spread transform](http://babeljs.io/docs/plugins/transform-object-rest-spread/)
plugin then you can use an even shorter pattern:

``` js
const {isAdmin, className, username, ...elemProps} = props;
```

This 'spreads' out the remaining properties and their values into a new object
called `elemProps`.

``` js
const Profile = props => {
  const {
    isAdmin,
    className,
    useDefaultClassName,
    username,
    ...elemProps
  } = props;

  return (
    div(elemProps, username)
  );
};
```

> It's worth noting that React won't allow just any old attribute to come through
to the rendered HTML. It maintains [a whitelist](https://github.com/facebook/react/blob/2981bef075b9c2595a2216ce87f20c6b5923e22b/src/renderers/dom/shared/HTMLDOMPropertyConfig.js)
of all the attributes that can be used so in theory you could rely on this and
skip the `omit`/`spread` step. However, I favour being explicit for readability and there
are no guarantees this behaviour won't change. Additionally this approach
is mentioned in [the React documentation](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-underscore).

> Read more on that topic in [this GitHub issue](https://github.com/facebook/react/issues/1730).

## Managing class names

To recap, the `Profile` component already has two default class names (`Profile`
and `Profile--large`) and we need to add `is-admin` if the `isAdmin` prop is `true`
as well as any additional class names.

The aptly named [classNames](https://github.com/JedWatson/classnames) library is
the ideal tool for the job. It allows a mixture of input types
and allows you to forget about manual string concatenation:

``` js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
```

Now we can create a new object containing our custom `className` prop and then
merge it into `elemProps` before they're applied to the `div` element. Once again
lodash can help with this via [`assign`](https://lodash.com/docs#assign).

``` js
assign(elemProps, {
  className: classNames('Profile Profile--large', {
    'is-admin': isAdmin
  }, className)
});
```

``` html
<div class="Profile Profile--large is-admin u-flexGrow1">simonsmith</div>
```

This may look somewhat heavy handed for just a few of classes but it really
comes into its own when we add more conditions.

### Disabling the default class names

When I started using this pattern it wasn't long before I ended up in a
situation where I needed to disable the default class names and customise the
component more than usual. By allowing the default classes to depend on a prop
we can disable them from outside the component.

First we need a default prop:

``` js
Profile.defaultProps = {
  useDefaultClassName: true
};
```

And then adjust the `classNames` function call:

``` js
assign(elemProps, {
  className: classNames({
    'Profile': useDefaultClassName,
    'Profile--large': useDefaultClassName,
    'is-admin': isAdmin
  }, className)
});
```

Now the user of the component can easily disable the default class names and use
their own:

``` js
React.createElement(Profile, {
  isAdmin: true,
  username: 'simonsmith',
  useDefaultClassName: false,
  className: 'user_profile user_profile__large'
});
```

``` html
<div class="user_profile user_profile__large is-admin">simonsmith</div>
```

## The final product

After a few refactors the `Profile` component looks ready to go:

``` js
import React, {PropTypes} from 'react';
import omit from 'lodash.omit';
import assign from 'lodash.assign';
import classNames from 'classnames';

const {div} = React.DOM;

const Profile = props => {
  const {
    isAdmin,
    className,
    useDefaultClassName,
    username,
    ...elemProps
  } = props;

  assign(elemProps, {
    className: classNames({
      'Profile': useDefaultClassName,
      'Profile--large': useDefaultClassName,
      'is-admin': isAdmin
    }, className)
  });

  return (
    div(elemProps, username)
  );
};

Profile.defaultProps = {
  useDefaultClassName: true
};

Profile.propTypes = {
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
  username: PropTypes.string,
  useDefaultClassName: PropTypes.bool
};

export default Profile;
```

One addition above is the use of `propTypes`. I tend to put props here that the
component will act on, or logic props as mentioned earlier. This helps further
with debugging and maintenance.

## What about testing?

In an [earlier post](http://simonsmith.io/unit-testing-react-components-without-a-dom/)
I recommended use of the excellent [skin-deep](https://github.com/glenjamin/skin-deep/) library to
aid with unit testing. With that in mind we can easily test that the correct
props are used in the `Profile` component:

``` js
import {expect} from 'chai';
import React from 'react';
import Profile from '../../components/profile';
import sd from 'skin-deep';

describe('Profile component', () => {
  it('should have the correct props', () => {
    const tree = sd.shallowRender(React.createElement(Profile, {
      isAdmin: true,
      username: 'simonsmith',
      className: 'u-flexGrow1'
    }));

    expect(tree.props).to.contain({
      children: 'simonsmith',
      className: 'Profile Profile--large is-admin u-flexGrow1'
    });
  });

  it('should allow default class names to be disabled', () => {
    const tree = sd.shallowRender(React.createElement(Profile, {
      isAdmin: true,
      useDefaultClassName: false,
      username: 'simonsmith',
      className: 'user-profile'
    }));

    expect(tree.props).to.contain({
      children: 'simonsmith',
      className: 'is-admin user-profile'
    });
  });
});
```

``` bash
Profile component
    ✓ should have the correct props
    ✓ should allow default class names to be disabled
```

And it passes as expected!

You can grab the example code for this post [on GitHub](https://github.com/simonsmith/react-props-and-classnames)

## Additional reading

* [Transferring props](https://facebook.github.io/react/docs/transferring-props.html)
* [Unit testing React components without a DOM](http://simonsmith.io/unit-testing-react-components-without-a-dom/)
