import { defineConfig } from 'umi';
import { InjectManifest } from 'workbox-webpack-plugin';

const manifestName = 'manifest.webmanifest';

export default defineConfig({
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
          path: '/artists/:artistId',
          component: '@/pages/artists/[artistId]/index',
          exact: true,
        },
        {
          path: '/albums/:albumId',
          component: '@/pages/albums/[albumId]/index',
          exact: true,
        },
        {
          path: '/categories/:categoryId',
          component: '@/pages/categories/[categoryId]/index',
          exact: true,
        },
        {
          path: '/playlists/:playlistId',
          component: '@/pages/playlists/[playlistId]/index',
          exact: true,
        },
        {
          path: '/new',
          component: '@/pages/new/index',
        },
        {
          path: '/users/me',
          component: '@/pages/users/me/index',
        },
      ],
    },
  ],

  copy: [`/src/${manifestName}`],
  links: [{ rel: 'manifest', href: `/${manifestName}` }],
  chainWebpack(memo) {
    memo.plugin('workbox').use(InjectManifest, [
      {
        swSrc: './src/service-worker.ts',
        swDest: 'sw.js',
        exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/],
      },
    ]);
  },
});
