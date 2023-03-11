
/* MAIN */

const FALLBACK_LOADER_DATA = Promise.resolve ();

const FALLBACK_ROUTE = {
  params: {},
  route: {
    path: '',
    to: (): never => {
      throw new Error ( 'No route found' );
    },
    loader: (): Promise<void> => {
      return FALLBACK_LOADER_DATA;
    }
  }
};

const NOOP = (): void => {};

/* EXPORT */

export {FALLBACK_LOADER_DATA, FALLBACK_ROUTE, NOOP};
