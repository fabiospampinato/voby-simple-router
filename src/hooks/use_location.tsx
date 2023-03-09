
/* IMPORT */

import {useReadonly} from 'voby';
import useState from '~/hooks/use_state';
import type {OR, RouterPath} from '~/types';

/* MAIN */

const useLocation = (): OR<RouterPath> => {

  return useReadonly ( useState ().location );

};

/* EXPORT */

export default useLocation;
