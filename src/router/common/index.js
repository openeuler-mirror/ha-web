export default [
    {
        path: "/",
        name: "index",
        component: resolve => require(["@/components/Homepage"], resolve),
        meta: {
            title: "HA"
        }
    },
    {
        path: "/404",
        name: "404",
        component: resolve => require(["@/components/404"], resolve),
        meta: {
            title: "404"
        }
    },
    {
        path: "/login",
        name: "login",
        component: resolve => require(["@/components/Layout/Login/Login"], resolve),
        meta: {
            title: "404"
        }
    }
];
