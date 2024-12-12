'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRandomCompany } from '../lib/data';
import { CompanyQuery } from '../lib/definitions';
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
				{randomCompany?.map((company, index) => (
					<div key={index} className="flex flex-col items-center justify-between px-2">
						<Link
							href={`/company/${company.company_id}`}
							className="flex h-[120px] w-[120px] items-center justify-center rounded-4xl border-2 md:h-[140px] md:w-[140px]"
						>
							<Image
								src={company.company_logo?company.company_logo:'/companyLogo/default_company_logo.png'}
								alt={`Company logo ${index + 1}`}
								width={100}
								height={100}
								objectFit="contain"
							/>
						</Link>
						<p className="pt-[10px] text-center text-sm font-semibold">{company.company_name}</p>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default LogoCarousel;
