
/* IMPORT */

import {$$} from 'voby';
import useNavigate from '~/hooks/use_navigate';
import type {F, RouterPath} from '~/types';

/* MAIN */

const Navigate = ({ to }: { to: F<RouterPath> }): () => JSX.Element => {

  const navigate = useNavigate ();

  return (): undefined => {

    queueMicrotask ( () => navigate ( $$(to) ) );

    return;

  };

};

/* EXPORT */

export default Navigate;
