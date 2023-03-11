
/* IMPORT */

import useState from '~/hooks/use_state';
import type {OR} from '~/types';

/* MAIN */

const useSearchParams = (): OR<URLSearchParams> => {

  return useState ().searchParams;

};

/* EXPORT */

export default useSearchParams;
