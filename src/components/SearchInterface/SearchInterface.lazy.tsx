import React, { lazy, Suspense } from 'react';

const LazySearchInterface = lazy(() => import('./SearchInterface'));

const SearchInterface = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySearchInterface {...props} />
  </Suspense>
);

export default SearchInterface;
