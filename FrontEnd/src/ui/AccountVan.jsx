import AccountVan_Img from "/Images/AccountVan2.png";

function AccountVan() {
	return (
		<div className="flex flex-col gap-2 items-center">
			<img
				className="h-16 bg-[#fff] invert "
				src={AccountVan_Img}
				alt="Van_Image"
			/>
			<p className="uppercase text-xs text-center">
				free shipping nationwide
			</p>
		</div>
	);
}

export default AccountVan;
