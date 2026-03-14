// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js",
// );

// if (!self.workbox) {
//   console.error("[SW] Workbox failed to load");
//   self.addEventListener("activate", () => self.clients.claim());
//   return;
// }

// const CACHE_VERSION = "v1";

// const { clientsClaim } = workbox.core;
// const { registerRoute } = workbox.routing;
// const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
// const { ExpirationPlugin } = workbox.expiration;

// clientsClaim();

// console.log("[SW] Service Worker Starting...");

// registerRoute(
//   ({ request }) => request.mode === "navigate",
//   new NetworkFirst({
//     cacheName: `html-cache-${CACHE_VERSION}`,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 24 * 60 * 60,
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ url }) => url.pathname.startsWith("/api/"),
//   new NetworkFirst({
//     cacheName: `api-cache-${CACHE_VERSION}`,
//     networkTimeoutSeconds: 10,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 5 * 60,
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ request }) =>
//     request.destination === "script" || request.destination === "style",
//   new StaleWhileRevalidate({
//     cacheName: `static-cache-${CACHE_VERSION}`,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 30 * 24 * 60 * 60,
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ request, url }) =>
//     request.destination === "image" && !url.pathname.startsWith("/favicon"),
//   new CacheFirst({
//     cacheName: `image-cache-${CACHE_VERSION}`,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 60 * 24 * 60 * 60,
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ request }) => request.destination === "font",
//   new CacheFirst({
//     cacheName: `font-cache-${CACHE_VERSION}`,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 365 * 24 * 60 * 60,
//       }),
//     ],
//   }),
// );

// self.addEventListener("install", () => {
//   console.log("[SW] Installing");
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   console.log("[SW] Activating");

//   const validCaches = [
//     `html-cache-${CACHE_VERSION}`,
//     `api-cache-${CACHE_VERSION}`,
//     `static-cache-${CACHE_VERSION}`,
//     `image-cache-${CACHE_VERSION}`,
//     `font-cache-${CACHE_VERSION}`,
//   ];

//   event.waitUntil(
//     caches
//       .keys()
//       .then((names) =>
//         Promise.all(
//           names
//             .filter((name) => !validCaches.includes(name))
//             .map((name) => caches.delete(name)),
//         ),
//       ),
//   );
// });

// self.addEventListener("message", (event) => {
//   if (event.data?.type === "SKIP_WAITING") {
//     console.log("[SW] SKIP_WAITING received");
//     self.skipWaiting();
//   }
// });

// workbox.core.skipWaiting();
// workbox.core.clientsClaim();

// console.log("[SW] Service Worker Ready");
