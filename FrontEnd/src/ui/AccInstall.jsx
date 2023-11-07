import accountInstallments3 from "/Images/accountInstallments3.png";

export default function AccInstall() {
	return (
		<div className="flex flex-col gap-2 items-center ">
			<img
				className="h-16 bg-[#fff] invert"
				src={accountInstallments3}
				alt="Van_Image"
			/>
			<p className="uppercase text-xs text-center leading-relaxed">
				3 interest-free installments everyday
			</p>
		</div>
	);
}
