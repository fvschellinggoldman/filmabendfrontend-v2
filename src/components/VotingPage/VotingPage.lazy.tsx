import React, { lazy, Suspense } from 'react';

const LazyVotingPage = lazy(() => import('./VotingPage'));

const VotingPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyVotingPage {...props} />
  </Suspense>
);

export default VotingPage;
