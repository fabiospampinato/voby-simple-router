
/* IMPORT */

import {useReadonly} from 'voby';
import useState from '~/hooks/use_state';
import type {OR, RouterParams} from '~/types';

/* MAIN */

const useParams = (): OR<RouterParams> => {

  return useReadonly ( useState ().params );

};

/* EXPORT */

export default useParams;
