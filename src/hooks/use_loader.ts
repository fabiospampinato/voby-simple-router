
/* IMPORT */

import {untrack} from 'voby';
import useState from '~/hooks/use_state';
import type {Resource} from '~/types';

/* MAIN */

const useLoader = <T = unknown> (): Resource<T> => {

  return untrack ( useState ().loader );

};

/* EXPORT */

export default useLoader;
