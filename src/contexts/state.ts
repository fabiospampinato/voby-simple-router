
/* IMPORT */

import {createContext} from 'voby';
import type {RouterState} from '~/types';

/* MAIN */

const State = createContext<RouterState> ();

/* EXPORT */

export default State;
