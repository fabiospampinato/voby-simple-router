
/* IMPORT */

import type {FunctionMaybe, Observable, ObservableReadonly, Resource} from 'voby';

/* HELPERS */

type F<T> = FunctionMaybe<T>;

type O<T> = Observable<T>;

type OR<T> = ObservableReadonly<T>;

/* MAIN */

type RouterLoader<T> = ( ctx: RouterLoaderContext ) => Promise<T>;

type RouterLoaderContext = {
  location: RouterPath,
  hash: string,
  params: RouterParams,
  searchParams: URLSearchParams,
  route: RouterRoute
};

type RouterNavigate = ( path: RouterPath ) => void;

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
  location: OR<RouterPath>,
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
export type {RouterLoader, RouterLoaderContext, RouterNavigate, RouterParams, RouterPath, RouterRoute, RouterRouter, RouterState};
