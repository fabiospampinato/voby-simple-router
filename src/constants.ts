
/* MAIN */

const FALLBACK_ROUTE = {
  params: {},
  route: {
    path: '',
    to: (): never => {
      throw new Error ( 'No route found' );
    }
  }
};

/* EXPORT */

export {FALLBACK_ROUTE};
