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

### Reusing the `shallowRenderer`

Once you start using shallow rendering there will be a need to create rendered versions of components in each test, so it makes sense to move the logic into a reusable module. I've found a `createComponent` function works nicely, but you're free to name this whatever you wish.

``` js
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

export default createComponent;

function createComponent(component, props, ...children) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
  return shallowRenderer.getRenderOutput();
}
```

Also on GitHub [as a gist](https://gist.github.com/simonsmith/b478d6166acd57829d15).

Now it can be used in your unit tests the same way as `React.createElement`.

``` js
import createComponent from '../util/create-component';

component = createComponent(MyComponent, { className: 'MyComponent' }, 'some child text');
```

## Example: Testing a `Post` component

Now that the basics have been explained let's work through a simple example of testing a fictional `Post` component. It will accept a title and content and ensure any paragraph tags on the content are stripped away:

``` js
import React from 'react';

const { div, h2, p } = React.DOM;

export default React.createClass({
  displayName: 'Post',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string
  },

  stripParagraphTags(html) {
    return html.replace(/<\/?p>/g, '');
  },

  render() {
    const content = this.stripParagraphTags(this.props.content);

    return  div({ className: 'Post'},
              h2({ className: 'Post-header' }, this.props.title),
              p({ className: 'Post-content'}, content)
            );
  }
});
```

### The `Post` component spec

I've chosen to use [Chai](http://chaijs.com/) and [Mocha](http://mochajs.org/) for my unit tests, but you're free to use Jest, Jasmine or any other test runner and assertion library.

First we'll set up some boilerplate before we start writing actual tests

``` js
import { expect } from 'chai';

import Post from '../../components/post.react';
import createComponent from '../util/create-component';

describe('Post component', function() {
  let post;

  beforeEach(function() {
    post = createComponent(Post, { title: 'Title', content: '<p>Content</p>'});
  });
});
```

This is all that is needed. Wonderfully simple.

When we looked at the structure of the object returned from the shallow renderer you may have noticed the `children` property. This will contain any text, DOM elements or other React components that might make up the component being tested.

In this example the `children` property is an array that contains our title and content, so we can simply check that our props are being rendered as expected.

``` js
it('should render a post title and content', function() {
  const postTitle = post.props.children[0];
  const postContent = post.props.children[1];

  expect(postTitle.props.children).to.equal('Title');
  expect(postContent.props.children).to.equal('Content');
});
```

To verify this we can run Mocha with [Babel](https://babeljs.io/) to take care of the ES6 compilation.

``` bash
mocha test/components --compilers js:babel/register

  Post component
    ✓ should render a post title and content


  1 passing (12ms)
```

Great, our first test is passing.

### Testing component methods

It's not uncommon to have a few methods attached to the React component and to need to test them. An example might be a method that performs some complex transforms on data sent in via the props.

If you stick to stateless methods on your React components (a good pattern to [adhere to regardless](https://medium.com/javascript-scene/baby-s-first-reaction-2103348eccdd#13b0)) then it's an absolute breeze to unit test them.

You can reference any method directly on the prototype of the component. Let's make sure the `stripParagraphTags` method is working correctly.

``` js
describe('stripParagraphTags method', function() {
  it('should strip <p> tags', function() {
    const strippedText = Post.prototype.stripParagraphTags('<p>Some text.</p> <p>More text.</p>');

    expect(strippedText).to.equal('Some text. More text.');
  });
});
```

``` bash
  Post component
    ✓ should render a post title and content
    stripParagraphTags method
      ✓ should strip <p> tags


  2 passing (29ms)
```

Great.

## Rendering a list of Posts

Now that the `Post` component is rendering and passing the unit tests we recieve a requirement to render a list of them from a set of data and ensure that it works as expected.

To do this we'll reach for another React component called `PostList` and it will just be responsible for taking a set of data and rendering a `Post` for each item of data.

> Keeping components separated like this is can allow reuse in different contexts and ensure components do one job well. Composition is encouraged and is one of Reacts' strengths.

### The `PostList` component

Nothing too fancy here, just creating a new `Post` component for each item in the `posts` data set that is passed in as a prop.

``` js
import React from 'react';
import Post from './post.react';

const { ul, li } = React.DOM;

export default React.createClass({
  displayName: 'PostList',

  renderListItems(posts) {
    return posts.map((post) => {
            return li({ key: post.id, className: 'PostList-item' },
              React.createElement(Post, { title: post.title, content: post.content })
            );
          });
  },

  render() {
    return ul({ className: 'PostList'}, this.renderListItems(this.props.posts));
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

import PostList from '../../components/post-list.react';
import createComponent from '../util/create-component';

describe('PostList component', function() {
  const postData = [
    { id: 1, title: 'Title 1', content: '<p>Content 1</p>' },
    { id: 2, title: 'Title 2', content: '<p>Content 2</p>' },
    { id: 3, title: 'Title 3', content: '<p>Content 3</p>' }
  ];

  it('should render a list of post components', function() {
    const postList = createComponent(PostList, { posts: postData });
    const items = postList.props.children.filter(postListItem => postListItem.props.children.type.displayName === 'Post');

    expect(items.length).to.equal(postData.length);
  });
});
```

The line of interest here is where we check the child elements of `PostList`:

``` js
const items = postList.props.children.filter(postListItem => postListItem.props.children.type.displayName === 'Post');
```

First we filter through the children of `PostList` (which are the `<li>` elements) and then within each of those we can check the child has a `displayName` of `Post`. If it is then the component is returned. Now the length of the `items` array should match the total items in the `postData` array.

``` bash
  PostList component
    ✓ should render a list of post components

  Post component
    ✓ should render a post title and content
    stripParagraphTags method
      ✓ should strip <p> tags


  3 passing (16ms)
```

And it does! Perfect.

## Testing the actual rendering

Areas of testing that this doesn't cover would be interactions with components (form fields, buttons etc) and visual rendering. I find this sort of acceptance testing is best left to tools like [Browserstack](https://www.browserstack.com) or [Sauce Labs](https://saucelabs.com) as they can test multiple devices and operating systems and will paint a more accurate picture of how your application behaves.

I've found unit testing with shallow rendering is best used to ensure the application data is passing through your components as intended but you can make them as granular as you like.

## Conclusion and example code

We've now written and unit tested two separate React components without even needing a DOM or web browser. Although it's still an experimental feature I would recommend trying it out and seeing how it fits in with your code base.

You can grab all the example code in [this repository on GitHub](https://github.com/simonsmith/react-component-unit-test) and find more information on [the React documentation page](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering).
