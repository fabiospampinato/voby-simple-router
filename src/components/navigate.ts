
/* IMPORT */

import {$$} from 'voby';
import useNavigate from '~/hooks/use_navigate';
import type {F, RouterPath} from '~/types';

/* MAIN */

const Navigate = ({ to, state }: { to: F<RouterPath>, state?: any }): () => JSX.Element => {

  const navigate = useNavigate ();

  return (): undefined => {

    queueMicrotask ( () => navigate ( $$(to), { replace: true, state } ) );

    return;

  };

};

/* EXPORT */

export default Navigate;
