const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force dynamic rendering for all pages
  staticPageGenerationTimeout: 0,
  
  // Enable experimental features for better performance
  experimental: {
    // Optimize bundle splitting
    optimizePackageImports: ['framer-motion', 'gsap'],
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      )
    }

    // Optimize chunk splitting (only in production for faster dev builds)
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for stable dependencies
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // UI components chunk
          ui: {
            test: /[\\/]components[\\/]/,
            name: 'ui',
            priority: 15,
            reuseExistingChunk: true,
            minChunks: 2,
          },
          // Animation libraries chunk
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|gsap)[\\/]/,
            name: 'animations',
            priority: 18,
            reuseExistingChunk: true,
          },
          // Utilities chunk
          utils: {
            test: /[\\/]node_modules[\\/](d3|lodash|date-fns)[\\/]/,
            name: 'utils',
            priority: 12,
            reuseExistingChunk: true,
          },
        },
      }
    }

    // Optimize production builds
    if (!dev) {
      // Tree shaking optimizations
      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      // Add DefinePlugin for environment variables (preventing duplicates)
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          // Remove duplicate NEXT_PUBLIC_BUILD_VERSION as it's handled in env section
        })
      )

      // Minimize memory usage during build
      config.optimization.minimizer = config.optimization.minimizer.map(plugin => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.parallel = 2 // Limit parallel processes
          plugin.options.terserOptions = {
            ...plugin.options.terserOptions,
            compress: {
              ...plugin.options.terserOptions?.compress,
              drop_console: true, // Remove console logs in production
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
          }
        }
        return plugin
      })
    }

    // Development optimizations for faster compilation
    if (dev) {
      // Reduce filesystem checks
      config.watchOptions = {
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
        aggregateTimeout: 300,
        poll: false,
      }
      
      // Optimize development builds
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    }

    return config
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // React compiler optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Output configuration - removed standalone for better compatibility
  // output: 'standalone',
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
        ],
      },
    ]
  },

  // Asset optimization
  async rewrites() {
    return [
      // Optimize font loading
      {
        source: '/fonts/:path*',
        destination: '/api/fonts/:path*',
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_BUILD_VERSION: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // TypeScript configuration
  typescript: {
    // Ignore TypeScript errors during production builds for faster deployment
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Disable static generation for all pages
  trailingSlash: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },

}

module.exports = withNextIntl(nextConfig)