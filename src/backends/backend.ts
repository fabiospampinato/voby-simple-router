
/* IMPORT */

import hash from '~/backends/hash';
import memory from '~/backends/memory';
import path from '~/backends/path';
import type {F, OR, RouterPath, RouterNavigate} from '~/types';

/* HELPERS */

const BACKENDS = { hash, memory, path };

/* MAIN */

const backend = ( backend: 'hash' | 'memory' | 'path', routerPath?: F<RouterPath> ): [OR<RouterPath>, RouterNavigate] => {

  return BACKENDS[backend]( routerPath );

};

/* EXPORT */

export default backend;
