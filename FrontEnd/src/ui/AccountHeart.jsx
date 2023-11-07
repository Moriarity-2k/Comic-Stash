import accountHeart from "/Images/accountHeart.png";


function AccountHeart() {
	return (
		<div className="flex flex-col gap-2 items-center">
			<img className="h-16 bg-white invert" src={accountHeart} alt="Van_Image" />
			<p className="uppercase text-xs text-center">Wishlist</p>
		</div>
	);
}

export default AccountHeart;
