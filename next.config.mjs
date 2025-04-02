/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const redirects = [
      {
        source: "/about/team",
        destination: "/about",
        permanent: false,
      },
      {
        source: "/library/composers",
        destination: "/library/composers-musicians",
        permanent: false,
      },
      {
        source: "/library/musicians",
        destination: "/library/composers-musicians",
        permanent: false,
      },
    ];

    // Conditionally disable /test in production
    if (process.env.NODE_ENV === "production") {
      redirects.push({
        source: "/test",
        destination: "/",
        permanent: false,
      });
    }

    return redirects;
  },
};

export default nextConfig;
