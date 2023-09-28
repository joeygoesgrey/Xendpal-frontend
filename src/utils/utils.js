// import React from 'react';
import CryptoJS from 'crypto-js';

import axios from 'axios';

const API_BASE_URL = 'http://169.255.58.22'; // Your API base URL
const codeKey = process.env.REACT_APP_CODE_KEY;

async function getNewAccessToken(refreshToken) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, {
            refresh_token: refreshToken,
        });

        // Extract the new access token
        const newAccessToken = response.data.access_token;

        // Return or do something with the new access token
        return newAccessToken;
    } catch (error) {
        console.error('An error occurred while refreshing the token:', error);
        // Handle the error as needed
        return null;
    }
}


function isTokenExpired(jwtToken) {
    // Split the token into its parts: header, payload, signature
    const parts = jwtToken.split('.');

    // Take the payload part, and decode it from base64
    const decoded = atob(parts[1]);

    // Parse it as a JSON object
    const payload = JSON.parse(decoded);

    // Get the expiration time from the payload (it's usually named 'exp')
    const expirationTime = payload.exp; // This is in UNIX epoch format (seconds)

    // Get the current time in UNIX epoch format (seconds)
    const currentTime = Math.floor(Date.now() / 1000); // Date.now() returns milliseconds

    // Compare the current time with the expiration time
    if (currentTime >= expirationTime) {
        return true; // The token has expired
    } else {
        return false; // The token is still valid
    }
}


function decrypt(ciphertext, key = codeKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}


async function clearAllStorages() {
    return new Promise((resolve, reject) => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            resolve("Success");
        } catch (error) {
            reject("An error occurred while clearing storage: " + error);
        }
    });
}


async function retrieveDataFromSession(key = 'access_token') {
    try {
        // Get the data from local storage
        const encryptedSessionData = localStorage.getItem(key);

        if (!encryptedSessionData) {
            return false;
        }

        // Decrypt once and use throughout
        const sessionData = decrypt(encryptedSessionData, codeKey);

        // Check token expiration
        if (isTokenExpired(sessionData)) {
            const encryptedRefreshToken = localStorage.getItem('refresh_token');

            if (!encryptedRefreshToken) {
                return false;  // No refresh token available
            }

            const refreshToken = decrypt(encryptedRefreshToken, codeKey);

            // Asynchronously get a new access token
            const newAccessToken = await getNewAccessToken(refreshToken);

            if (!newAccessToken) {
                return false;  // Failed to refresh token
            }

            // Encrypt and store the new access token
            const encryptedNewAccessToken = encrypt(newAccessToken, codeKey);
            localStorage.setItem(key, encryptedNewAccessToken);

            return newAccessToken;
        }
        return sessionData;

    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}


const token = await retrieveDataFromSession("access_token")
function encrypt(message, key = codeKey) {
    const ciphertext = CryptoJS.AES.encrypt(message, key);
    return ciphertext.toString();
}


const storeDataInSession = (key = 'access_token', data) => {
    localStorage.setItem(key, data);
};

function bytesToGB(bytes) {
    return bytes / Math.pow(1024, 3) + " GB";
}

function bytesToMBorGB(bytes) {
    const kilobytes = bytes / Math.pow(1024, 1); // 1024 bytes = 1 KB
    const megabytes = bytes / Math.pow(1024, 2); // 1024^2 bytes = 1 MB
    const gigabytes = bytes / Math.pow(1024, 3); // 1024^3 bytes = 1 GB

    if (gigabytes >= 1) {
        return gigabytes.toFixed(2) + " GB";
    } else if (megabytes >= 1) {
        return megabytes.toFixed(2) + " MB";
    } else {
        return kilobytes.toFixed(2) + " KB";
    }
}

const deleteUpload = async (uploadId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/file/delete_upload/${uploadId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
        });

        if (!response.ok) {
            throw new Error('An error occurred while deleting the folder');
        }

        // const data = await response.json();
    } catch (error) {
        console.error(error);
    }
};


const getuserinfo = async () => {
    try {
        // Send the code to the desired API endpoint
        const response = await fetch(`${API_BASE_URL}/user/info`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        sessionStorage.setItem('name', data?.name);
        sessionStorage.setItem('picture', data?.picture);
        sessionStorage.setItem('space', data?.space);
        sessionStorage.setItem('max_space', data?.max_space);

        return data;

    } catch (error) {
        // Handle any errors here, such as showing an error message
        console.error(error);
    }
};


const getUserItems = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
            },
        };

        // Make a GET request to the "/user_items" endpoint
        const response = await axios.get(`${API_BASE_URL}/file/user_items`, config);

        // Handle the response as needed
        return response.data
    } catch (error) {
        console.error('An error occurred while fetching user items:', error);
    }
};


const shareUpload = async (payload) => {
    try {
        // Set up your headers
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Make the POST request using Axios
        const response = await axios.post(`${API_BASE_URL}/file/share-upload`, payload, {
            headers: headers
        });

        // If the request is successful, the status would be 200 or 201
        if (response.status === 200 || response.status === 201) {
            return `Item has been shared to ${payload.recipient_email}`;
        }
    } catch (error) {
        // Handle the error
        if (error.response) {
            const { status } = error.response;
            if (status === 404) {
                return "You do not have the appropriate permission to share this item";
            } else {
                return `An error occurred: ${status}`;
            }
        } else {
            console.error("There was an error sharing the upload:", error);
            return "Network error. Please try again.";
        }
    }
};



async function fetchUserHistory() {
    try {
        const apiUrl = `${API_BASE_URL}/user/history`; // Replace with your API endpoint URL

        // Set up headers with the authentication token if required
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(apiUrl, { headers });

        // Check if the response status is 200 (OK)
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching user history:', error.message);
        throw error; // You can handle the error as needed in your application
    }
}

const getyearlyUsage = async () => {
    try {
        // Replace with your actual API URL and endpoint
        const apiUrl = `${API_BASE_URL}/user/get-yearly-usage`;

        // If you're using a token for authentication, include it in the headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(apiUrl, config);

        if (response.status === 200) {
            const Usage = response.data
            return Usage;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

export {
    API_BASE_URL,
    token,
    getUserItems,
    getyearlyUsage,
    deleteUpload,
    bytesToMBorGB,
    fetchUserHistory,
    bytesToGB,
    getuserinfo,
    storeDataInSession,
    encrypt,
    decrypt,
    retrieveDataFromSession,
    clearAllStorages,
    shareUpload,
};

