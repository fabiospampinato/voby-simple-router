
/* MAIN */

const FALLBACK_ROUTE = {
  params: {},
  route: {
    methods: new Set (),
    paths: [],
    pathsRe: [],
    handlers: [
      {
        path: '',
        to: (): never => {
          throw new Error ( 'No route found' );
        }
      }
    ]
  }
};

/* EXPORT */

export {FALLBACK_ROUTE};
