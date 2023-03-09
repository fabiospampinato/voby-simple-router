
/* IMPORT */

import {$$, h} from 'voby';
import useNavigate from '~/hooks/use_navigate';
import type {F, RouterPath} from '~/types';

/* MAIN */

//TODO: Add rest props for the anchor element also

const Link = ({ to, title, children }: { to: F<RouterPath>, title?: F<string>, children?: JSX.Children }): JSX.Element => {

  const navigate = useNavigate ();

  const onClick = ( event: MouseEvent ): void => {

    event.preventDefault ();

    navigate ( $$(to) );

  };

  return h ( 'a', { href: to, title, onClick }, children );

};

/* EXPORT */

export default Link;
