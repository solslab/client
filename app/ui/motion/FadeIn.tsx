'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
	children: React.ReactNode;
};

function EnhancedFadeIn({ children }: Props) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, amount: 0.5 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
			transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
		>
			{children}
		</motion.div>
	);
}

export default EnhancedFadeIn;
