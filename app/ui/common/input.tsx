import Image from 'next/image';

export default function Input({
	defaultValue,
	required,
	type,
	placeHolder,
	id,
	name
}: {
	defaultValue?: string;
	required?: boolean;
	type?: string;
	placeHolder?: string;
	id?: string;
	name?: string;
}) {
	return (
		<div className="w-full max-w-80">
			<input
				id={id && id}
				name={name && name}
				className="w-full rounded-lg border border-gray-50 px-2 py-1 shadow-customShadow"
				type={type}
				defaultValue={defaultValue}
				required={required}
				placeholder={placeHolder && placeHolder}
			/>
		</div>
	);
}
