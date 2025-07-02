import { Suspense } from 'react';
import DashboardPage from '@/components/DashBoard-Agente/DashboardPage'
import Loader from '@/components/Loader/Loader';

export default function Page() {
  return (

    <Suspense fallback={<div><Loader/></div>}>
      <DashboardPage />
    </Suspense>
  );
}
