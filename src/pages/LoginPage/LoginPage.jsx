import React from 'react';
import { Link } from 'react-router-dom';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '@assets/lottie/로그인/login.json';
import GoogleIcon from '../../assets/images/google-icon.svg';
const LoginPage = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	const CLIENT_ID = process.env.CLIENT_ID;
	const REDIRECT_URL = process.env.REDIRECT_URL;
	return (
		<>
			<div className="px-[35px] mt-[65px] mb-[62px] flex flex-col">
				<StyledTitle className="self-start mb-[16px]">
					학교 구글 계정으로 로그인 해주세요
				</StyledTitle>
				<StyledBodyText
					className="self-start mb-[105px]"
					style={{ color: COLOR.gray500 }}
				>
					일반 구글 계정으로는 로그인이 불가능합니다.
				</StyledBodyText>
				<Lottie options={defaultOptions} width={270} height={279} />
			</div>
			<div className="flex items-center justify-center mb-[55px] w-full">
				<hr className="border-t w-1/3 mx-3" />
				<StyledCaption>간편 로그인</StyledCaption>
				<hr className="border-t w-1/3 mx-3" />
			</div>
			<div className="px-[35px]">
				<Link
					to={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`}
					style={{ borderColor: COLOR.gray200 }}
					className="border w-full h-[50px] rounded-[5px] flex items-center px-[23px] shadow-[1px_1px_4px_rgba(0,0,0,0.25)] hover:opacity-20"
				>
					<img
						className="mr-[60px]"
						src={GoogleIcon}
						alt="구글 로그인 아이콘"
					/>
					<StyledButtonText>Google로 계속하기</StyledButtonText>
				</Link>
			</div>
		</>
	);
};

export default LoginPage;

const StyledTitle = styled.p`
	font: ${FONT.title3B19};
`;

const StyledBodyText = styled.p`
	font: ${FONT.body5M15};
`;
const StyledCaption = styled.span`
	font: ${FONT.caption1SB14};
`;
const StyledButtonText = styled.button`
	font: ${FONT.buttonSB15};
`;
