'use client';

interface BlurOverlayProps {
	children: React.ReactNode;
}

export default function BlurOverlay({ children }: BlurOverlayProps) {
	return (
		<div className="relative">
			{children}
			<div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] pointer-events-none"></div>
		</div>
	);
} 