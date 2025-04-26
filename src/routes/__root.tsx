import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Layout from '../features/layout/components/Layout';

export default function RootRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
