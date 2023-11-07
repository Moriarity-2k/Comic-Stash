import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { add_cart, remove_cart } from "../store";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "../ui/AppLayout";

const CartP = () => {
	const items = useSelector((x) => {
		return x.cartReducer.cartItems;
	});
	const User = useSelector((x) => x.userReducer);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	function btnHandler(x, ch) {
		// console.log(x);
		if (x.quantity + ch === 0) {
			console.log(x.quantity + ch);
			dispatch(remove_cart(x.id));
			return;
		}
		dispatch(add_cart({ ...x, quantity: x.quantity + ch }));
	}

	return (
		<div className="w-[95%] text-gray-200 font-mono xl:max-w-[70%] 2xl:max-w[65%] mt-32 md:mt-36 lg:mt-44 mx-auto">
			{(!items || items.length === 0) && (
				<div className="px-5 py-4 shadow-green-300 shadow-lg border-green-300 border">
					No items in your Cart !! Go to
					<span
						onClick={() => navigate("/")}
						className=" text-red-400 cursor-pointer font-bold text-lg mx-4 px-2 py-2"
					>
						HOME
					</span>
					page to check out the items
				</div>
			)}
			<div>
				{items && items.length > 0 && (
					<div className="text-gray-200 space-y-6">
						<div className="font-bold uppercase text-xl lg:text-3xl pb-2 ">
							shopping Cart
						</div>
						<div className="text-xs md:text-sm lg:text-lg p-1 md:p-6 mt-8 md:mt-16 md:px-4 md:py-4 border-[#42535e81] border">
							{/* <div className="border-[#ffffff2c] uppercase text-orange p-1 md:p-2 lg:p-3 border-b last:border-0 grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr] md:grid-cols-[0.2fr_1.6fr_0.5fr_0.8fr] lg:md:grid-cols-[0.3fr_1.4fr_0.6fr_0.6fr] gap-[0.8rem] md:gap-[1.2rem] lg:gap-[1.6rem] items-center justify-start">
								<div></div>
								<div>Name</div>
								<div>Price &#8377; </div>
								<div>Quantity</div>
							</div> */}
							{items.map((x, i) => {
								return (
									<div
										key={i}
										className=" p-1 md:p-2 lg:p-3 border-[#42535e81] border-b last:border-0 grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr] md:grid-cols-[0.2fr_1.6fr_0.3fr_0.8fr] lg:md:grid-cols-[0.3fr_1.4fr_0.4fr_0.6fr] gap-[0.8rem] md:gap-[1.2rem] lg:gap-[1.6rem] items-center justify-start"
									>
										<img
											src={`${PROJECT_URL}${x.image}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`}
											className="max-h-16"
										/>
										<NavLink to={`/books/${x.id}`}>
											<h1 className="text-xs md:text-base">
												{x.name}
											</h1>
										</NavLink>
										<div className=" ">{x.price} </div>
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													btnHandler(x, -1)
												}
												className="border-lightGrey border p-2"
											>
												<BiMinus />
											</button>
											<div>{x.quantity}</div>
											<button
												onClick={() => btnHandler(x, 1)}
												className=" border-lightGrey border p-2"
											>
												<BsPlus />
											</button>
											<button
												onClick={() =>
													dispatch(remove_cart(x.id))
												}
												className="text-xs w-max ml-3 md:ml-5 lg:ml-8 uppercase font-sans tracking-wide md:text-sm border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border hover:bg-wierdBlue hover:text-white rounded-sm"
											>
												remove
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
				{items.length > 0 && (
					<div className="mt-8 md:mt-16 space-y-4 lg:space-y-8  px-4 py-4">
						<div className=" font-bold uppercase text-sm md:text-base lg:text-2xl">
							SUb Total
						</div>
						<div className="text-xs lg:text-base">
							<span>Total Items:</span>
							<span className="ml-4">
								{items.reduce((acc, x) => acc + x.quantity, 0)}
							</span>
						</div>
						<div className="text-xs lg:text-base">
							<span>Total price:</span>
							<span className="ml-4">
								{items.reduce(
									(acc, x) => acc + x.quantity * x.price,
									0
								)}
							</span>
						</div>
						<button
							onClick={() => {
								if (User.name) {
									return navigate("/address");
								} else {
									return navigate("/login/?redirect=address");
								}
							}}
							className="text-xs md:text-sm bg-wierdBlue flex items-center font-poppins uppercase border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:bg-[#017acaa6] transition-colors duration-200 rounded-sm"
						>
							<span className="block px-3 py-2 font-bold">
								Proceed To Checkout
							</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartP;
