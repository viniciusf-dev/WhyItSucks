import { Suspense } from 'react';
import ResultsClient from './results-client';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
