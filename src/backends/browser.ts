
/* IMPORT */

import {$, $$, untrack, useEventListener, useEffect} from 'voby';
import {castPath} from '~/utils';
import type {F, OR, RouterPath, RouterNavigate, RouterNavigateOptions} from '~/types';

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

  const navigate = ( pathNext: RouterPath, navigateOptions: RouterNavigateOptions = {} ): void => { // Update path manually

    if ( path () === pathNext ) return; // Already there

    if ( options.resetScroll ) {

      globalThis.window?.scrollTo?. ( 0, 0 );

    }

    if ( options.history ) {

      const url = options.historyHash ? `#${pathNext}` : pathNext;
      const state = navigateOptions.state ?? '';

      if ( navigateOptions.replace ) {

        globalThis.history?.replaceState ( state, '', url );

      } else {

        globalThis.history?.pushState ( state, '', url );

      }

    }

    path ( pathNext );

  };

  const scrollTo = ( path: RouterPath ): void => { // Scroll to the fragment manually

    if ( path !== getBrowserPath () ) return; // Already in a different path

    const id = path.replace ( /^.*?#(.*)$/, '$1' );

    if ( id === path ) return; // No hash found

    const target = globalThis.document?.getElementById ( id );

    if ( !target ) return;

    target.scrollIntoView ();

  };

  useEffect ( () => { // Update path from the browser

    path ( getBrowserPath () );

  }, { sync: 'init' } );

  useEffect ( () => { // Update path from the router

    navigate ( getRouterPath () || untrack ( path ) );

  }, { sync: 'init' } );

  if ( options.history ) {

    if ( options.historyHash ) {

      setTimeout ( () => { //TODO: Wait for the page to be loaded better

        scrollTo ( path () );

      });

      useEventListener ( globalThis.document, 'click', ( event: MouseEvent ) => { // Handle clicks on a[href="#"] elements

        const anchor = event.target;

        if ( !( anchor instanceof HTMLAnchorElement ) ) return;

        const href = anchor.getAttribute ( 'href' );

        if ( !href || !href.startsWith ( '#' ) ) return;

        const id = href.slice ( 1 );
        const target = globalThis.document?.getElementById ( id );

        if ( !target ) return;

        const pathNext = castPath ( `${path ().replace ( /^(.*)#.*$/, '$1' )}#${id}` );

        event.preventDefault ();

        navigate ( pathNext ); //TODO: Handle "replace" and "state" too

        target.scrollIntoView ();

      });

    }

    useEventListener ( globalThis.window, 'popstate', () => { // Update path from history

      const pathNext = getBrowserPath ();

      path ( pathNext );

      if ( options.historyHash ) {

        setTimeout ( () => { //TODO: Wait for the page to be loaded better

          scrollTo ( pathNext );

        });

      }

    });

  }

  return [path, navigate];

};

/* EXPORT */

export default browser;
