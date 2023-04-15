// Import thư viện Axios
import axios from 'axios';

// Hàm gọi API
async function CallPostApi({ url, method = 'GET', headers = {
    "Content-Type": "application/json",
    "x-api-key": "364785a87eeab143ff29a2cc2a61146c2e17a20b084d87ed4fc4152b7a2432dc2d9fe9aea84f83daf474e657b563749ef1b17b34547f88185779729cd4087330"
    // 'Content-Type': 'application/x-www-form-urlencoded',
}, body = null }
) {

    console.log(body)

    // Example POST method implementation:
    const response = await fetch('http://192.168.1.135:3000/v1/api' + url, {
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