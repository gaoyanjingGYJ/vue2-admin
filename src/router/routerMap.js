//路由表 单独一个文件
export default [
    {
        path: "/",
        name: "Layout",
        component: () => import("../views/LayOut"),
        redirect: "/index",
        children: [
            {
                path: "/index",
                name: "Index",
                component: () => import("@/views/index/HomeIndex")
            },
            {
                path: "/orders",
                name: "Orders",
                redirect: "/orders/list",
                // component: { render: h => h('router-view') },//没有引入的组件时
                /*  children: [
                     {
                         path: "/orders/list",
                         name: "OrdersList",
                         component: () => import("@/views/orders/OrdersList"),
                         meta:{bread:["订单管理","订单列表"]}
                     }
                 ]  */
            },
            {
                path: "/orders/list",
                name: "OrdersList",
                component: () => import("@/views/orders/OrdersList"),
                meta: { bread: ["订单管理", "订单列表"] }
            },
            {
                path: "/waybill",
                name: "WayBill",
                // component: { render: h => h("router-view") },
                redirect: "/waybill/in",
                /*  children:[
                    {
                        path:"/waybill/in",
                        name:"WayBillIn",
                        component:()=>import("@/views/waybill/WayBillIn"),
                        meta:{bread:["运单管理","运单录入"]}

                    },
                    {
                        path:"/waybill/list",
                        name:"WayBillList",
                        component:()=>import("@/views/waybill/WayBillList"),
                        meta:{bread:["运单管理","运单列表"],keepAlive:true}
                    },
                    {
                        path:"/waybill/list/detail",
                        name:"WayBillDetail",
                        component:()=>import("@/views/waybill/WayBillDetail"),
                        meta:{bread:["运单管理","运单列表","运单详情"]}
                    }
                ]   */
            },
            {
                path: "/waybill/in",
                name: "WayBillIn",
                component: () => import("@/views/waybill/WayBillIn"),
                meta: { bread: ["运单管理", "运单录入"] }
            },
            {
                path: "/waybill/list",
                name: "WayBillList",
                component: () => import("@/views/waybill/WayBillList"),
                meta: { bread: ["运单管理", "运单列表"], keepAlive: true }
            },
            {
                path: "/waybill/list/detail",
                name: "WayBillDetail",
                component: () => import("@/views/waybill/WayBillDetail"),
                meta: { bread: ["运单管理", "运单列表", "运单详情"] }
            },
            {
                path: "/depart/data",
                name: "DepartData",
                component: () => import("@/views/Depart/DepartData"),
                meta: { bread: ["发车管理", "发车数据单"] }
            },
            {
                path: "/carrier/list",
                name: "CarrierList",
                component: () => import("@/views/carrier/CarrierList"),
                meta: { bread: ["承运商管理", "承运商列表"] }
            },
            {
                path: "/carrier/trucks",
                name:"CarrierTrucks",
                component:()=>import("@/views/carrier/CarrierTrucks"),
                meta:{bread:['承运商管理','车辆列表']}
            },
            {
                path:"/carrier/driver",
                name:"CarrierDriver",
                component:()=>import("@/views/carrier/CarrierDriver"),
                meta:{bread:['承运商管理','承运司机列表']}
            },{
                path:"/customer",
                name:"Customer",
                component:()=>import("@/views/customer/CustomerView"),
            },{
                path:"/finance/customer",
                name:"FinanceCustomer",
                component:()=>import("@/views/finance/FinanceCustomer"),
                meta:{bread:['财务管理','客户对账单']}
            },{
                path:"/finance/carrier",
                name:"FinanceCarrier",
                component:()=>import("@/views/finance/FinanceCarrier"),
                meta:{bread:['财务管理','承运商对账单']}
            },{
                path:"/finance/driver",
                name:"FinanceDriver",
                component:()=>import("@/views/finance/FinanceDriver"),
                meta:{bread:['财务管理','承运司机对账单']}
            },{
                path:"/personal",
                name:"Personal",
                component:()=>import("@/views/personal/MyPersonal"),
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginView")
    },
    /* {
        path: "*",
        name: "NotFound",
        component: () => import("@/views/NotFound")
    } */
]