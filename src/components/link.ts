
/* IMPORT */

import {$$, h} from 'voby';
import useNavigate from '~/hooks/use_navigate';
import type {F, RouterPath} from '~/types';

/* MAIN */

const Link = ({ to, title, children, ...rest }: { to: F<RouterPath>, title?: F<string>, children?: JSX.Children } & Omit<JSX.IntrinsicElement<'a'>, 'children' | 'href' | 'title' | 'onClick'>): JSX.Element => {

  const navigate = useNavigate ();

  const onClick = ( event: MouseEvent ): void => {

    event.preventDefault ();

    navigate ( $$(to) );

  };

  return h ( 'a', { href: to, title, onClick, ...rest }, children );

};

/* EXPORT */

export default Link;
