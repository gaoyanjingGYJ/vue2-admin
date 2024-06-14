//使用mock模拟接口
import Mock from "mockjs"

// 模拟网络请求延时  由于实际场景中请求时需要时间的，为了模拟真实一些，我们手动设置一下延迟时间 
Mock.setup({
    timeout: 500
})

// Mock.mock("请求地址","请求方式","回调函数")

//登录接口
Mock.mock("http://localhost:8080/login", "post", (req) => {
    const { username, password } = JSON.parse(req.body)
    if (username == "admin" && password == 123456) {
        return {
            code: 200,
            success: true,
            message: "登录成功",
            token: "3arc9h0vhcr0f8iprpnscmfo8s",//token在登陆成功之后服务器会返回一个token令牌，之后每次发出请求的时候都要带上令牌
            nickname: "赵铁柱",//昵称
            role: "administration"
        }
    } else {
        return {
            code: 100,
            success: false,
            message: "账号或密码有误"
        }
    }
})

//入职日期接口
Mock.mock("http://localhost:8080/entry", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        time: "2020-07-01 00:00:00"
    }
})

//菜单接口  希望前端路由用路径 需要跟后端沟通url icon 

const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/orders",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/orders/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/driver",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/finance",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/finance/customer",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/finance/carrier",
            },
            {
                name: "承运司机对账单",
                icon: "el-icon-bank-card",
                url: "/finance/driver",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
Mock.mock("http://localhost:8080/menu", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: menuList
    }
})

//盈利 订单量 成交吨数 新用户 数据交易接口
Mock.mock("http://localhost:8080/deal", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: [{
            num: "￥824,197",
            rate: "+20.12%",
        }, {
            num: "235,447",
            rate: "+1.25%",
        }, {
            num: "1287,038",
            rate: "+11.48%",
        }, {
            num: 228,
            rate: "-2.06%"
        }]
    }
})

//折线图接口
Mock.mock("http://localhost:8080/line", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: {
            "1月": 4000,
            "2月": 8200,
            "3月": 3900,
            "4月": 7000,
            "5月": 3800,
            "6月": 9800,
            "7月": 3700,
        }
    }
})

//饼图接口
Mock.mock("http://localhost:8080/pie", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: [
            { value: 700, name: "Search Engine" },
            { value: 800, name: "Union Ads" },
            { value: 580, name: "Email" },
            { value: 325, name: "Direct" },
            { value: 3500, name: "Video Ads" },
        ],
    }
})

//操作日志接口
Mock.mock("http://localhost:8080/log", "get", () => {
    return {
        code: 200,
        success: true,
        message: "请求成功",
        data: [
            {
                date: "2020/07/01",
                operation: "审核订单",
                name: "李红",
                time: "08:54"
            },
            {
                date: "2020/07/01",
                operation: "新增贷款",
                name: "王小虎",
                time: "11:24"
            },
            {
                date: "2020/07/01",
                operation: "新增渠道",
                name: "张浩",
                time: "15:32"
            }
        ]
    }
})


// //订单管理-订单列表
Mock.mock('http://localhost:8080/orderList', 'post', (req) => {
    const { page, pageSize, keyword } = JSON.parse(req.body);
    console.log("接口接收到参数:", page, pageSize, keyword)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            // 随机生成pageSize条数据
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//订单号
                'status|1': [1, 2, 3, 4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司", "辉华股份有限公司", "川聚物流有限公司", "成越材料有限公司", "聚博纺织有限公司"],//客户名称
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                'cargo|1': ["日用品", "纺织品", "生鲜", "建材", "电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'unit|1': ["方", "吨"],//单位
                "price": Mock.Random.integer(5000, 50000),//运费
                "from|1": ["移动端", "pc端"],//订单来源
                "pay|1": [1, 2],//是否支付 1 已支付 2未支付     
            }],
            "total": 47
        })
    }
})
// //订单管理-新建订单
Mock.mock('http://localhost:8080/addOrder', "post", (req) => {
    const { name, start, end, cargo, count, unit, price, from, pay } = JSON.parse(req.body);
    // 后端拿到数据之后往数据库中存
    console.log("新建订单接口收到参数:", name, start, end, cargo, count, unit, price, from, pay)
    return {
        code: 200,
        success: true,
        message: "新建成功",
    }
})
//运单管理-运单列表
Mock.mock('http://localhost:8080/waybillList', 'post', (req) => {
    const { page, pageSize, waybillNo, name, startDate, endDate, status } = JSON.parse(req.body);
    console.log("服务端接收到参数", page, pageSize, waybillNo, name, startDate, endDate, status)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//运单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司", "辉华股份有限公司", "川聚物流有限公司", "成越材料有限公司", "聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品", "纺织品", "生鲜", "建材", "电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price": Mock.Random.integer(5000, 50000),//运费
                "needRecive|1": [1, 2],//需要接货 1需要 2不需要
                'plateNumber|1': ["京A12345", "苏C66666", "鲁B45678"],//车牌号
                "driver": Mock.Random.cname(),
                "tel|1": [18888888888, 15577896554, 15789654785, 13698745269],
                "percent|1": [37, 22, 89, 65, 80, 74, 56]

            }],
            "total": 47
        })
    }
})
//运单管理-运单录入
Mock.mock('http://localhost:8080/waybillIn', "post", (req) => {
    const { name, id, unit, date1, date2, delivery, address, carriage, desc } = JSON.parse(req.body)
    console.log("运单录入接口接到参数：", name, id, unit, date1, date2, delivery, address, carriage, desc)
    return {
        code: 200,
        success: true,
        message: "录入成功",
    }
})
//根据token获取role
Mock.mock('http://localhost:8080/getRole', 'get', () => {
    return {
        code: 200,
        message: "请求成功",
        success: true,
        role: "administration"
    }
})
//发车管理-发车数据单
Mock.mock("http://localhost:8080/departData", "post", (req) => {
    const { page, pageSize, search1, search2, search3, search4, search5, search6 } = JSON.parse(req.body);
    console.log("发车数据单接口接收到参数", page, pageSize, search1, search2, search3, search4, search5, search6)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'num|1': [876562, 59845, 25651, 47854],//编号id
                'shortname': "山东运输",//简称
                "permit|1": ["D3526854565125", "S585852126541", "T5854565123585"],//道路许可证
                'linkman|1': ["张三/18856565656", "李四/12345678911", "王五/17523698451"],//联系人/电话
                "type|1": ['自有车', "公有车"],//类型
                'time': Mock.Random.date(),//注册时间
                'name': "山东运输有限公司",//承运商名称
                'code|1': [0, 1],//信用代码 有1 无0
                'address': "山东青岛",//注册地址
                'report|1': [0, 1],//是否上报  0否 1是
                'credit|1': [90, 85, 70, 99, 75],//信用分
            }],
            "total": 47
        })
    }
})
//客户管理
Mock.mock("http://localhost:8080/customer", 'post', (req) => {
    const { nick, id, tel, company, business, authentication, page, pageSize } = JSON.parse(req.body)
    console.log("客户管理收到参数：", page, pageSize, nick, id, tel, company, business, authentication)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//id
                'nick': "山运集团",//用户昵称
                'company': "山东运输集团",//所属公司
                'business|1': ['纺织品出口', "日用品出口", "生鲜出口", "建材出口", "电器出口"],//主营业务
                'account|1': [10860, 85985, 4585, 685455],//账户余额
                'authentication|1': [0, 1],//认证状态 0未认证 1已认证
                'mile|1': ['25000公里', '1800公里', '3000公里', '10000公里'],//运输里程数
                'name|1': ["李航华", "张天宇", "韩信人", "刘华"],//联系人
                'tel|1': ["15856859854", "15252525361", "18457455691", "15896235124"],//联系电话
                'address': "北京市朝阳区",//公司地址
                'credit|1': [5874532014587456, 5874569874203651, 4758963201478523],//银行卡号
            }],
            "total": 47
        })
    }
})
//财务管理-客户对账单
Mock.mock("http://localhost:8080/financeCustomer", "post", (req) => {
    const { page, pageSize, name, time, billStatus } = JSON.parse(req.body)
    console.log("客户对账单收到参数：", page, pageSize, name, time, billStatus)
    return{
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|1':["2022020202154","2022032558545","2023072515485"],//对账单号
                "time":Mock.Random.date(),//账单时间
                "name|1":['张三','李四','王文永'],//付款对象
                'billStatus|1':[1,2,3],//账单状态 1未对账 2核对中 3已对账
                "payStatus|1":[0,1],//开票状态 0未开票 1已开票
                'expend|1':[20000,5210,58451,6521,52120],//总支出金额
                'errorStatus|1':[0,1],//异常状态 0否 1是
                'time2':Mock.Random.date(),//创建时间
                'operator|1':['刘九零','王未','赵韩寒'],//创建人
            }],
            "total": 47
        })
    }
})