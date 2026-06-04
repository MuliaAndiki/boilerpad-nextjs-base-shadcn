import { env } from '@/configs/env.config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: env.NEXT_PUBLIC_BASEPATH || '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
