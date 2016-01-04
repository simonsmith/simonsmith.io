---
title: Unit testing React components without a DOM
date: 2015-06-14
type: post
---

When unit testing React components the common approach has been to render them into a DOM (with [something like jsdom](https://github.com/jesstelford/react-testing-mocha-jsdom)) and run some assertions against them with the help of the [React TestUtils](https://facebook.github.io/react/docs/test-utils.html).

This has changed in 0.13 where an early implementation of [shallow rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) is now ready to use.

## Shallow rendering

Instead of rendering into a DOM the idea of shallow rendering is to instantiate a component and get the result of its `render` method, which is a [ReactElement](https://facebook.github.io/react/docs/glossary.html#react-elements). From here you can do things like check its props and children and verify it works as expected.

As you can imagine this is much faster (and less hassle) and will be [the recommended way](https://discuss.reactjs.org/t/whats-the-prefered-way-to-test-react-js-components/26/2) to test components in the future.

### How it works

All you need to do is create an instance of the shallow renderer, render your component and then grab the output.

``` js
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const shallowRenderer = TestUtils.createRenderer();
shallowRenderer.render(React.createElement(MyComponent, { className: 'MyComponent' }, 'some child text'));

const component = shallowRenderer.getRenderOutput();
```

This gives you an object that represents your component and looks roughly like the below (I've omitted some properties for the sake of brevity)

``` json
{
  "type": "div",
  "_store": {
    "props": {
      "className": "MyComponent",
      "children": [{
        "type": "h2",
        "_store": {
          "props": {
            "className": "MyComponent-header",
            "children": "Title"
          },
          "originalProps": {
            "className": "MyComponent-header",
            "children": "Title"
          }
        }
      }]
    }
  }
}
```

And now you can test against it

``` js
expect(component.props.className).to.equal('MyComponent');
```

### Reusing the `shallowRenderer` with `skin-deep`

Once you start using shallow rendering there will be a need to create rendered versions of components in each test,
so it makes sense to move the logic into a reusable module.

[skin-deep](https://github.com/glenjamin/skin-deep) is an excellent library to help with this.

``` js
import React from 'react';
import sd from 'skin-deep';

const tree = sd.shallowRender(React.createElement(MyComponent, {}));
const instance = tree.getMountedInstance();
const vdom = tree.getRenderOutput();
```

The `tree` object gives you access to various useful methods (check [the
documentation](https://github.com/glenjamin/skin-deep/blob/one-point-oh/README.md)
for more info) which allow you to dig down into the tree of components and run
assertions against things like text and props.

## Example: Testing a `Post` component

Now that the basics have been explained let's work through a simple example of testing a fictional `Post` component.
It will accept a title and content and ensure any paragraph tags on the content are stripped away:

``` js
import React from 'react';

const {div, h2, p} = React.DOM;

export default React.createClass({
  displayName: 'Post',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string
  },

  stripParagraphTags(html) {
    return html.replace(/<\/?p>/g, '');
  },

  doSomethingOnClick(event) {
    this.setState({isClicked: true});
    event.preventDefault();
  },

  render() {
    const content = this.stripParagraphTags(this.props.content);

    return (
      div({className: 'Post'},
        h2({className: 'Post-header', onClick: this.doSomethingOnClick}, this.props.title),
        p({className: 'Post-content'}, content)
      )
    );
  }
});
```

### The `Post` component spec

I've chosen to use [Chai](http://chaijs.com/) and [Mocha](http://mochajs.org/) for my unit tests, but you're free to use Jest, Jasmine or any other test runner and assertion library.

First we'll set up some boilerplate before we start writing actual tests

``` js
import { expect } from 'chai';
import React from 'react';
import Post from '../../components/post.react';
import sd from 'skin-deep';

describe('Post component', function() {
  let tree;

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(Post, {title: 'Title', content: '<p>Content</p>'}));
  });
});
```

This is all that is needed. Wonderfully simple.

Now we can make use of skin-deep to query the render tree and ensure parts of
our component have the text rendered as expected.

``` js
it('should render a post title and content', () => {
  expect(tree.subTree('.Post-header').text()).to.equal('Title');
  expect(tree.subTree('.Post-content').text()).to.equal('Content');
});
```

This works fine for simple components but it can feel quite brittle to traverse heavily nested objects and select array elements this way.

### Testing component methods

It's not uncommon to have a few methods attached to the React component and to need to test them. An example might be a method that performs some complex transforms on data sent in via the props.

If you stick to [pure functions](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/) on your React components then it's much easier to unit test them.

You can reference any method directly on the prototype of the component. Let's make sure the `stripParagraphTags` method is working correctly.

``` js
describe('stripParagraphTags method', () => {
  it('should strip <p> tags', () => {
    const strippedText = Post.prototype.stripParagraphTags('<p>Some text.</p> <p>More text.</p>');

    expect(strippedText).to.equal('Some text. More text.');
  });
});
```

If you cannot avoid a pure function and depend on things like `this.props`
then it is possible to access the actual component instance instead.

``` js
const instance = tree.getMountedInstance();
instance.stripParagraphTags('<p>Content</p>');
```

This will be correctly bound with the React component.

It might be advisable to treat this as an anti-pattern though as it's not as robust as
just testing a pure function. One way to avoid it is to pass the props required
into the function, rather than relying on `this`:

``` js
this.someComponentMethod(this.props.text);
```

A good use for `getMountedInstance` is to allow access to the component state,
which we will see an example of next.

### Testing event handlers

Event handlers can be tested in a similar way, but you will need to provide your
own mocked event object if things like `preventDefault` are used. Let's test our
`Post` click handler.

``` js
describe('doSomethingOnClick method', () => {
  it('should modify the `isClicked` state property', () => {
    const header = tree.subTree('.Post-header');

    header.props.onClick({
      preventDefault() {}
    });

    expect(tree.getMountedInstance().state).to.eql({isClicked: true});
  });
});
```

Here we are passing a very simple `event` mock that just has an empty function,
but this could also be a good candidate for [Sinon JS](http://sinonjs.org/) if more complex assertion was
needed.

#### Running the tests

To verify it all works we can run Mocha with [Babel](https://babeljs.io/) to take care of the ES6 compilation.

``` bash
  Post component
    ✓ should render a post title and content
    doSomethingOnClick method
      ✓ should modify the `isClicked` state property
    stripParagraphTags method
      ✓ should strip <p> tags


  3 passing (183ms)
```

Great, our first test is passing.

## Rendering a list of Posts

Now that the `Post` component is rendering and passing the unit tests we recieve a requirement to render a list of them from a set of data and ensure that it works as expected.

To do this we'll reach for another React component called `PostList` and it will just be responsible for taking a set of data and rendering a `Post` for each item of data.

> Keeping components separated like this is can allow reuse in different contexts and ensure components do one job well. Composition is encouraged and is one of Reacts' strengths.

### The `PostList` component

Nothing too fancy here, just creating a new `Post` component for each item in the `posts` data set that is passed in as a prop.

``` js
import React from 'react';
import Post from './post.react';

const {ul, li} = React.DOM;

export default React.createClass({
  displayName: 'PostList',

  renderListItems(posts) {
    return (
      posts.map(post =>
        li({key: post.id, className: 'PostList-item'},
          React.createElement(Post, {title: post.title, content: post.content})
        )
      )
    );
  },

  render() {
    return ul({className: 'PostList'}, this.renderListItems(this.props.posts));
  }
});
```

In terms of what to test here it seems sensible to just make sure the `PostList` has rendered a `Post` for each data item. With the above code we could expect an HTML output like this:

``` html
<ul class="PostList">
  <li class="PostList-item">
    <div class="Post"><!-- content --></div>
  </li>
  <!-- And repeat... -->
</ul>
```

With that in mind we will write a spec to ensure each `<li>` contains a `Post` component and that the total matches the total set of posts in the data source.

``` js
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import PostList from '../../components/post-list.react';
import Post from '../../components/post.react';
import sd from 'skin-deep';

describe('PostList component', () => {
  const postData = [
    { id: 1, title: 'Title 1', content: '<p>Content 1</p>' },
    { id: 2, title: 'Title 2', content: '<p>Content 2</p>' },
    { id: 3, title: 'Title 3', content: '<p>Content 3</p>' }
  ];

  it('should render a list of post components', () => {
    const tree = sd.shallowRender(React.createElement(PostList, {posts: postData}));
    const items = tree.everySubTree('Post');

    expect(items.length).to.equal(postData.length);
  });
});
```

Using `everySubTree` returns an array of all the `Post` components. Now the length of the `items` array
should match the total items in the `postData` array.

``` bash
  PostList component
    ✓ should render a list of post components

  Post component
    ✓ should render a post title and content
    doSomethingOnClick method
      ✓ should modify the `isClicked` state property
    stripParagraphTags method
      ✓ should strip <p> tags


  4 passing (183ms)
```

And it does! Perfect.

## Testing the actual rendering

Areas of testing that this doesn't cover would be interactions with components (form fields, buttons etc) and visual rendering. I find this sort of acceptance testing is best left to tools like [Browserstack](https://www.browserstack.com) or [Sauce Labs](https://saucelabs.com) as they can test multiple devices and operating systems and will paint a more accurate picture of how your application behaves.

I've found unit testing with shallow rendering is best used to ensure the application data is passing through your components as intended but you can make them as granular as you like.

## Conclusion and example code

We've now written and unit tested two separate React components without even needing a DOM or web browser. Although it's still an experimental feature I would recommend trying it out and seeing how it fits in with your code base.

You can grab all the example code in [this repository on GitHub](https://github.com/simonsmith/react-component-unit-test) and find more information on [the React documentation page](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering).
