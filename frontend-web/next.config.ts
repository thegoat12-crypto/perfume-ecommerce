import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cette option est cruciale pour le développement local avec une IP privée
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    // On ajoute ceci pour autoriser les adresses IP locales
    unoptimized: true,
  },
};

export default nextConfig;
