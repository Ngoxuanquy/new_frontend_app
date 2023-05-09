// Import thư viện Axios
import axios from 'axios';

// Hàm gọi API
async function CallPostApi({ url, method = 'GET', headers = {
    "Content-Type": "application/json",
    "x-api-key": "a9ae60c5abf0771d5cfc763a143bd796723733b7d2fa537e940dbad50edfcf1bf0f8d25096264293e2d9deb9df2515a241bedda3045777be6ebc38c35c3ac141"
    // 'Content-Type': 'application/x-www-form-urlencoded',
}, body = null }
) {

    console.log(body)

    // Example POST method implementation:
    const response = await fetch('http://192.168.0.102:3000/v1/api' + url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body),
        // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export default CallPostApi;