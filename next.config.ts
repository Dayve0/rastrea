// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "images.kabum.com.br",
      port: "",
      pathname: "/produtos/fotos/**",
      search: "",
    },
    ],
    qualities: [25, 50, 75, 100],
  },
};

module.exports = nextConfig;