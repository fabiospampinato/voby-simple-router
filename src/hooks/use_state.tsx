
/* IMPORT */

import {useContext} from 'voby';
import State from '~/contexts/state';
import type {RouterState} from '~/types';

/* MAIN */

const useState = (): RouterState => {

  const state = useContext ( State );

  if ( !state ) throw new Error ( 'Router context not found' );

  return state;

};

/* EXPORT */

export default useState;
