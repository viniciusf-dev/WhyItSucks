import { Suspense } from 'react';
import ResultsClient from './results-client';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
