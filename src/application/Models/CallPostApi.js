// Import thư viện Axios
import axios from 'axios';

// Hàm gọi API
async function CallPostApi({ url, method = 'GET', headers = {
    "Content-Type": "application/json",
    "x-api-key": "a3c3c520c39c95288cb353da5328ee89d87c7928d2f9013b66f66832ab3a2c90f849222cce7ff73b811041231c8cd0b2778ef206ac825571cabab7cd8fd99b3a"
    // 'Content-Type': 'application/x-www-form-urlencoded',
}, body = null }
) {

    console.log(body)

    // Example POST method implementation:
    const response = await fetch('http://192.168.11.232:3000/v1/api' + url, {
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