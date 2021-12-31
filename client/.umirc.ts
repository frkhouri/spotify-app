import { defineConfig } from 'umi';
import { InjectManifest } from "workbox-webpack-plugin";

const manifestName = "manifest.webmanifest";

export default defineConfig({
  define: {
    client_id: 'client_id',
    response_type: 'token',
    redirect_uri: "https://spotify-app-5bb09.web.app",
    scope:
      'user-top-read playlist-read-private user-read-recently-played user-follow-read user-modify-playback-state user-library-read user-library-modify user-read-playback-state',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/index',
      wrappers: ['@/wrappers/script'],
    },
    {
      path: '/callback',
      component: '@/pages/callback/index',
      // wrappers: ['@/wrappers/auth'],
      wrappers: ['@/wrappers/script'],
    },
    {
      path: '/',
      component: '@/layouts/mainLayout',
      // exact: false,
      //wrappers: ['@/wrappers/user'],
      wrappers: ['@/wrappers/script'],
      routes: [
        {
          path: '/',
          component: '@/pages/home/index',
          exact: true,
        },
        {
          path: '/home',
          component: '@/pages/home/index',
        },
        {
          path: '/explore',
          component: '@/pages/explore/index',
        },
        {
          path: "/artists/:artistId",
          component: "@/pages/artists/[artistId]/index",
          exact: true
        },
      ],
    },
  ],

  copy: [`/src/${manifestName}`],
  links: [{ rel: "manifest", href: `/${manifestName}` }],
  chainWebpack(memo) {
    memo.plugin("workbox").use(InjectManifest, [
      {
        swSrc: "./src/service-worker.ts",
        swDest: "sw.js",
        exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/]
      }
    ]);
  }
});
