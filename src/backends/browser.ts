
/* IMPORT */

import {$, $$, untrack, useEventListener, useEffect} from 'voby';
import type {F, OR, RouterPath, RouterNavigate} from '~/types';

/* TYPES */

type Options = {
  history?: boolean,
  historyHash?: boolean,
  resetScroll?: boolean
};

/* MAIN */

const browser = ( browserPath: F<RouterPath>, routerPath?: F<RouterPath>, options: Options = {} ): [OR<RouterPath>, RouterNavigate] => {

  const getBrowserPath = () => $$(browserPath);
  const getRouterPath = () => $$(routerPath);
  const path = $<RouterPath>('/');

  const navigate = ( pathNext: RouterPath ): void => { // Update path manually

    if ( path () === pathNext ) return; // Already there

    if ( options.resetScroll ) {

      globalThis.window?.scrollTo ( 0, 0 );

    }

    if ( options.history ) {

      const url = options.historyHash ? `#${pathNext}` : pathNext;

      globalThis.history?.pushState ( null, '', url );

    }

    path ( pathNext );

  };

  useEffect ( () => { // Update path from the browser

    path ( getBrowserPath () );

  });

  useEffect ( () => { // Update path from the router

    navigate ( getRouterPath () || untrack ( path ) );

  });

  if ( options.history ) {

    useEventListener ( globalThis.window, 'popstate', () => { // Update path from history

      path ( getBrowserPath () );

    });

  }

  return [path, navigate];

};

/* EXPORT */

export default browser;
