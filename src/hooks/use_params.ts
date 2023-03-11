
/* IMPORT */

import useState from '~/hooks/use_state';
import type {OR, RouterParams} from '~/types';

/* MAIN */

const useParams = (): OR<RouterParams> => {

  return useState ().params;

};

/* EXPORT */

export default useParams;
