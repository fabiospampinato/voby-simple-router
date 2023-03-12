
/* IMPORT */

import useState from '~/hooks/use_state';
import type {RouterLocation} from '~/types';

/* MAIN */

const useLocation = (): RouterLocation => {

  const {pathname, search, hash} = useState ();

  return {pathname, search, hash};

};

/* EXPORT */

export default useLocation;
