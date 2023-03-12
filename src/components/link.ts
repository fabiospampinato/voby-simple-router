
/* IMPORT */

import {$$, h} from 'voby';
import useNavigate from '~/hooks/use_navigate';
import type {F, RouterPath} from '~/types';

/* MAIN */

const Link = ({ to, replace, state, title, children, ...rest }: { to: F<RouterPath>, replace?: boolean, state?: any, title?: F<string>, children?: JSX.Children } & Omit<JSX.IntrinsicElement<'a'>, 'children' | 'href' | 'replace' | 'state' | 'title' | 'onClick'>): JSX.Element => {

  const navigate = useNavigate ();

  const onClick = ( event: MouseEvent ): void => {

    event.preventDefault ();

    navigate ( $$(to), { replace, state } );

  };

  return h ( 'a', { href: to, title, onClick, ...rest }, children );

};

/* EXPORT */

export default Link;
