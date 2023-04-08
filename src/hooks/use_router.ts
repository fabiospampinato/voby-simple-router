
/* IMPORT */

import Noren from 'noren/router';
import type {RouterParams, RouterRoute, RouterRouter} from '~/types';

/* MAIN */

const useRouter = ( routes: RouterRoute[] ): RouterRouter => {

  const noren = new Noren<RouterRoute> ();

  /* INITING */

  const stack: string[] = [];

  const populate = ( route: RouterRoute ): void => {

    stack.push ( route.path );

    noren.get ( stack.join ( '/' ), route );

    route.children?.forEach ( populate );

    stack.pop ();

  };

  routes.forEach ( populate );

  /* METHODS */

  const route = ( path: string ): { params: RouterParams, route: RouterRoute } | undefined => {

    const match = noren.route ( 'GET', path );

    if ( !match ) return;

    const params = match.params;
    const route = match.route.handlers[0];

    return {params, route};

  };

  /* RETURN */

  return {route};

};

/* EXPORT */

export default useRouter;
