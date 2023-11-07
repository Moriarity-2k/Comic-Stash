import accountReturn from "/Images/accountReturn.png";

function AccountRet() {
	return (
		<div className="flex flex-col gap-2 items-center">
			<img
				className="h-16 invert "
				src={accountReturn}
				alt="Van_Image"
			/>
			<p className="uppercase text-xs text-center">
				exchanges and returns free of charge
			</p>
		</div>
	);
}

export default AccountRet;
