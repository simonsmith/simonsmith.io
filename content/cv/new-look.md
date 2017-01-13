---
contract: true
from: August 2016
to: February 2017
id: newlook
role: Senior JavaScript Developer
siteurl: newlook.co.uk
title: New Look
weight: 0
---

Developed a new iOS app with [React Native](http://facebook.github.io/react-native/).

Used [Redux](http://redux.js.org/) and `redux-thunk` to fetch data from multiple
API endpoints. UI and data state were stored in the state tree separately. By
doing so this improved error logging as the current state of the app could be
reproduced.

Made use of [React Redux](https://github.com/reactjs/react-redux) and container
components to pass data down the component tree. Keeping them separated this
way greatly assisted unit testing.

Unit tested React components and Redux reducers with
[Jest](https://facebook.github.io/jest/)'s snapshot feature.

Added type checking with [Flow](https://flowtype.org/).
