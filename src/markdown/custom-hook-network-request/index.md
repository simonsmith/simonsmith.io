---
title: Handling network requests in React with a custom Hook
date: 2021-02-15
path: "/handling-network-request-state-react-custom-hook"
draft: true
---

In this post we'll be looking at how simple
[Hooks](https://reactjs.org/docs/hooks-intro.html) can make it to manage the
life cycle of a network request in our components. When I say life cycle I'm
referring to the common pattern of presenting a loading indicator to a user and
then updating the user interface upon success or failure.

Even if you use a state management library like Redux (as I do) then I've still
found it to be increasingly useful to manage the requests with Hooks, and I'll
touch upon some of the pros and cons later.

## Keeping track of the request state

Starting with the actual state of the request, we can opt for a string that
matches the naming scheme of [Promise
object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
statuses:

```js
const requestStatus = 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';
```

And actually, I find this a bit nicer to manage as an object rather than four
separate constants (mostly so I can [leverage them in TypeScript](https://maxheiber.medium.com/alternatives-to-typescript-enums-50e4c16600b1)):

```js
const requestStatus = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  FULFILLED: 'FULFILLED',
};
```

With that decided we can now set the value based on the state of a fetch request
from our component.

In this example below I'm using the excellent [`wretch` library](https://github.com/elbywan/wretch)

```jsx
import {useEffect, useState} from 'react';
import wretch from 'wretch';

const MyComponent = () => {
  // Initial state is 'IDLE', as we may not always trigger the request
  // immediately on component render. It could happen in an event for example
  const [requestStatus, setRequestStatus] = useState(requestStatus.IDLE);

  // Let's make this request on initial render though...
  useEffect(() => {
    setRequestStatus(requestStatus.PENDING);

    wretch('some/endpoint')
      .then(() => setRequestStatus(requestStatus.FULFILLED))
      .catch(() => setRequestStatus(requestStatus.REJECTED));
  }, []);

  // And handle our states visually

  if (requestStatus === requestStatus.PENDING) {
    return <Loading />;
  }

  if (requestStatus === requestStatus.REJECTED) {
    return <Error />;
  }

  return <p>The content of my component</p>;
};
```

## Extracting the logic into a custom Hook

Our above example works quite nicely and it's also a great candidate for a
custom Hook that other components can make use of. Let's create that now:

```js
import {useState} from 'react';

export const requestStatus = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  FULFILLED: 'FULFILLED',
};

export const useRequestStatus = () => {
  const [status, setRequestStatus] = useState(requestStatus.IDLE);

  return {
    setStatusIdle: () => setRequestStatus(requestStatus.IDLE),
    setStatusPending: () => setRequestStatus(requestStatus.PENDING),
    setStatusFulfilled: () => setRequestStatus(requestStatus.FULFILLED),
    setStatusRejected: () => setRequestStatus(requestStatus.REJECTED),
    isStatusIdle: status === requestStatus.IDLE,
    isStatusPending: status === requestStatus.PENDING,
    isStatusFulfilled: status === requestStatus.FULFILLED,
    isStatusRejected: status === requestStatus.REJECTED,
  };
};
```

### Why move this into a Hook?

Most obviously the logic can now be shared with other components that also
want to handle network requests but a bigger win is that components no longer
need to know about how the state is managed.

Instead we expose simple setter functions that don't require any arguments and
booleans for each possible state of the request, only one of which can be true
at any point during a component render.

I recommend applying this rule of abstraction to any custom Hooks where
possible, and really leverage the freedom to return whatever you wish back to
the component.

## Using the custom `useRequestStatus` Hook

Let's add it to our `MyComponent` example:

```jsx{3,5-12,15,18-19,22,26}
import {useEffect, useState} from 'react';
import wretch from 'wretch';
import {useRequestStatus} from './useRequestStatus';

const MyComponent = () => {
  const {
    setStatusPending,
    setStatusRejected,
    setStatusFulfilled,
    isStatusPending,
    isStatusRejected,
  } = useRequestStatus();

  useEffect(() => {
    setStatusPending();

    wretch('some/endpoint')
      .then(() => setStatusFulfilled())
      .catch(() => setStatusRejected());
  }, []);

  if (isStatusPending) {
    return <Loading />;
  }

  if (isStatusRejected) {
    return <Error />;
  }

  return <p>The content of my component</p>;
};
```

The well named values from `useRequestStatus` make this logic even easier to
read and understand. A nice refactor.

