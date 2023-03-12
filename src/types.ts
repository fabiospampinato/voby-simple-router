
/* IMPORT */

import type {FunctionMaybe, Observable, ObservableReadonly, Resource} from 'voby';

/* HELPERS */

type F<T> = FunctionMaybe<T>;

type O<T> = Observable<T>;

type OR<T> = ObservableReadonly<T>;

/* MAIN */

type RouterBackend = 'hash' | 'memory' | 'path';

type RouterLoader<T> = ( ctx: RouterLoaderContext ) => Promise<T>;

type RouterLoaderContext = {
  pathname: RouterPath,
  search: string,
  hash: string,
  params: RouterParams,
  searchParams: URLSearchParams,
  route: RouterRoute
};

type RouterLocation = {
  pathname: OR<RouterPath>,
  search: OR<string>,
  hash: OR<string>
};

type RouterNavigate = ( path: RouterPath, options?: RouterNavigateOptions ) => void;

type RouterNavigateOptions = {
  replace?: boolean,
  state?: any
};

type RouterParams = Record<string, string | undefined>;

type RouterPath = `/${string}`;

type RouterRoute = {
  path: string,
  to: JSX.Child,
  loader?: RouterLoader<unknown>,
  children?: RouterRoute[]
};

type RouterRouter = {
  route ( path: string ): { params: RouterParams, route: RouterRoute } | undefined
};

type RouterState = {
  pathname: OR<RouterPath>,
  search: OR<string>,
  hash: OR<string>,
  navigate: RouterNavigate,
  params: OR<RouterParams>,
  searchParams: OR<URLSearchParams>,
  route: OR<RouterRoute>,
  loader: OR<Resource<any>>
};

/* EXPORT */

export type {F, O, OR, Resource};
export type {RouterBackend, RouterLoader, RouterLoaderContext, RouterLocation, RouterNavigate, RouterNavigateOptions, RouterParams, RouterPath, RouterRoute, RouterRouter, RouterState};
