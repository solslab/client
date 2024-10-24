'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const logos = [
	'/companyLogo/baemin.png',
	'/companyLogo/coupang.png',
	'/companyLogo/kakao.png',
	'/companyLogo/naver.png',
	'/companyLogo/wanted.png',
	'/companyLogo/citi.png'
];

const LogoCarousel: React.FC = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		draggable: false,
		centerMode: false,
		variableWidth: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					centerMode: true,
					centerPadding: '25%'
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '25%'
				}
			}
		]
	};

	return (
		<div className="w-full overflow-hidden">
			<Slider {...settings}>
				{logos.map((logo, index) => (
					<div key={index} className="px-2">
						<div className="flex h-48 w-48 items-center justify-center rounded-4xl border-2">
							<Image
								src={logo}
								alt={`Company logo ${index + 1}`}
								width={150}
								height={150}
								objectFit="contain"
							/>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default LogoCarousel;
