import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/saluddental',
        destination: '/servicios/dental',
        permanent: true,
      },
      {
        source: '/saludmental',
        destination: '/servicios/mental',
        permanent: true,
      },
      {
        source: '/quienessomos',
        destination: '/nosotros',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
