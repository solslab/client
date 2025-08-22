import Image from 'next/image';

export default function Select({
	id,
	name,
	required,
	children
}: {
	id?: string;
	name?: string;
	required?: boolean;
	children: React.ReactNode;
}) {
	const isRequired = required || false;
	return (
		<div className="w-full max-w-80">
			<select
				name={name && name}
				id={id && id}
				required={isRequired}
				className="w-full rounded-lg border border-gray-50 px-2 py-1 shadow-customShadow"
			>
				{children}
			</select>
		</div>
	);
}
