
/* IMPORT */

import type {FunctionMaybe, Observable, ObservableReadonly} from 'voby';

/* HELPERS */

type F<T> = FunctionMaybe<T>;

type O<T> = Observable<T>;

type OR<T> = ObservableReadonly<T>;

/* MAIN */

type RouterNavigate = ( path: RouterPath ) => void;

type RouterParams = Record<string, string | undefined>;

type RouterPath = `/${string}`;

type RouterRoute = {
  path: string,
  to: JSX.Child,
  children?: RouterRoute[]
};

type RouterRouter = {
  route ( path: string ): { params: RouterParams, route: RouterRoute } | undefined
};

type RouterState = {
  location: O<RouterPath>,
  pathname: OR<RouterPath>,
  search: OR<string>,
  hash: OR<string>,
  navigate: RouterNavigate,
  params: OR<RouterParams>,
  searchParams: OR<URLSearchParams>,
  route: OR<RouterRoute>
};

/* EXPORT */

export type {F, O, OR};
export type {RouterNavigate, RouterParams, RouterPath, RouterRoute, RouterRouter, RouterState};
