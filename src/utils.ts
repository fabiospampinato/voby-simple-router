
/* IMPORT */

import type {RouterPath} from '~/types';

/* MAIN */

const castPath = ( path: string ): RouterPath => {

  return `/${path.replace ( /^\/+/g, '' )}`;

};

/* EXPORT */

export {castPath};
