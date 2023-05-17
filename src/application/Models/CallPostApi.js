// Import thư viện Axios
import axios from 'axios';

// Hàm gọi API
async function CallPostApi({ url, method = 'GET', headers = {
    "Content-Type": "application/json",
    "x-api-key": "39081e3d21dc8f2c3fddaff1ae20142b0ae3a0c1849da2a3bd753ddf8db599d983b28c681972c5ecc8990f164527f5d4a0a1820240de22e80b0f61dfbdedde7d"
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