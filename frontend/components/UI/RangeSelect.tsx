import React, { useState, useRef, useEffect } from 'react';
import {Slider} from "@heroui/react";


interface RangeComponentProps {
	min?: number;
	max?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	className?: string;
	label?: string;
	disabled?: boolean;
	name?: string;
	id?: string;
}

const RangeComponent: React.FC<RangeComponentProps> = ({
														   min = 0,
														   max = 100,
														   defaultValue = 50,
														   onChange,
														   className = "",
														   label,
														   disabled = false,
														   name,
														   id,
													   }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [value, setValue] = useState<number>(defaultValue);
	const [displayValue, setDisplayValue] = useState<string>(defaultValue.toString());
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	
	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	
	// Handle slider change
	const handleSliderChange = (newValue: number): void => {
		setValue(newValue);
		setDisplayValue(newValue.toString());
		
		if (onChange) {
			onChange(newValue);
		}
	};
	
	// Toggle dropdown
	const toggleDropdown = (): void => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};
	
	return (
		<div className={`relative ${className}`} ref={dropdownRef}>
			{label && (
				<label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
					{label}
				</label>
			)}
			
			{/* Using Select component styling from @heroui/components */}
			<div
				id={id}
				className={`flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
				onClick={toggleDropdown}
				role="button"
				aria-haspopup="true"
				aria-expanded={isOpen}
				aria-labelledby={label ? id : undefined}
				tabIndex={disabled ? -1 : 0}
			>
				<span className="text-sm text-gray-700">{displayValue}</span>
				{/*<Icon name="chevron-down" className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />*/}
			</div>
			
			{/* Dropdown slider */}
			{isOpen && (
				<div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 p-4">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<span className="text-xs text-gray-500">{min}</span>
							<span className="text-xs text-gray-500">{max}</span>
						</div>
						<Slider
							min={min}
							max={max}
							value={value}
							onChange={handleSliderChange}
							name={name}
							disabled={disabled}
						/>
						<div className="flex justify-center">
							<span className="text-sm font-medium text-gray-700">{value}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RangeComponent;
