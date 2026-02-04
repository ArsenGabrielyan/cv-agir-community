/**
 * An array of routes that are accessible to public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
     "/",
     "/about",
     "/contact",
     "/faq",
     "/auth/new-verification",
     "/templates",
     "/cv/"
]

/**
 * An array of dynamic routes that are accessible to public.
 * These routes do not require authentication.
 * @type {RegExp[]}
 */
export const dynamicRoutes: RegExp[] = [
     /^\/cv\/[^/]+$/,
     /^\/demos\/[^/]+$/,
]

/**
 * The prefix for API authentication routes.
 * Routes that started with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard"