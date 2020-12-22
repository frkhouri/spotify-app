import { defineConfig } from "umi";
import { InjectManifest } from "workbox-webpack-plugin";

const manifestName = "manifest.webmanifest";

export default defineConfig({
  define: {
    client_id: "client_id",
    response_type: "token",
    redirect_uri: "redirect_uri",
    scope: "scope"
  },
  nodeModulesTransform: {
    type: "none"
  },
  routes: [
    {
      path: "/login",
      component: "@/pages/login/index",
      wrappers: ["@/wrappers/script"]
    },
    {
      path: "/callback",
      component: "@/pages/callback/index",
      wrappers: ["@/wrappers/script"]
    },
    {
      path: "/",
      component: "@/layouts/mainLayout",
      //wrappers: ['@/wrappers/user'],
      wrappers: ["@/wrappers/script"],
      routes: [
        {
          path: "/",
          component: "@/pages/home/index"
        },
        {
          path: "/home",
          component: "@/pages/home/index"
        },
        {
          path: "/new",
          component: "@/pages/new/index"
        },
        {
          path: "/explore",
          component: "@/pages/explore/index",
          exact: true
        },
        {
          path: "/explore/search",
          component: "@/pages/explore/search/index",
          exact: true
        },
        {
          path: "/categories/:categoryId",
          component: "@/pages/categories/[categoryId]/index",
          exact: true
        },
        {
          path: "/artists/:artistId",
          component: "@/pages/artists/[artistId]/index",
          exact: true
        },
        {
          path: "/albums/:albumId",
          component: "@/pages/albums/[albumId]/index",
          exact: true
        },
        {
          path: "/users/me",
          component: "@/pages/users/me/index",
          exact: true
        },
        {
          path: "/users/:userId",
          component: "@/pages/users/[userId]/index",
          exact: true
        },
        {
          path: "/playlists/:playlistId",
          component: "@/pages/playlists/[playlistId]/index",
          exact: true
        },
        {
          path: "/radios/:artistId",
          component: "@/pages/radios/[artistId]/index",
          exact: true
        }
      ]
    }
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
