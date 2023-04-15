import axios from 'axios';

// Tạo một instance của Axios
const api = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330"

    },
});

// Tạo interceptor để kiểm tra token trước khi gửi yêu cầu
api.interceptors.request.use(
    async (config) => {
        // Kiểm tra token có hết hạn hay không
        if (isTokenExpired()) {
            // Gọi lại token mới và cập nhật vào config.headers
            const newToken = await getNewToken(); // Hàm lấy token mới từ máy chủ
            config.headers.Authorization = `Bearer ${newToken}`; // Cập nhật token mới vào header Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Tạo interceptor để xử lý phản hồi từ máy chủ
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Kiểm tra mã trạng thái phản hồi từ máy chủ
        if (error.response && error.response.status === 401) {
            // Nếu mã trạng thái là 401 (Unauthorized), tức là token đã hết hạn
            // Gọi lại token mới và cập nhật vào config.headers
            const newToken = await getNewToken(); // Hàm lấy token mới từ máy chủ
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`; // Cập nhật token mới vào header Authorization
            // Thực hiện lại yêu cầu với token mới đã được cập nhật
            return api(error.config);
        }
        return Promise.reject(error);
    }
);

// Hàm kiểm tra token đã hết hạn
function isTokenExpired() {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330",
            "authorization": jwtString,
            "x-client-id": id
        }
    };
    // Viết mã kiểm tra token đã hết hạn
    fetch('http://192.168.1.135:3000/v1/api/product/get', requestOptions)
        .then((data) => {
            return data.json()
        })
        .then(data => {
            setApi(data)
            console.log({ data })

            if (data.status === 200) {
                console.log(data)
                return;
            };
        })
}

// Hàm lấy token mới
async function getNewToken() {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330",
            "refeshToken": data.metadata.tokens.refeshToken,
            "x-client-id": id
        }
    };

    // Viết mã gọi lại token mới từ máy chủ
    fetch('http://192.168.1.135:3000/v1/api/handlerRefreshToken', requestOptions)
        .then(data => {
            return data.json()
        })
        .then(data => {
            console.log(data)
            AsyncStorage.setItem('accessToken', JSON.stringify(data.metadata.tokens.accessToken));
        })
        .catch(err => {
            console.log(err)
        })

}