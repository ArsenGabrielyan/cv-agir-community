import { locales, messages } from "@/i18n/config";
import type { NextConfig } from "next";
import type { Messages } from "@/i18n/types";
import createNextIntlPlugin from 'next-intl/plugin';

const exclusions = new Set<Messages>(["editor"])

const messagePaths = locales.flatMap(locale=>messages.filter(val=>!exclusions.has(val)).map(msg=>
  `./i18n/${locale}/${msg}.json`
))

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: messagePaths
  }
});

const nextConfig: NextConfig = {
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-XSS-Protection", value: "1; mode=block" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self'",
                "script-src 'self' https://www.google.com https://www.gstatic.com 'unsafe-inline' 'unsafe-eval'",
                "style-src 'self' 'unsafe-inline'",
                "img-src * blob: data:",
                "font-src 'self' data:",
                "object-src 'none'",
                "frame-ancestors 'none'",
                "connect-src 'self' https://www.google.com",
                "frame-src https://www.google.com"
              ].join("; "),
            },
          ],
        }
      ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nlufwtlc3xvedi7i.public.blob.vercel-storage.com"
      },
    ]
  },
  compiler: {
    removeConsole: {
      exclude: ['error',"info"],
    },
  },
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
      preventFullImport: true
    }
  },
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    },
  },
};

export default withNextIntl(nextConfig);