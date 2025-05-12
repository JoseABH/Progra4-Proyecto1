import axios from 'axios';

const BIN = '6821a0d88561e97a5012300a';
const USERS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = '$2a$10$/QleYdFWb/9K4gXxgb7Q8ezciNlUu8KD97Le3g1LEPaFucalVccQe';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(USERS_API_URL, {
            headers: {
                'X-Access-Key': API_KEY
            }
        });
        return response.data.record; 
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};
