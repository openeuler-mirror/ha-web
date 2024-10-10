export default [
    {
        path: "/",
        name: "index",
        component: resolve => require(["@/views/Layout/Layout"], resolve),
        meta: {
            title: "HA"
        }
    },
    {
        path: "/404",
        name: "404",
        component: resolve => require(["@/views/Error/404"], resolve),
        meta: {
            title: "404"
        }
    },
    {
        path: "/login",
        name: "login",
        component: resolve => require(["@/views/Login"], resolve),
        meta: {
            title: "login"
        }
    }
];
