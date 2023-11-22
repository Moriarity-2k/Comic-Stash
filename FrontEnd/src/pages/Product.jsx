import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { add_cart, add_item, remove_cart } from "../store";

import Genre from "../ui/Genre";
import GiftWrap from "../ui/GiftWrap";
import AccountVan from "../ui/AccountVan";
import AccInstall from "../ui/AccInstall";
import AccountRet from "../ui/AccountRet";
import Spinner from "../ui/Spinner";
import ReviewComponent from "../ui/ReviewComponent";
import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "../ui/AppLayout";

import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import ImageComponent from "../ui/ImageComponent";
import Modal from "../ui/Modal";
import { base } from "../App";

function Product() {
	const [wishNum, setWishNum] = useState(0);
	const [alreadyPresent, setAlreadyPresent] = useState(false);

	const { id } = useParams();

	const {
		data: eachComic,
		error: comicError,
		isLoading,
	} = useQuery({
		queryKey: ["book"],
		queryFn: async () => {
			const x = await axios(`${base}/api/v1/books/${id}`);

			return x.data.data.comic;
		},
	});

	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const { items } = state.wishReducer;
	const { cartItems } = state.cartReducer;

	useEffect(function () {
		if (cartItems.length > 0) {
			const item = cartItems.find((x) => x.id === id);
			if (item && item.quantity) setWishNum(item.quantity);
		}
	}, []);

	function handleWishClick() {
		if (alreadyPresent) return;
		const exists = items.filter((x) => x.id === id);
		if (exists.length) {
			setAlreadyPresent(true);
			return;
		}

		dispatch(
			add_item({
				id: eachComic._id,
				name: eachComic.name,
				price: eachComic.price,
				image: eachComic.image,
				slug: eachComic.slug,
			})
		);
		toast.success("Item added to the wishlist");
	}

	function btnHandler(num) {
		setWishNum((wishNum) => Math.max(0, wishNum + num));

		if (wishNum + num > 0) {
			dispatch(
				add_cart({
					id: eachComic._id,
					quantity: wishNum + num,
					name: eachComic.name,
					price: eachComic.price,
					image: eachComic.image,
					slug: eachComic.slug,
				})
			);
		} else {
			dispatch(remove_cart(id));
		}
	}

	if (comicError) return comicError;

	if (isLoading) return <Spinner />;
	else
		return (
			<div className="w-[90%] font-poppins text-white mx-auto mt-44 lg:max-w-[80%] xl:max-w-[68%]">
				{/* note: Img and author */}
				<div className="flex flex-col md:flex-row items-start gap-[10%]">
					<ImageComponent
						mainImageSrc={`${PROJECT_URL}${eachComic.image}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`}
						width="auto"
						height="auto"
						altText={eachComic.name}
					/>

					<div className=" flex md:basis-3/4 lg:basis-3/5 mt-8 md:mt-0 flex-col lg:w-[60%] xl:w-[60%]">
						<h1 className="capitalize border-lightGrey border-b pb-4 font-bold tracking-wide leading-loose  text-[1.2rem] sm:text-[1.8rem] lg:text-[2rem]">
							{eachComic.name}
						</h1>
						<div className="mt-8 mb-3 space-y-4">
							<div className="text-wierdBlue border-b-lightGrey border-b w-max font-bold capitalize text-[1.2rem]">
								Published
							</div>
							<div className="text-greyPrimary">
								{new Date(eachComic.publishedAt).toDateString()}
							</div>
						</div>
						<div className="mt-3 mb-3 space-y-2">
							<div className="text-wierdBlue border-b-lightGrey border-b w-max font-bold capitalize text-[1.2rem]">
								Author
							</div>
							<div className="  text-greyPrimary capitalize">
								{eachComic.author}
							</div>
						</div>
						<div className="mt-3 mb-3 space-y-2">
							<div className="text-wierdBlue border-b-lightGrey border-b w-max font-bold capitalize text-[1.2rem]">
								Rating
							</div>
							<div className="  text-greyPrimary capitalize">
								{eachComic.ratingsAverage}
							</div>
						</div>

						<div className=" mt-[4%]">
							{wishNum > 0 && (
								<div className="flex">
									<button
										onClick={() => btnHandler(-1)}
										className="border-lightGrey border p-2"
									>
										<BiMinus />
									</button>
									<input
										min={1}
										value={wishNum}
										onChange={(e) =>
											setWishNum(
												Math.max(1, e.target.value)
											)
										}
										className="w-full md:w-[3rem] text-center bg-inherit"
									/>
									<button
										onClick={() => btnHandler(1)}
										className=" border-lightGrey border p-2"
									>
										<BsPlus />
									</button>
								</div>
							)}
							{wishNum === 0 ? (
								<button
									onClick={() => btnHandler(1)}
									className="mt-4 shadow-md bg-orange text-[#ffe6e6] uppercase font-bold tracking-widest w-full py-2 px-[10px]"
								>
									add to cart
								</button>
							) : (
								<NavLink to="/cart">
									<button className="mt-4 shadow-md bg-wierdBlue text-[#ffe6e6] uppercase font-bold tracking-widest w-full py-2 px-[10px]">
										View Cart
									</button>
								</NavLink>
							)}
							<div>
								<button
									onClick={handleWishClick}
									className="mt-4 bg-[#fff] text-[#000] border-[#000] border uppercase font-bold tracking-widest w-full py-2 px-[10px]"
								>
									wishlist
								</button>
								{alreadyPresent && (
									<div className=" text-yellow-200 text-xs mt-2">
										* This item is already present in your
										wishlist
									</div>
								)}
							</div>

							{/* note: About */}
							<div className="my-8 space-y-4 ">
								<Modal>
									<Modal.Open
										opens={`about-${eachComic.name}`}
									>
										<div>
											<div className="font-bold cursor-pointer text-lg ">
												<span className="flex items-center gap-4">
													About this Ebook
													<BsArrowRight className="inline-block" />
												</span>
											</div>
											<article className="text-greyPrimary text-sm mt-4">
												{eachComic.description.slice(
													0,
													200
												)}{" "}
												...
											</article>
										</div>
									</Modal.Open>
									<Modal.Window
										name={`about-${eachComic.name}`}
									>
										<div>
											<h1 className=" text-lg font-bold capitalize">
												About this book
											</h1>
											<article className="ml-4 mt-2 text-sm leading-loose">
												{eachComic.description}
											</article>
										</div>
									</Modal.Window>
								</Modal>
							</div>

							{/* note: genres */}
							<Genre genre={eachComic.genre} />

							{/* note: ratings */}
							<div className="my-8 lg:my-12 space-y-4 ">
								<div className="font-bold text-lg flex items-center gap-4">
									<span className="inline-block text-base  lg:text-2xl">
										Ratings and reviews
									</span>
									<BsArrowRight className="inline-block" />
								</div>
								<div>
									{eachComic && (
										<ReviewComponent id={eachComic._id} />
									)}
								</div>
							</div>

							{/* Gifting */}
							<GiftWrap />

							{/* Benefits */}
							<div className="my-6 space-y-6">
								<div className="font-bold text-lg flex border-lightGrey border-b pb-2 w-max items-center gap-4">
									Benefits of Buying in Comic Stash
								</div>
								<div className="flex items-center justify-evenly">
									<AccountVan />
									<AccInstall />
									<AccountRet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default Product;
