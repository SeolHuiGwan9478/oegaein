import BasicInfoButton from '@common/button/BasicInfoButton';
import Cleaning from '@components/basicInfo/Cleaning';
import Introduce from '@components/basicInfo/Introduce';
import Lifepattern from '@components/basicInfo/Lifepattern';
import Mbti from '@components/basicInfo/Mbti';
import Nickname from '@components/basicInfo/Nickname';
import Outing from '@components/basicInfo/Outing';
import Profile from '@components/basicInfo/Profile';
import Sleephabits from '@components/basicInfo/Sleephabits';
import Smoking from '@components/basicInfo/Smoking';
import Sound from '@components/basicInfo/Sound';
import COLOR from '@styles/color';
import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import SettingHeader from '@common/header/SettingHeader';

const BasicInfoSetting = () => {
	const [activeButton, setActiveButton] = useState(true);
	const [count, setCount] = useState(1);
	const [info, setInfo] = useState({
		nickname: '',
		gender: '',
		studentId: 0,
		birth: [''],
		introduce: '',
		mbti: '',
		sleephabits: '',
		lifepattern: '',
		smoking: null,
		cleaning: '',
		outing: '',
		sound: '',
	});

	console.log(info);

	const step = [
		{ id: 1, step: 'nickname', title: '닉네임을 입력해 주세요' },
		{ id: 2, step: 'profile', title: '프로필을 완성해 주세요' },
		{ id: 3, step: 'introduce', title: '나를 한 줄로 소개해 주세요' },
		{ id: 4, step: 'mbti', title: '나의 MBTI를 입력해 주세요' },
		{ id: 5, step: 'sleephabit', title: '평소 수면 습관을 체크 해주세요' },
		{ id: 6, step: 'lifepattern', title: '평소 생활 패턴을 알려주세요' },
		{ id: 7, step: 'smoking', title: '흡연 여부를 선택해 주세요' },
		{ id: 8, step: 'cleaning', title: '평소 청소 주기를 선택해 주세요' },
		{ id: 9, step: 'outing', title: '외출을 얼마나 자주 하시나요?' },
		{ id: 10, step: 'sound', title: '소리에 예민하신 편인가요?' },
	];

	const handleBack = () => {
		setCount((prev) => prev - 1);
		setActiveButton(true);
	};

	const handleNext = () => {
		setCount((prev) => prev + 1);
		setActiveButton(true);
	};

	const handleNickname = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			nickname: value,
		}));
	};

	const handleProfile = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			gender: value.gender,
			studentId: value.studentId,
			birth: value.birth,
		}));
	};

	const handleIntroduce = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			introduce: value,
		}));
	};

	return (
		<>
			<SettingStyle>
				{count >= 1 && count <= 3 ? (
					<SettingHeader backPath={false} eventName={handleBack} />
				) : (
					<SettingHeader
						backPath={false}
						eventName={handleBack}
						rightBtn={handleNext}
					/>
				)}
				<section className="flex flex-col items-center mb-6">
					<div className="countbox">{count}</div>
					<p className="category">
						{count >= 1 && count <= 3 ? '기본 정보' : '라이프 스타일'}
					</p>
					<p className="direction">{step[count - 1].title}</p>
				</section>
				<section className="flex flex-col items-center w-full">
					{count === 1 && (
						<Nickname onGetValue={handleNickname} setButton={setActiveButton} />
					)}
					{count === 2 && (
						<Profile onGetValue={handleProfile} setButton={setActiveButton} />
					)}
					{count === 3 && (
						<Introduce
							onGetValue={handleIntroduce}
							setButton={setActiveButton}
						/>
					)}
					{count === 4 && <Mbti />}
					{count === 5 && <Sleephabits />}
					{count === 6 && <Lifepattern />}
					{count === 7 && <Smoking />}
					{count === 8 && <Cleaning />}
					{count === 9 && <Outing />}
					{count === 10 && <Sound />}
				</section>
				<BasicInfoButton
					text={count >= 1 && count <= 3 ? '다음' : '알려주고 싶지 않아요'}
					path={count === 10 ? '/home' : ''}
					eventName={handleNext}
					disabled={activeButton}
				/>
			</SettingStyle>
		</>
	);
};

export default BasicInfoSetting;

const SettingStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 62px 30px 45px 30px;

	.countbox {
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: ${COLOR.purple2};
		font-size: 15px;
	}

	.category {
		font: ${FONT.caption1SB14};
		margin-bottom: 32px;
	}

	.direction {
		font: ${FONT.body2SB16};
	}
`;
