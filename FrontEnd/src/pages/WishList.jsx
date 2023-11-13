import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { add_cart, remove_item } from "../store";
import toast from "react-hot-toast";
import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "../ui/AppLayout";
import ImageComponent from "../ui/ImageComponent";

const WishList = () => {
	const items = useSelector((x) => x.wishReducer.items);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	return (
		<div className="w-[95%] md:w-[80%] text-white font-mono lg:max-w-[60%] mt-44 xl:max-w-[50%] mx-auto">
			{(!items || items.length === 0) && (
				<div className="px-5 py-4 shadow-green-300 shadow-lg border-green-300 border">
					No items in your wishlist !! Go to
					<span
						onClick={() => navigate("/")}
						className=" text-red-400 cursor-pointer font-bold text-lg mx-4 px-2 py-2"
					>
						HOME
					</span>
					page to check out the items
				</div>
			)}
			{items && items.length > 0 && (
				<div className=" space-y-8">
					<div className=" text-white font-bold uppercase lg:text-2xl pb-2 ">
						Your WishList Items
					</div>
					<div className=" mt-8 md:mt-16">
						<div className="border-[#ffffff94] uppercase text-orange p-3 border-b last:border-0 grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr_0.8fr] md:grid-cols-[0.6fr_1.6fr_0.5fr_0.5fr_0.5fr] lg:md:grid-cols-[0.6fr_1.4fr_0.6fr_0.6fr_0.6fr] gap-[0.8rem] md:gap-[1.8rem] lg:gap-[1.6rem] items-center ">
							<div></div>
							<div>Name</div>
							<div>Price In Rupees</div>
							<div></div>
							<div></div>
						</div>
						{items.map((x, i) => {
							return (
								<div
									key={i}
									className="border-[#ffffff94] p-3 border-b last:border-0 grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr_0.8fr] md:grid-cols-[0.6fr_1.6fr_0.5fr_0.5fr_0.5fr] lg:md:grid-cols-[0.6fr_1.4fr_0.6fr_0.6fr_0.6fr] gap-[0.8rem] md:gap-[1.2rem] lg:gap-[1.6rem] items-center "
								>
									<ImageComponent
										mainImageSrc={`${PROJECT_URL}${x.image}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`}
										altText={x.name}
									/>
									<NavLink to={`/books/${x.id}`}>
										<h1>{x.name}</h1>
									</NavLink>
									<div>{x.price} </div>
									<button
										onClick={() =>
											dispatch(remove_item(x.id))
										}
										className="text-xs w-max uppercase font-sans tracking-wide md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border hover:bg-wierdBlue hover:text-white rounded-sm"
									>
										remove
									</button>
									<button
										onClick={() => {
											dispatch(
												add_cart({
													id: x.id,
													quantity: 1,
													name: x.name,
													price: x.price,
													image: x.image,
												})
											);
											dispatch(remove_item(x.id));
											toast.success(
												"Item moved to the cart successfully"
											);
										}}
										className="text-xs w-max uppercase font-sans tracking-wide md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border hover:bg-wierdBlue hover:text-white rounded-sm"
									>
										Add to cart
									</button>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default WishList;
