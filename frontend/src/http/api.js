import axios from "axios";

// product 和 dev分开
axios.defaults.baseURL = "/api";
axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

// 请求拦截器
axios.interceptors.request.use(config => {
	// 添加token
	if (localStorage.token) {
		config.headers.Authorization = localStorage.token;
	}
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
