import React, { useState, useRef, useEffect } from "react";

const VerticalSlider = ({
	min = 0,
	max = 100,
	value: externalValue,
	onChange,
}) => {
	const [internalValue, setInternalValue] = useState(min);
	const sliderRef = useRef(null);

	// Update internal value if external value changes
	useEffect(() => {
		if (externalValue !== undefined) {
			setInternalValue(externalValue);
		}
	}, [externalValue]);

	const updateValue = (clientY) => {
		if (!sliderRef.current) return;

		const rect = sliderRef.current.getBoundingClientRect();
		const offsetY = clientY - rect.top;
		const newValue = min + (offsetY / rect.height) * (max - min);
		const clampedValue = Math.max(min, Math.min(max, newValue));

		setInternalValue(clampedValue);
		if (onChange) onChange(clampedValue);
	};

	// Mouse events
	const handleMouseDown = (e) => {
		updateValue(e.clientY);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp, { once: true });
	};

	const handleMouseMove = (e) => updateValue(e.clientY);
	const handleMouseUp = () =>
		window.removeEventListener("mousemove", handleMouseMove);

	// Touch events
	const handleTouchStart = (e) => {
		updateValue(e.touches[0].clientY);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("touchend", handleTouchEnd, { once: true });
	};

	const handleTouchMove = (e) => updateValue(e.touches[0].clientY);
	const handleTouchEnd = () =>
		window.removeEventListener("touchmove", handleTouchMove);

	return (
		<div
			ref={sliderRef}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
			style={{
				position: "relative",
				width: "10px",
				height: "80vh",
				background: "#ddd",
				borderRadius: "5px",
				cursor: "pointer",
				touchAction: "none",
			}}
		>
			{/* Track fills downward */}
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: `${((internalValue - min) / (max - min)) * 100}%`,
					background: "var(--primary-btn, #ff0000)",
					top: 0,
					transition: "height 0.2s ease",
				}}
			></div>

			{/* Thumb moves from top to bottom */}
			<div
				style={{
					position: "absolute",
					left: "50%",
					width: "20px",
					height: "20px",
					background: "var(--primary-btn, #ff0000)",
					borderRadius: "50%",
					transform: "translate(-50%, -50%)",
					cursor: "grab",
					touchAction: "none",
					top: `${((internalValue - min) / (max - min)) * 100}%`,
				}}
			></div>
		</div>
	);
};

export default VerticalSlider;
