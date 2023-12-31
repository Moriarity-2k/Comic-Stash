function Input({ name, register, type, holder }) {
	return (
		<input
			name={name}
			type={type}
			className="text-xs rounded-[4px] w-full py-2 px-[10px] text-black focus:outline-none focus:ring-1 bg-slate-100   focus:bg-slate-200  focus:ring-inset border-[1px]"
			placeholder={holder}
			{...register(name, {
				required: `Please enter ${name}`,
			})}
		/>
	);
}

Input.defaultPorps = {
	type: "text",
	holder: "",
};

export default Input;
