
/* IMPORT */

import {$, $$, h, untrack, useEventListener, useEffect, useMemo, useResource} from 'voby';
import {FALLBACK_ROUTE, NOOP} from '~/constants';
import State from '~/contexts/state';
import useRouter from '~/hooks/use_router';
import {castPath} from '~/utils';
import type {F, RouterPath, RouterRoute} from '~/types';

/* MAIN */

const Router = ({ routes, path, children }: { routes: RouterRoute[], path?: F<RouterPath>, children: JSX.Children }): JSX.Element => {

  const url = globalThis.location;
  const getPropsPath = () => $$(path);
  const getUrlPath = () => ( url ? `${url.pathname}${url.search}${url.hash}` : '/' );
  const getPath = () => getPropsPath () || getUrlPath ();

  const location = $ ( castPath ( getPath () ) );
  const pathname = useMemo ( () => castPath ( location ().replace ( /[?#].*$/, '' ) ) );
  const search = useMemo ( () => location ().replace ( /^.*?(?:\?|$)/, '' ).replace ( /#.*$/, '' ) );
  const hash = useMemo ( () => location ().replace ( /^.*?(?:#|$)/, '' ) );

  const router = useRouter ( routes );
  const lookup = useMemo ( () => router.route ( pathname () ) || router.route ( '/404' ) || FALLBACK_ROUTE );
  const route = useMemo ( () => lookup ().route );
  const params = useMemo ( () => lookup ().params );
  const searchParams = useMemo ( () => new URLSearchParams ( search () ) ); //TODO: Maybe update the URL too? Maybe push an entry into the history? Maybe react to individual changes?

  const loaderContext = () => ({ location: location (), hash: hash (), params: params (), searchParams: searchParams (), route: route () });
  const loader = useMemo ( () => useResource ( () => ( route ().loader || NOOP )( untrack ( loaderContext ) ) ) );

  const navigate = ( path: RouterPath ): void => { // Update location manually

    if ( location () === path ) return; // Already there

    globalThis.window?.scrollTo ( 0, 0 );
    globalThis.history?.pushState ( null, '', path );

    location ( path );

  };

  useEffect ( () => { // Update location from props

    navigate ( castPath ( getPath () ) );

  });

  useEventListener ( globalThis.window, 'popstate', () => { // Update location from history

    location ( castPath ( getUrlPath () ) );

  });

  return h ( State.Provider, { value: { location, pathname, search, hash, navigate, params, searchParams, route, loader }, children } );

};

/* EXPORT */

export default Router;
