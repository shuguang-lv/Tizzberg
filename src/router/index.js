import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress'

Vue.use(VueRouter)

const AV = require('leancloud-storage')
const checkLoginState = AV.User.current

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('../views/_loading.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('../views/_timeout.vue').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}

const fetchUser = (routeTo, routeFrom, next) => {
  store
    // Try to fetch the user's information by their username
    .dispatch('users/fetchUser', { username: routeTo.params.username })
    .then((user) => {
      // Add the user to `meta.tmp`, so that it can
      // be provided as a prop.
      routeTo.meta.tmp.user = user
      // Continue to the route.
      next()
    })
    .catch(() => {
      // If a user with the provided username could not be
      // found, redirect to the 404 page.
      next({ name: '404', params: { resource: 'User' } })
    })
}

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 't-square' },
  },
  {
    path: '/t-square',
    name: 't-square',
    component: () => lazyLoadView(import('../views/t-square.vue')),
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => lazyLoadView(import('../views/explore.vue')),
  },
  {
    path: '/topic-detail/:id',
    name: 'topic-detail',
    component: () => lazyLoadView(import('../views/topic-detail.vue')),
  },
  {
    path: '/fiction',
    name: 'fiction',
    component: () => lazyLoadView(import('../views/fiction.vue')),
  },
  {
    path: '/fiction-content',
    name: 'fiction-content',
    component: () => lazyLoadView(import('../views/fiction-content.vue')),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => lazyLoadView(import('../views/chat.vue')),
    meta: {
      authRequired: true,
    },
    props: () => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => lazyLoadView(import('../views/signup.vue')),
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('../views/login.vue')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (checkLoginState()) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => lazyLoadView(import('../views/profile.vue')),
  //   meta: {
  //     authRequired: true,
  //   },
  //   props: () => ({ user: store.state.auth.currentUser || {} }),
  // },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => lazyLoadView(import('../views/explore.vue')),
    meta: {
      authRequired: false,
      // HACK: In order to share data between the `beforeResolve` hook
      // and the `props` function, we must create an object for temporary
      // data only used during route resolution.
      tmp: {},
      beforeResolve: fetchUser,
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: (route) => ({ user: route.meta.tmp.user }),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => lazyLoadView(import('../views/reset-pwd.vue')),
    meta: {
      authRequired: true,
    },
    props: () => ({ user: store.state.auth.currentUser || {} }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('../views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

const router = new VueRouter({
  routes,
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // If this isn't an initial page load...
  if (routeFrom.name !== null) {
    // Start the route progress bar.
    NProgress.start()
  }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  // If auth is required and the user is logged in...
  if (checkLoginState()) {
    // Validate the local user token...
    return store.dispatch('auth/validate').then((validUser) => {
      // Then continue if the token still represents a valid user,
      // otherwise redirect to login.
      validUser ? next() : redirectToLogin()
    })
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin()

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: 'login', query: { redirectFrom: routeTo.fullPath } })
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (routeFrom.name === args[0].name) {
                // Complete the animation of the route progress bar.
                NProgress.done()
              }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
