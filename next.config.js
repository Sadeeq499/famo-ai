/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "img.clerk.com",
      "promptsgenii.com",
      "cdn.midjourney.com",
      "plus.unsplash.com",
      "kaizenstorageacc.blob.core.windows.net",
      "dszdntohmezzveoalhfz.supabase.co",
      "docs.material-tailwind.com",
      "commondatastorage.googleapis.com",
    ],
  },
  optimizeCss: false,
  enableBabelRuntime: true,
};

module.exports = nextConfig;
