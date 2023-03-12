
/* IMPORT */

import {h, untrack, useMemo, useResource} from 'voby';
import getBackend from '~/backends/backend';
import {FALLBACK_ROUTE, NOOP} from '~/constants';
import State from '~/contexts/state';
import useRouter from '~/hooks/use_router';
import {castPath} from '~/utils';
import type {F, RouterBackend, RouterPath, RouterRoute} from '~/types';

/* MAIN */

const Router = ({ backend, routes, path, children }: { backend?: RouterBackend, routes: RouterRoute[], path?: F<RouterPath>, children: JSX.Children }): JSX.Element => {

  const [location, navigate] = getBackend ( backend || 'path', path );

  const pathname = useMemo ( () => castPath ( location ().replace ( /[?#].*$/, '' ) ) );
  const search = useMemo ( () => location ().replace ( /^.*?(?:\?|$)/, '' ).replace ( /#.*$/, '' ) );
  const hash = useMemo ( () => location ().replace ( /^.*?(?:#|$)/, '' ) );

  const router = useRouter ( routes );
  const lookup = useMemo ( () => router.route ( pathname () ) || router.route ( '/404' ) || FALLBACK_ROUTE );
  const route = useMemo ( () => lookup ().route );
  const params = useMemo ( () => lookup ().params );
  const searchParams = useMemo ( () => new URLSearchParams ( search () ) ); //TODO: Maybe update the URL too? Maybe push an entry into the history? Maybe react to individual changes?

  const loaderContext = () => ({ pathname: pathname (), search: search (), hash: hash (), params: params (), searchParams: searchParams (), route: route () });
  const loader = useMemo ( () => useResource ( () => ( route ().loader || NOOP )( untrack ( loaderContext ) ) ) );

  return h ( State.Provider, { value: { pathname, search, hash, navigate, params, searchParams, route, loader }, children } );

};

/* EXPORT */

export default Router;
