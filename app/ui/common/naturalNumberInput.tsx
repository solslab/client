'use client';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Input } from '@/app/ui/shadcn/components/ui/input';
export default function NaturalNumberInput({
	defaultValue,
	required,
	type,
	placeHolder,
	id,
	name,
	callBack,
	value: propValue,
	onChange: propOnChange
}: {
	defaultValue?: string;
	required?: boolean;
	type?: string;
	placeHolder?: string;
	id?: string;
	name?: string;
	callBack?: (value: number) => void;
	value?: string;
	onChange?: (value: string) => void;
}) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		// 빈 문자열이거나 자연수만 허용
		if (inputValue === '' || /^[1-9]\d*$/.test(inputValue)) {
			if (propOnChange) {
				propOnChange(inputValue);
			}
			if (callBack && inputValue) {
				callBack(parseInt(inputValue));
			}
		}
	};

	return (
		<div className="w-full max-w-80">
			<Input
				id={id}
				name={name}
				type={type}
				value={propValue}
				onChange={handleChange}
				required={required}
				placeholder={placeHolder}
			/>
		</div>
	);
}
