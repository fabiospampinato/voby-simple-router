
/* IMPORT */

import useState from '~/hooks/use_state';
import type {OR} from '~/types';

/* MAIN */

const useHash = (): OR<string> => {

  return useState ().hash;

};

/* EXPORT */

export default useHash;
