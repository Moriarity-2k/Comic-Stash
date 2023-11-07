function Overlay({ valueFn }) {
	return (
		<div
			onClick={valueFn}
			className="fixed z-5 inset-0 backdrop-blur-md blur-lg bg-[#000000b2]"
		></div>
	);
}

export default Overlay;
