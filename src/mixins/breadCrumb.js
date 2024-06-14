export default {
    data() {
        return {
            breadList: [],
        }
    },
    created() {
        this.getBreadCrumb()
    },
    watch: {
        $route() {
            this.getBreadCrumb()
        }
    },
    methods: {
        //获取面包屑数据
        getBreadCrumb() {
            //要考虑到面包屑数据不存在的情况，因为上面要对这些数据做循环，不能是undefined
            this.breadList = this.$route.meta.bread || []
        }
    }
}