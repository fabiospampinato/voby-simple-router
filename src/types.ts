
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

type RouterState = {
  location: O<RouterPath>,
  navigate: RouterNavigate,
  params: OR<RouterParams>,
  route: OR<RouterRoute>
};

/* EXPORT */

export type {F, O, OR};
export type {RouterNavigate, RouterParams, RouterPath, RouterRoute, RouterState};
