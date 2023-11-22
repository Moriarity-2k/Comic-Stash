import accountStore from "/Images/accountStore.png";

const AccStore = () => {
	return (
		<div className=" flex flex-col gap-2 items-center">
			<img className="h-16 invert" src={accountStore} alt="Van_Image" />
			<p className="uppercase text-xs text-center">
				pick up in store in 2 hours
			</p>
		</div>
	);
};

export default AccStore;
