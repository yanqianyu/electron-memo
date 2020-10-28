import axios from "axios";

// product 和 dev分开

axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

// 请求拦截器
axios.interceptors.request.use(config => {
	// 暂时没有token
	return config;
}, error => {
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
	return response;
}, error => {
	return Promise.reject(error);
});

export default axios;
