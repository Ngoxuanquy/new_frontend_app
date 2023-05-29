// Import thư viện Axios
import axios from 'axios';

// Hàm gọi API
async function CallPostApi({ url, method = 'GET', headers = {
    "Content-Type": "application/json",
    "x-api-key": "d420e946ae282dfadafede6b060ae66e3ffd2a9cddfe3dc9b4cd070f98ad4985aeab65e2751677f21f91f34c2a22a1f95bf0b330fd2eb0dfb2c1fb53a7c8d97a"
    // 'Content-Type': 'application/x-www-form-urlencoded',
}, body = null }
) {

    console.log(body)

    // Example POST method implementation:
    const response = await fetch('http://192.168.1.101:3000/v1/api' + url, {
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