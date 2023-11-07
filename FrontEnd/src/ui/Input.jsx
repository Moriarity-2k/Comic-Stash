function Input({ name, register, holder = "" }) {
	return (
		<input
			name={name}
			type={name}
			className="text-xs rounded-[4px] w-full py-2 px-[10px] text-black focus:outline-none focus:ring-1 bg-slate-100   focus:bg-slate-200  focus:ring-inset border-[1px]"
			// className="text-xs w-full py-2 px-[10px] text-black focus:outline-greySecondary border-[#80808079] border-[1px]"
			placeholder={holder}
			{...register(name, {
				required: `Please enter your ${name}`,
			})}
		/>
	);
}

export default Input;
