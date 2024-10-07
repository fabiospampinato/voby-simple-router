
/* IMPORT */

import useState from '~/hooks/use_state';
import type {OR, RouterParams} from '~/types';

/* MAIN */

const useParams = <T extends RouterParams = RouterParams>(): OR<T> => {

  return useState ().params as OR<T>;

};

/* EXPORT */

export default useParams;
