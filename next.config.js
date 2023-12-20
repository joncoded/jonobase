/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [   
      {
        source: '/moods',
        destination: '/',
        permanent: true
      }      
    ]
  },
  images: {
    remotePatterns: [{
      hostname: 'cdn.sanity.io'
    }]
  }
}

module.exports = nextConfig
