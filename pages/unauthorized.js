import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unautorized">
      <h1 className="mb-4 text-xl font-bold mx-4">Access Denied</h1>
      {message && <div className="mx-4 text-red-500">{message}</div>}
    </Layout>
  );
}
