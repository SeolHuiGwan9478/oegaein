import axios from 'axios';
import useAuthStore from '@store/authStore';

const accessToken = useAuthStore.getState().accessToken;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
const BASE_URL = process.env.BASE_URL;
export const API = axios.create({
	baseURL: BASE_URL,
	// baseURL: '',
});
