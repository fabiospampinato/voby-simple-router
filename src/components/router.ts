
/* IMPORT */

import {$, $$, h, useEventListener, useEffect, useMemo} from 'voby';
import {FALLBACK_ROUTE} from '~/constants';
import State from '~/contexts/state';
import useRouter from '~/hooks/use_router';
import {castPath} from '~/utils';
import type {F, RouterPath, RouterRoute} from '~/types';

/* MAIN */

const Router = ({ routes, path, children }: { routes: RouterRoute[], path?: F<RouterPath>, children: JSX.Children }): JSX.Element => {

  const router = useRouter ( routes );
  const location = $<RouterPath> ( castPath ( $$(path) || globalThis.location?.pathname || '/' ) );
  const lookup = useMemo ( () => router.route ( $$(location) ) || router.route ( '/404' ) || FALLBACK_ROUTE );
  const route = useMemo ( () => lookup ().route );
  const params = useMemo ( () => lookup ().params );

  const navigate = ( path: RouterPath ): void => { // Update location manually

    if ( location () === path ) return; // Already there

    globalThis.window?.scrollTo ( 0, 0 );
    globalThis.history?.pushState ( null, '', path );

    location ( path );

  };

  useEffect ( () => { // Update location from props

    navigate ( castPath ( $$(path) || globalThis.location?.pathname || '/' ) );

  });

  useEventListener ( globalThis.window, 'popstate', () => { // Update location from history

    location ( castPath ( globalThis.location?.pathname || '/' ) );

  });

  return h ( State.Provider, { value: { location, navigate, params, route }, children } );

};

/* EXPORT */

export default Router;
