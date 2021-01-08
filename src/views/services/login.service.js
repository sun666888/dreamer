import axios from 'axios';
export default {
    // 登录
    login(data) {
        return axios({
            url: "/admin/v1/login",
            method: "post",
            data
        }).then();
    },

    // 登出
    loginOut() {
        return axios({
            url: "/settlement/public/index.php/api/logout",
            method: "get",
            params: {}
        }).then();
    },
}