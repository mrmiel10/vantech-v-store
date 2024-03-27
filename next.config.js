/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
        KINDE_POST_LOGOUT_REDIRECT_URL:
            process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
        KINDE_POST_LOGIN_REDIRECT_URL:
            process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
            `https://${process.env.VERCEL_URL}/api/success`
    },
    images: {
        // domains : ["firebasestorage.googleapis.com"],
        
        remotePatterns:[
            {
                hostname: "a0.muscache.com",
                protocol:"https",
                port: "",
            },
            {
                hostname: "firebasestorage.googleapis.com",
                protocol:"https",
                port: "",
            },
            {
                protocol:'https',
                hostname:'lh3.googleusercontent.com',
                port:"",
                pathname:"/a/**",
            },
            {
                protocol:"https",
                hostname:"avatars.githubusercontent.com",
                port:"",
                pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"zijurhjioctaksze.public.blob.vercel-storage.com",
                port:"",
                //pathname:'/u/**',
            },
            {
                protocol:"https",
                hostname:"lzdzy7eapvafpa4c.public.blob.vercel-storage.com",
                port:"",
               // pathname:'/u/**',
            },
        ]
    }
    
}

module.exports = nextConfig
/*npm shadcn-ui@latestinit */