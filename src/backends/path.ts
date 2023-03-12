
/* IMPORT */

import browser from '~/backends/browser';
import {castPath} from '~/utils';
import type {F, OR, RouterPath, RouterNavigate} from '~/types';

/* MAIN */

const path = ( routerPath?: F<RouterPath> ): [OR<RouterPath>, RouterNavigate] => {

  const location = globalThis.location;
  const browserPath = () => castPath ( location ? `${location.pathname}${location.search}${location.hash}` : '/' );

  return browser ( browserPath, routerPath, { history: true, resetScroll: true } );

};

/* EXPORT */

export default path;
