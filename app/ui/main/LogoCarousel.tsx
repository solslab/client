'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRandomCompany } from '../../lib/data';
import { CompanyQuery } from '../../lib/definitions';
import Link from 'next/link';

const LogoCarousel: React.FC = () => {
	const [randomCompany, setRandomCompany] = useState<CompanyQuery[] | null>(null);
	
	useEffect(() => {
		fetchRandomCompany().then(setRandomCompany);
	}, []);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		initialSilde:0,
		slideToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		draggable: false,
		centerMode: false,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					variableWidth: true,
				}
			},
			{
				breakpoint: 2400,
				settings: {
					slidesToShow: 5,
				}

			}
		]
	};

	return (
		<div className="w-full overflow-hidden">
			<Slider {...settings}>
				{randomCompany?.map((company, index) => (
					<div key={index} className="  px-2 slick-slide  w-[100px]  md:w-[140px]">
						<div className='w-full flex flex-col justify-center '>
							<div className='flex w-full justify-center'>
							<Link
							href={`/company/${company.company_id}`}
							prefetch={false}
							className="flex h-[120px] w-[120px] items-center justify-center rounded-4xl border-2 md:h-[140px] md:w-[140px]"
						>
							<Image
								src={
									company.company_logo
										? company.company_logo
										: '/companyLogo/default_company_logo_white.png'
								}
								alt={`기업 로고 ${index + 1} - 몇솔`}
								width={100}
								height={100}
								objectFit="contain"
							/>

						</Link>
							</div>
						<p className="pt-[10px] text-center text-sm font-semibold">{company.company_name}</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default LogoCarousel;
