
/* IMPORT */

import {useReadonly} from 'voby';
import useState from '~/hooks/use_state';
import type {OR, RouterRoute} from '~/types';

/* MAIN */

const useRoute = (): OR<RouterRoute> => {

  return useReadonly ( useState ().route );

};

/* EXPORT */

export default useRoute;
