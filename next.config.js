// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // ...
  },
  images: {
    // AVIF primeiro (menor), WebP como fallback
    formats: ['image/avif', 'image/webp'],
    // Imagens otimizadas ficam em cache por 30 dias
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

module.exports = nextConfig
