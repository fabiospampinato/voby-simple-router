
/* IMPORT */

import useState from '~/hooks/use_state';
import type {OR, RouterRoute} from '~/types';

/* MAIN */

const useRoute = (): OR<RouterRoute> => {

  return useState ().route;

};

/* EXPORT */

export default useRoute;
