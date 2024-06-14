//异步路由表，需要权限的页面
export default[
    {
        path:"/attendance",//考勤
        name:"Attendence",
        // 使用meta来标记给谁用的
        meta:{auth:["boss","administration"]},
        component:()=>import("@/views/AuthView/AuthAttendance")
    },
    {
        path:"/salary",//工资
        name:"Salary",
        meta:{auth:["boss","finance"]},
        component:()=>import("@/views/AuthView/AuthSalary")
    },
    {
        path: "*",
        name: "NotFound",
        meta:{auth:["boss","finance","administration","user"]},
        component: () => import("@/views/NotFound")
    }
]