
/* IMPORT */

import Router from 'noren/router';
import type {RouterRoute} from '~/types';

/* MAIN */

const useRouter = ( routes: RouterRoute[] ): Router<RouterRoute> => {

  const router = new Router<RouterRoute> ();

  const stack: string[] = [];

  const populate = ( route: RouterRoute ): void => {

    stack.push ( route.path );
    router.get ( stack.join ( '/' ), route );
    stack.pop ();

    route.children?.forEach ( populate );

  };

  routes.forEach ( populate );

  return router;

};

/* EXPORT */

export default useRouter;
