
/* IMPORT */

import {$, $$, untrack, useEventListener, useEffect} from 'voby';
import {castPath} from '~/utils';
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

    if ( options.historyHash ) {

      useEventListener ( globalThis.document.body, 'click', ( event: MouseEvent ) => { // Handle clicks on a[href="#"] elements

        const anchor = event.target;

        if ( !( anchor instanceof HTMLAnchorElement ) ) return;

        const href = anchor.getAttribute ( 'href' );

        if ( !href || !href.startsWith ( '#' ) ) return;

        const id = href.slice ( 1 );
        const target = globalThis.document.getElementById ( id );

        if ( !target ) return;

        const pathNext = castPath ( `${path ().replace ( /^(.*)#.*$/, '$1' )}#${id}` );

        event.preventDefault ();

        navigate ( pathNext );

        target.scrollIntoView ();

      });

    }

    useEventListener ( globalThis.window, 'popstate', () => { // Update path from history

      const pathNext = getBrowserPath ();

      path ( pathNext );

      if ( options.historyHash ) {

        setTimeout ( () => { //TODO: Wait for the page to be loaded better

          if ( pathNext !== getBrowserPath () ) return; // Navigated away already

          const id = pathNext.replace ( /^.*?#(.*)$/, '$1' );

          if ( id === pathNext ) return; // No hash found

          const target = globalThis.document.getElementById ( id );

          if ( !target ) return;

          target.scrollIntoView ();

        });

      }

    });

  }

  return [path, navigate];

};

/* EXPORT */

export default browser;
