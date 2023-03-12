# Voby Simple Router

A simple isomorphic router for [Voby](https://github.com/vobyjs/voby).

Heavily inspired by [solid-router](https://github.com/solidjs/solid-router). For a more direct port of that check out [voby-router](https://github.com/vobyjs/voby-router).

## Install

```sh
npm install --save voby-simple-router
```

## APIs

| [Components](#components) | [Hooks](#hooks)                       | [Types](#types)                               |
| ------------------------- | ------------------------------------- | --------------------------------------------- |
| [`Router`](#router)       | [`useHash`](#usehash)                 | [`RouterLoader`](#routerloader)               |
| [`Route`](#route)         | [`useLoader`](#useloader)             | [`RouterLoaderContext`](#routerloadercontext) |
| [`Link`](#link)           | [`useLocation`](#uselocation)         | [`RouterParams`](#routerparams)               |
| [`Navigate`](#navigate)   | [`useNavigate`](#usenavigate)         | [`RouterPath`](#routerpath)                   |
|                           | [`useParams`](#useparams)             | [`RouterRoute`](#routerroute)                 |
|                           | [`useRoute`](#useroute)               | [`RouterRouter`](#routerrouter)               |
|                           | [`useRouter`](#userouter)             |                                               |
|                           | [`useSearchParams`](#usesearchparams) |                                               |

## Usage

The following functions are provided, divided between components and hooks.

### Components

The following components are some building blocks for your router-aware interface.

#### `Router`

The `Router` is the most important component, every other component and hook much be called inside a `Router` component to work.

```tsx
import Layout from './pages/_layout';
import Home from './pages/home';
import NotFound from './pages/not_found';
import UserAdmin from './pages/user_admin';
import UserProfile from './pages/user_profile';
import someLoader from './loaders/some';
import {lazy} from 'voby';
import {Navigate, Router} from 'voby-simple-router';

// First of all let's define some routes
// The router is based on Noren (https://github.com/fabiospampinato/noren)

const Routes = {
  { // A regular route, mapping a path to a component
    path: '/',
    to: Home
  },
  { // A redirection route, using the <Navigate> component
    path: '/redirect',
    to: <Navigate to="/" />
  },
  { // A route with children routes
    path: '/user',
    to: UserAdmin
    children: [
      { // A child route with a parameter
        path: ':username',
        to: UserProfile
      }
    ]
  },
  { // A route can also be lazy, for bundle-splitting purposes
    path: '/some',
    to: lazy ( () => import ( './pages/some' ) ),
    // A loader can be specified for each route, which returns some data
    // A loader allows for loading in parallel both the route and its data
    // The data will be accessible using the "useLoader" hook
    // Router hooks can't be called inside a loader, so a context object with some data is provided
    loader: ({ params }) => {
      return someLoader ();
    }
  },
  { // A route with a special path, which is matched when no other route matches
    path: '/404',
    to: NotFound
  }
};

// Then let's instantiate our router
// The path to render is not provided, so it's inferred, this is useful when running in the client

const app = (
  <Router routes={Routes}>
    <Layout />
  </Router>
);

// Now let's instantiate a router with a specific path
// The path is provided explicitly, this is mostly useful when doing SSR

const app = (
  <Router routes={Routes} path="/user/John">
    <Layout />
  </Router>
);

// Explicitly use the "path" backend, which is the default

const app = (
  <Router routes={Routes} backend="path" path="/user/John">
    <Layout />
  </Router>
);

// Explicitly use the "hash" backend, which stores the path in the hash part of the URL

const app = (
  <Router routes={Routes} backend="hash" path="/user/John">
    <Layout />
  </Router>
);

// Explicitly use the "memory" backend, which only stores the path in memory

const app = (
  <Router routes={Routes} backend="memory" path="/user/John">
    <Layout />
  </Router>
);
```

#### `Route`

This crucial component renders the actual route that the router selected. If you don't use it your route won'tbe rendered.

```tsx
import {Route} from 'voby-simple-router';

// Left's render our route in the middle of some arbitrary components

const app = (
  <Router routes={Routes}>
    <Header />
    <Body>
      <Route />
    </Body>
    <Footer />
  </Router>
);
```

#### `Link`

This component provides an instant client-side navigation, without making a network request. It's basically an anchor tag that knows about the router.

```tsx
import {Link} from 'voby-simple-router';

// Let's create a basic navbar

const Navbar = () => (
  <ul>
    <Link to="/">Homepage</Link>
    <Link to="/user">User</Link>
    <Link to="/about">About</Link>
  </ul>
);
```

#### `Navigate`

This component is like a `Link` that clicks itself right when it's rendered. It's useful for redirecting routes.

```ts
import {Navigate} from 'voby-simple-router';

// Let's redirect one route to another

const Routes = {
  {
    path: '/redirect',
    to: <Navigate to="/" />
  }
};
```

### Hooks

The following hooks allow you to extract some information from the router.

#### `useHash`

This hook tells you the value of the current hash fragment.

```tsx
import {useHash} from 'voby-simple-router';

// Let's get the current hash fragment

const App = () => {
  const hash = useHash ();
  return <p>Hash: {hash}</p>;
};
```

#### `useLoader`

This hook gives you a [`resource`](https://github.com/vobyjs/voby/#resource) to the resolved return value of the loader for the current route.

This hook is not type-safe, you should provide a type for the value as a generic type argument, but it won't be guaranteed to be correct.

```tsx
import someLoader, {SomeValue} from './loaders/some';
import {lazy, Suspense} from 'voby';
import {useLoader} from 'voby-simple-router';

const Routes = [
  {
    path: '/some',
    to: lazy ( () => import ( './pages/some' ) ),
    loader: someLoader
  }
];

// Let's get the data from the loader

const App = () => {
  const loader = useLoader<SomeValue> ();
  const value = () => loader ().value;
  return (
    <Suspense fallback={<div>Still loading...</div>}>
      <p>Value: {value}</p>
    </Suspsense>
  );
};
```

#### `useLocation`

This hook tells you the pathname the router is currently at.

```tsx
import {useLocation} from 'voby-simple-router';

// Let's get the current location of the router

const App = () => {
  const location = useLocation ();
  return <p>Location: {location}</p>;
};
```

#### `useNavigate`

This hook allows you to change the pathname the router is at, programmatically.

```tsx
import {useNavigate} from 'voby-simple-router';

// Let's build a custom <Link> component

const A = ({ href, children }) => {
  const navigate = useNavigate ();
  const onClick = event => {
    event.preventDefault ();
    console.log ( `Navigating to: "${href}"` );
    navigate ( href );
  };
  return <a href={href} onClick={onClick}>{children}</a>;
};
```

#### `useParams`

This hooks allows you to retrieve parameters defined in the currently matched path, e.g. `/user/:username`.

```tsx
import {useParams} from 'voby-simple-router';

// Let's log a parameter

const App = () => {
  const params = useParams ();
  const username = () => params ().username;
  return <p>Current username: {username}</p>;
};
```

#### `useRoute`

This hooks gives you the currently matched route object, it's relatively low level, but powerful, because you can attach arbitrary data to a route and retriving it this way.

```tsx
import {useRoute} from 'voby-simple-router';

// Let's log a parameter

const App = () => {
  const route = useRoute ();
  const someData = () => route ().someData;
  return <p>Some custom data: {someData}</p>;
};
```

#### `useSearchParams`

This hook allows you to read and write search parameters, which are those encoded in the URL after `?`.

Currently the `URLSearchParams` you receive won't react to changes in search parameters unless the entire location changes.

```tsx
import {useSearchParams} from 'voby-simple-router';

// Let's manipulate search parameters

const App = () => {
  const searchParams = useSearchParams ();
  const value = () => Number ( searchParams ().get ( 'value' ) ) || 0;
  const increment = () => searchparams ().set ( 'value', value () + 1 );
  return <p onClick={increment}>Current value: {value}</p>;
};
```

#### `useRouter`

This low-level hook gives you the raw router, given a list of routes. You might never have to use this directly.

```tsx
import {useRouter} from 'voby-simple-router';

const Routes = {
  {
    path: '/',
    to: Home
  }
  // ...
};

// Creating the low-level router

const router = useRouter ( Routes );

// Trying to find a route given a path

router.route ( '/' ); // => { params: {}, route: { path: '/', to: Home } }
router.route ( '/missing' ); // => undefined
```

### Types

The following types are provided.

#### `RouterLoader`

The type of a route's loader. The loader is called with a context object, since you can't call router hooks inside it.

```ts
type RouterLoader<T> = ( ctx: RouterLoaderContext ) => Promise<T>;
```

#### `RouterLoaderContext`

The context object passed as argument to each loader.

```ts
type RouterLoaderContext = {
  location: RouterPath,
  hash: string,
  params: RouterParams,
  searchParams: URLSearchParams,
  route: RouterRoute,
};
```

#### `RouterParams`

The type of the value that the read-only observable that `useParams` gives you contains.

```ts
type RouterParams = Record<string, string | undefined>;
```

#### `RouterPath`

The type for the allowed location. Basically it must always start with a `/`, for consistency.

```ts
type RouterPath = `/${string}`;
```

#### `RouterRoute`

The type of a route that you can pass to the router.

```ts
type RouterRoute = {
  path: string,
  to: JSX.Child,
  loader?: RouterLoader<unknown>,
  children?: RouterRoute[]
};
```

#### `RouterRouter`

The type of the low-level router, the one you get with `useRouter`.

```ts
type RouterRouter = {
  route ( path: string ): { params: RouterParams, route: RouterRoute } | undefined
};
```

## License

MIT © Fabio Spampinato
