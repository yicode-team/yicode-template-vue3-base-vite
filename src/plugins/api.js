import Vue from "vue";
import axios from "axios";
import _ from "lodash";
import md5 from "blueimp-md5";
import $Storage from "@/plugins/storage.js";
import { Message } from "element-ui";
// =============================================
// TODO: 将无效参数的过滤封装到这里，由用户进行控制
// TODO: 此处封装统一弹框
let request = axios.create({
    method: "get",
    baseURL: import.meta.env.VITE_HOST,
    timeout: 1000 * 60,
    withCredentials: false,
    responseType: "json",
    responseEncoding: "utf8",
    // maxContentLength: 2000,
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
    },
    // transformRequest: [
    //     function (data, headers) {
    //         console.log('headers=================');
    //         console.log(headers);
    //         if (data) {
    //             data.t = Date.now();
    //         } else {
    //             data = {};
    //             data.t = Date.now();
    //         }
    //         return JSON.stringify(data);
    //     }
    // ]
});
// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        try {
            /**
             * 请求拦截，以下仅为示例，请根据项目需求调整。
             * 在发送请求之前做些什么
             */
            if (config.method === "get") {
                if (!config.params) {
                    config.params = {};
                }
                config.params.t = Date.now();

                let fieldsArray = [];
                _.forOwn(config.params, (value, key) => {
                    fieldsArray.push(`${key}=${value}`);
                });

                let fieldsSort = fieldsArray.sort().join("&");

                let fieldsMd5 = md5(fieldsSort);
                config.params.sign = fieldsMd5;
            }
            if (config.method === "post") {
                if (!config.data) {
                    config.data = {};
                }
                config.data.t = Date.now();

                let fieldsArray = [];
                _.forOwn(config.data, (value, key) => {
                    fieldsArray.push(`${key}=${value}`);
                });

                let fieldsSort = fieldsArray.sort().join("&");

                let fieldsMd5 = md5(fieldsSort);
                config.data.sign = fieldsMd5;
            }

            let token = $Storage.session.get("token");
            if (token) {
                config.headers.authorization = "Bearer " + token;
            }

            return config;
        } catch (err) {
            console.log("interceptors.request");
            console.log(err);
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    function (res) {
        if (res.data.code === 0) {
            return Promise.resolve(res.data);
        }

        // 无效的令牌
        if (res.data.symbol === "NOT_LOGIN") {
            location.href = "#/login";
        }

        return Promise.reject(res.data);
    },
    function (error) {
        Message({
            type: "error",
            duration: 5000,
            message: error?.response?.data?.message,
        });
    }
);

// 将接口挂载到 Vue 实例，使用 this.$Api({url:'test.com'}).then(res => {}) 调用接口。
Vue.prototype.$Api = request;
export default request;
