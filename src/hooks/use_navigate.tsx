
/* IMPORT */

import useState from '~/hooks/use_state';
import type {RouterNavigate} from '~/types';

/* MAIN */

const useNavigate = (): RouterNavigate => {

  return useState ().navigate;

};

/* EXPORT */

export default useNavigate;
