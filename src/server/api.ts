// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { Logger } from "@/utils/log";
// import { ApiError as ApiErrorClass, type ApiResponse } from "./type";
// import { env } from "@/configs";

// import {
//   APP_SESSION_COOKIE_KEY,
//   APP_SESSION_COOKIE_REFRESH,
//   APP_SESSION_COOKIE_ROLE,
// } from "@/configs";

// const BASE_URL = env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

// const COOKIE_KEYS = {
//   accessToken: APP_SESSION_COOKIE_KEY,
//   refreshToken: APP_SESSION_COOKIE_REFRESH,
//   role: APP_SESSION_COOKIE_ROLE,
// } as const;

// const COOKIE_TTL = {
//   accessToken: 60 * 15,
//   refreshToken: 60 * 60 * 24 * 7,
//   role: 60 * 60 * 24 * 7,
// } as const;

// export interface TokenPair {
//   accessToken: string;
//   refreshToken: string;
// }

// export interface AuthTokens extends TokenPair {
//   role?: string;
// }

// export interface RequestConfig {
//   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//   body?: unknown;
//   headers?: Record<string, string>;
//   cache?: RequestCache;
//   next?: NextFetchRequestConfig;
// }

// export async function getCookieStore() {
//   return await cookies();
// }

// async function getAccessToken(): Promise<string | undefined> {
//   const store = await getCookieStore();
//   return store.get(COOKIE_KEYS.accessToken)?.value;
// }

// async function getRefreshToken(): Promise<string | undefined> {
//   const store = await getCookieStore();
//   return store.get(COOKIE_KEYS.refreshToken)?.value;
// }

// async function getRole(): Promise<string | undefined> {
//   const store = await getCookieStore();
//   return store.get(COOKIE_KEYS.role)?.value;
// }

// export async function saveTokens(tokens: AuthTokens): Promise<void> {
//   const store = await getCookieStore();
//   const isProduction = process.env.NODE_ENV === "production";

//   try {
//     // Set cookies (httpOnly)
//     store.set(COOKIE_KEYS.accessToken, tokens.accessToken, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: "lax",
//       path: "/",
//       maxAge: COOKIE_TTL.accessToken,
//     });

//     store.set(COOKIE_KEYS.refreshToken, tokens.refreshToken, {
//       httpOnly: true,
//       secure: isProduction,
//       sameSite: "lax",
//       path: "/",
//       maxAge: COOKIE_TTL.refreshToken,
//     });

//     if (tokens.role) {
//       store.set(COOKIE_KEYS.role, tokens.role, {
//         secure: isProduction,
//         sameSite: "lax",
//         path: "/",
//         maxAge: COOKIE_TTL.role,
//       });
//     }

//     if (IS_API_DEBUG) {
//       Logger.info(
//         "[Auth] saveTokens: accessToken present, refreshToken present",
//       );
//       try {
//         // read back from cookie store to verify
//         const maybeAccess = store.get(COOKIE_KEYS.accessToken)?.value;
//         const maybeRefresh = store.get(COOKIE_KEYS.refreshToken)?.value;
//         const maybeRole = store.get(COOKIE_KEYS.role)?.value;
//         Logger.info("[ Auth] saveTokens: verify store access:", {
//           accessTokenExists: !!maybeAccess,
//           refreshTokenExists: !!maybeRefresh,
//           roleExists: !!maybeRole,
//         });
//       } catch (err) {
//         Logger.info("[Auth] saveTokens: verify readback failed", err);
//       }
//     }
//   } catch (err) {
//     console.error("[Auth] saveTokens: gagal menyimpan cookie:", err);
//     throw err;
//   }
// }

// /** Hapus semua token (logout / session expired) */
// export async function clearTokens(): Promise<void> {
//   const store = await getCookieStore();
//   store.delete(COOKIE_KEYS.accessToken);
//   store.delete(COOKIE_KEYS.refreshToken);
//   store.delete(COOKIE_KEYS.role);
// }

// /** Get role dari cookie */
// export async function getRoleFromCookie(): Promise<string | undefined> {
//   return await getRole();
// }

// // ─── Internal Headers Builder ─────────────────────────────────────────────────

// function buildBaseHeaders(accessToken?: string): Record<string, string> {
//   const internalApiKey =
//     env.NEXT_INTERNAL_API_SECRET ||
//     process.env.INTERNAL_API_SECRET ||
//     process.env.INTERNAL_API_KEY ||
//     "";

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     // Wajib ada di setiap request ke GetSmart API
//     "x-internal-api-key": internalApiKey,
//   };

//   if (accessToken) {
//     headers["Authorization"] = `Bearer ${accessToken}`;
//   }

//   return headers;
// }

// const IS_API_DEBUG = process.env.NODE_ENV === "development";

// function logApiRequest(params: {
//   method: string;
//   endpoint: string;
//   headers: Record<string, string>;
//   payload?: unknown;
// }): void {
//   Logger.request(
//     params.method,
//     params.endpoint,
//     params.headers,
//     params.payload,
//   );
// }

// function logApiResponse(params: {
//   method: string;
//   endpoint: string;
//   status: number;
//   response: unknown;
// }): void {
//   Logger.response(
//     params.method,
//     params.endpoint,
//     params.status,
//     params.response,
//   );
// }

// // ─── Token Refresh ────────────────────────────────────────────────────────────

// /**
//  * Deduplication guard — jika ada refresh yang sedang berjalan, caller berikutnya
//  * cukup menunggu promise yang sama, bukan membuat request baru.
//  *
//  * Next.js server adalah proses Node.js yang berjalan lama; module-level variable
//  * ini AMAN digunakan sebagai mutex antar concurrent Server Action invocations
//  * dalam satu server instance.
//  */
// let _refreshInFlight: Promise<string | null> | null = null;

// /**
//  * Internal: satu kali refresh request ke backend.
//  * Selalu dipanggil melalui doRefreshToken() agar terdeduplikasi.
//  */
// async function _doRefreshOnce(): Promise<string | null> {
//   const refreshToken = await getRefreshToken();

//   if (!refreshToken) {
//     console.error("[Auth] doRefreshToken: tidak ada refresh token di cookie");
//     return null;
//   }

//   if (IS_API_DEBUG) {
//     try {
//       Logger.info(
//         "[Auth] doRefreshToken: found refresh token in cookie (length)",
//         refreshToken.length,
//       );
//     } catch (err) {
//       Logger.info(
//         "[Auth] doRefreshToken: failed to read refresh token length",
//         err,
//       );
//     }
//   }

//   // ── 1. Kirim request refresh ─────────────────────────────────────────────
//   let res: Response;
//   try {
//     res = await fetch(`${joinUrl(BASE_URL, api, version)}/auth/refresh`, {
//       method: "POST",
//       headers: buildBaseHeaders(),
//       body: JSON.stringify({ refreshToken }),
//       cache: "no-store",
//     });
//   } catch (err) {
//     console.error("[Auth] doRefreshToken: network error:", err);
//     return null;
//   }

//   if (IS_API_DEBUG) {
//     try {
//       const sc = res.headers.get("set-cookie");
//       Logger.info("[Auth] doRefreshToken: refresh response status:", {
//         status: res.status,
//         hasSetCookie: !!sc,
//       });
//     } catch (err) {
//       Logger.info(
//         "[Auth] doRefreshToken: failed to read response headers",
//         err,
//       );
//     }
//   }

//   if (!res.ok) {
//     let body = "";
//     try {
//       body = await res.text();
//     } catch {
//       /* ignore */
//     }
//     console.error(
//       `[Auth] doRefreshToken: endpoint mengembalikan ${res.status}. Body:`,
//       body,
//     );
//     return null;
//   }

//   // ── 2. Parse response ────────────────────────────────────────────────────
//   let newTokens: AuthTokens | undefined;
//   try {
//     const json: ApiResponse<{ tokens: AuthTokens; user?: any }> =
//       await res.json();
//     newTokens = json.data?.tokens;
//   } catch (err) {
//     console.error("[Auth] doRefreshToken: gagal parse response JSON:", err);
//     return null;
//   }

//   if (IS_API_DEBUG) {
//     Logger.info("[Auth] doRefreshToken: parsed tokens presence", {
//       access: !!newTokens?.accessToken,
//       refresh: !!newTokens?.refreshToken,
//       role: !!newTokens?.role,
//     });
//   }

//   if (!newTokens?.accessToken || !newTokens?.refreshToken) {
//     console.error(
//       "[Auth] doRefreshToken: response tidak mengandung tokens yang valid:",
//       newTokens,
//     );
//     return null;
//   }

//   // ── 3. Simpan token ke cookie ────────────────────────────────────────────
//   // Dipisah agar kegagalan save tidak memblokir return (retry tetap bisa jalan)
//   try {
//     if (IS_API_DEBUG) {
//       Logger.info(
//         "[ Auth] doRefreshToken: menerima tokens dari endpoint refresh. saving...",
//       );
//       // Do not log actual tokens
//     }
//     await saveTokens(newTokens);
//     if (IS_API_DEBUG) {
//       Logger.info("[ Auth] doRefreshToken: saveTokens completed");
//     }
//   } catch (err) {
//     console.error(
//       "[Auth] doRefreshToken: saveTokens gagal (token baru tidak disimpan ke cookie):",
//       err,
//     );
//     // Tetap return accessToken baru agar retry request ini bisa sukses.
//     // Request berikutnya akan trigger refresh lagi karena cookie tidak terupdate.
//   }

//   return newTokens.accessToken;
// }

// /**
//  * Panggil endpoint refresh token dan simpan token baru ke cookie.
//  * Mengembalikan access token baru, atau null jika refresh gagal.
//  *
//  * Concurrent 401 yang terjadi bersamaan akan berbagi satu promise refresh
//  * (deduplication), sehingga backend hanya menerima satu request refresh dan
//  * tidak ada race condition saat rotate refresh token.
//  */
// async function doRefreshToken(): Promise<string | null> {
//   // Jika sudah ada refresh yang sedang berjalan, tunggu hasilnya
//   if (_refreshInFlight) {
//     Logger.info(
//       "[Auth] doRefreshToken: menunggu refresh yang sudah berjalan...",
//     );
//     return _refreshInFlight;
//   }

//   // Mulai refresh baru
//   _refreshInFlight = _doRefreshOnce().finally(() => {
//     // Reset flag setelah selesai (berhasil maupun gagal)
//     _refreshInFlight = null;
//   });

//   return _refreshInFlight;
// }

// // ─── Core Fetch ───────────────────────────────────────────────────────────────

// /**
//  * Core fetch internal — dipakai oleh semua helper di bawah.
//  *
//  * @param path    Path relatif, mis. "/auth/me" atau "/courses"
//  * @param config  Request config
//  * @param withAuth Apakah perlu menyertakan Bearer token
//  * @param isRetry  Internal flag — jangan di-set manual
//  */
// async function coreFetch<T>(
//   path: string,
//   config: RequestConfig = {},
//   withAuth: boolean,
//   isRetry = false,
// ): Promise<T> {
//   const {
//     method = "GET",
//     body,
//     headers: extraHeaders = {},
//     cache = "no-store",
//     next,
//   } = config;

//   const accessToken = withAuth ? await getAccessToken() : undefined;
//   const endpoint = `${BASE_URL}${path}`;
//   const headers = {
//     ...buildBaseHeaders(accessToken),
//     ...extraHeaders,
//   };

//   logApiRequest({
//     method,
//     endpoint,
//     headers,
//     payload: body,
//   });

//   const res = await fetch(endpoint, {
//     method,
//     headers,
//     body: body !== undefined ? JSON.stringify(body) : undefined,
//     cache,
//     next,
//   });

//   // ── Auto-refresh on 401 ───────────────────────────────────────────────────
//   if (res.status === 401 && withAuth && !isRetry) {
//     const newAccessToken = await doRefreshToken();

//     if (!newAccessToken) {
//       // Refresh gagal → session habis
//       await clearTokens();
//       redirect("/login");
//     }

//     // Ulangi request dengan access token baru — inject langsung agar tidak
//     // bergantung pada cookie timing di edge / cache layer
//     const retryRes = await fetch(`${BASE_URL}${path}`, {
//       method,
//       headers: {
//         ...buildBaseHeaders(newAccessToken),
//         ...extraHeaders,
//       },
//       body: body !== undefined ? JSON.stringify(body) : undefined,
//       cache,
//       next,
//     });

//     if (!retryRes.ok) {
//       let message = `Request failed with status ${retryRes.status}`;
//       let errors: Record<string, string[]> | undefined;
//       try {
//         const errJson = await retryRes.json();
//         if (errJson?.message) message = errJson.message;
//         if (errJson?.errors) errors = errJson.errors;
//       } catch {
//         /* ignore */
//       }
//       throw new ApiErrorClass(message, retryRes.status, errors);
//     }

//     const retryJson: ApiResponse<T> = await retryRes.json();
//     logApiResponse({
//       method,
//       endpoint,
//       status: retryRes.status,
//       response: retryJson.data,
//     });
//     return retryJson.data;
//   }

//   // ── Error Handling ────────────────────────────────────────────────────────
//   if (!res.ok) {
//     let message = `Request failed with status ${res.status}`;
//     let errors: Record<string, string[]> | undefined;

//     try {
//       const errJson = await res.json();
//       if (errJson?.message) message = errJson.message;
//       if (errJson?.errors) errors = errJson.errors;
//     } catch {
//       // Abaikan error parsing
//     }

//     throw new ApiErrorClass(message, res.status, errors);
//   }

//   const json: ApiResponse<T> = await res.json();
//   logApiResponse({
//     method,
//     endpoint,
//     status: res.status,
//     response: json.data,
//   });
//   return json.data;
// }

// async function coreFetchResponse<T>(
//   path: string,
//   config: RequestConfig = {},
//   withAuth: boolean,
//   isRetry = false,
// ): Promise<ApiResponse<T>> {
//   const {
//     method = "GET",
//     body,
//     headers: extraHeaders = {},
//     cache = "no-store",
//     next,
//   } = config;

//   const accessToken = withAuth ? await getAccessToken() : undefined;
//   const endpoint = `${BASE_URL}${path}`;
//   const headers = {
//     ...buildBaseHeaders(accessToken),
//     ...extraHeaders,
//   };

//   logApiRequest({
//     method,
//     endpoint,
//     headers,
//     payload: body,
//   });

//   const res = await fetch(endpoint, {
//     method,
//     headers,
//     body: body !== undefined ? JSON.stringify(body) : undefined,
//     cache,
//     next,
//   });

//   if (res.status === 401 && withAuth && !isRetry) {
//     const newAccessToken = await doRefreshToken();

//     if (!newAccessToken) {
//       await clearTokens();
//       redirect("/login");
//     }

//     const retryRes = await fetch(`${BASE_URL}${path}`, {
//       method,
//       headers: {
//         ...buildBaseHeaders(newAccessToken),
//         ...extraHeaders,
//       },
//       body: body !== undefined ? JSON.stringify(body) : undefined,
//       cache,
//       next,
//     });

//     if (!retryRes.ok) {
//       let message = `Request failed with status ${retryRes.status}`;
//       let errors: Record<string, string[]> | undefined;
//       try {
//         const errJson = await retryRes.json();
//         if (errJson?.message) message = errJson.message;
//         if (errJson?.errors) errors = errJson.errors;
//       } catch {
//         /* ignore */
//       }
//       return {
//         data: null as any,
//         message,
//         success: false,
//         errors,
//         status: retryRes.status,
//       } as any;
//     }

//     const retryJson: ApiResponse<T> = await retryRes.json();
//     logApiResponse({
//       method,
//       endpoint,
//       status: retryRes.status,
//       response: retryJson.data,
//     });
//     return retryJson;
//   }

//   if (!res.ok) {
//     let message = `Request failed with status ${res.status}`;
//     let errors: Record<string, string[]> | undefined;

//     try {
//       const errJson = await res.json();
//       if (errJson?.message) message = errJson.message;
//       if (errJson?.errors) errors = errJson.errors;
//     } catch {
//       /* ignore */
//     }

//     return {
//       data: null as any,
//       message,
//       success: false,
//       errors,
//       status: res.status,
//     } as any;
//   }

//   const json: ApiResponse<T> = await res.json();
//   logApiResponse({
//     method,
//     endpoint,
//     status: res.status,
//     response: json.data,
//   });
//   return json;
// }

// // ─── Public Request (tanpa Auth) ─────────────────────────────────────────────

// /**
//  * Request publik — tidak memerlukan token sama sekali.
//  * Cocok untuk: login, register, forgot-password, dll.
//  */
// export async function PublicRequest<T>(
//   path: string,
//   config?: RequestConfig,
// ): Promise<T> {
//   return coreFetch<T>(path, config, false);
// }

// /**
//  * Request terproteksi — menyertakan Bearer token secara otomatis.
//  * Jika access token expired (401) akan otomatis di-refresh dan di-retry.
//  */
// export async function Request<T>(
//   path: string,
//   config?: RequestConfig,
// ): Promise<T> {
//   return coreFetch<T>(path, config, true);
// }

// export async function RequestResponse<T>(
//   path: string,
//   config?: RequestConfig,
// ): Promise<ApiResponse<T>> {
//   return coreFetchResponse<T>(path, config, true);
// }

// /** GET terproteksi */
// export async function Get<T>(
//   path: string,
//   next?: NextFetchRequestConfig,
// ): Promise<T> {
//   return Request<T>(path, { method: "GET", next });
// }

// export async function GetResponse<T>(
//   path: string,
//   next?: NextFetchRequestConfig,
// ): Promise<ApiResponse<T>> {
//   return RequestResponse<T>(path, { method: "GET", next });
// }

// /** POST terproteksi */
// export async function Post<T>(path: string, data?: unknown): Promise<T> {
//   return Request<T>(path, { method: "POST", body: data });
// }

// export async function PostResponse<T>(
//   path: string,
//   data?: unknown,
// ): Promise<ApiResponse<T>> {
//   return RequestResponse<T>(path, { method: "POST", body: data });
// }

// /** PUT terproteksi */
// export async function Put<T>(path: string, data?: unknown): Promise<T> {
//   return Request<T>(path, { method: "PUT", body: data });
// }

// export async function PutResponse<T>(
//   path: string,
//   data?: unknown,
// ): Promise<ApiResponse<T>> {
//   return RequestResponse<T>(path, { method: "PUT", body: data });
// }

// /** PATCH terproteksi */
// export async function Patch<T>(path: string, data?: unknown): Promise<T> {
//   return Request<T>(path, { method: "PATCH", body: data });
// }

// export async function PatchResponse<T>(
//   path: string,
//   data?: unknown,
// ): Promise<ApiResponse<T>> {
//   return RequestResponse<T>(path, { method: "PATCH", body: data });
// }

// /** DELETE terproteksi */
// export async function Del<T>(path: string): Promise<T> {
//   return Request<T>(path, { method: "DELETE" });
// }

// export async function DelResponse<T>(path: string): Promise<ApiResponse<T>> {
//   return RequestResponse<T>(path, { method: "DELETE" });
// }

// /** POST publik (tanpa auth) — untuk login, register, dll. */
// export async function PublicPost<T>(path: string, data?: unknown): Promise<T> {
//   return PublicRequest<T>(path, { method: "POST", body: data });
// }

// export async function PublicPostResponse<T>(
//   path: string,
//   data?: unknown,
// ): Promise<ApiResponse<T>> {
//   return coreFetchResponse<T>(path, { method: "POST", body: data }, false);
// }

// /** GET publik (tanpa auth) */
// export async function PublicGet<T>(path: string): Promise<T> {
//   return PublicRequest<T>(path, { method: "GET" });
// }

// export async function PublicGetResponse<T>(
//   path: string,
// ): Promise<ApiResponse<T>> {
//   return coreFetchResponse<T>(path, { method: "GET" }, false);
// }
