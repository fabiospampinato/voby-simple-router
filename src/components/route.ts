
/* IMPORT */

import useRoute from '~/hooks/use_route';

/* MAIN */

const Route = (): JSX.Element => {

  const route = useRoute ();

  return () => route ().to;

};

/* EXPORT */

export default Route;
