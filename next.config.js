/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: '**',
            }
        ]
    },
    typescript:{
        ignoreBuildErrors:true
    },
    experimental: {
        serverActions: true,
        optimizeFonts: true,
        optimizeImages: true,
        optimizeCss: true,
    },
}

module.exports = nextConfig
