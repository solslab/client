import Image from 'next/image';
import Link from 'next/link';
import NavBtn from './navBtn';
import InteractiveLink from './InteractiveLink';

export default function Topnav() {
	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white shadow">
				<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="flex flex-1 items-stretch justify-start">
							<Link href="/" className="flex flex-shrink-0 items-center">
								<Image
									width={48}
									height={24}
									className="hidden sm:block"
									src="/icons/logo_light.png"
									alt="Sols"
								/>
								<Image
									width={48}
									height={48}
									className="block h-auto w-auto sm:hidden"
									src="/icons/mobile_logo.png"
									alt="Sols"
								/>
							</Link>
							<div className="hidden sm:ml-6 sm:block md:ml-32">
								<div className="flex space-x-4">
									<InteractiveLink href="/company">전체기업</InteractiveLink>
								</div>
							</div>
						</div>
						<NavBtn />
					</div>
				</div>
			</nav>
			{/* <div className="h-16 w-full flex-none" /> */}
		</>
	);
}
