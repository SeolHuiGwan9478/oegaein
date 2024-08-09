import { API } from './api';
import useAuthStore from '@store/authStore';
import { toast } from 'react-toastify';

const makeAuthorizedRequest = async (url, method = 'get', config) => {
	try {
		let response;
		switch (method) {
			case 'get':
				response = await API.get(url);
				break;
			case 'post':
				response = await API.post(url, config);
				break;
			case 'put':
				response = await API.put(url, config);
				break;
			case 'delete':
				response = await API.delete(url, { data: config });
				break;
			case 'patch':
				response = await API.patch(url);
				break;
			default:
				throw new Error('Invalid HTTP method');
		}
		return response;
	} catch (error) {
		if (error.response && error.response.status === 403) {
			try {
				const refreshResponse = await API.get('/api/v1/member/refresh');
				setAccessToken(refreshResponse.data.access_token);
				const accessToken = useAuthStore.getState().accessToken;
				API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				return await makeAuthorizedRequest(url, method, config);
			} catch (error) {
				toast.error('로그인이 필요한 서비스입니다!');
				setTimeout(() => {
					window.location.href = 'https://oegaein.vercel.app/login';
				}, 1500);
			}
		} else {
			if (error.response) {
				const errorMessage = error.response.data?.errorMessages?.errorMessage;

				if (errorMessage) {
					toast.error(errorMessage);
				} else {
					toast.error('알 수 없는 오류가 발생했습니다.');
				}
			} else {
				toast.error('네트워크 오류가 발생했습니다.');
			}
			return error.response.data.errorMessages.errorMessage;
		}
		// throw error;
	}
};

const setAccessToken = (token) => {
	useAuthStore.getState().setAccessToken(token);
};

export { makeAuthorizedRequest };
