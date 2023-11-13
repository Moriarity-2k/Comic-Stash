import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import Label from "../ui/Label";
import Input from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { set_address } from "../store";

const AdFill = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const User = useSelector((x) => x.userReducer);
	const { cartItems } = useSelector((x) => x.cartReducer);
	const addressLocal = useSelector((x) => x.addressReducer);

	const makePayment = async () => {
		const variance = await axios.get(
			"http://localhost:3000/api/v1/pk_variance"
		);
		const stripe = await loadStripe(variance.data.variance);

		const session = await axios(
			"http://localhost:3000/api/v1/bookings/create-checkout-session",
			{
				method: "post",
				data: {
					products: cartItems,
				},
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: "include",
			}
		);

		const result = await stripe.redirectToCheckout({
			sessionId: session.data.id,
		});

		if (result.error) {
			toast.error(result.error);
		}
	};

	const { isLoading, mutate } = useMutation({
		mutationFn: (address) => makePayment(address),
		onError: (error) => {
			toast(error.message);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors: signUpErrors },
	} = useForm({
		defaultValues: addressLocal,
	});

	function singUpHandler(data, e) {
		e.preventDefault();
		if (!User.name || !cartItems) {
			toast("Please add some items to cart and login");
			navigate("/cart");
			return;
		}
		dispatch(set_address(data));
		mutate(data);
	}

	return (
		<div className="w-[95%] md:w-[80%] text-[#ffffffc2] lg:max-w-[60%] mt-24 md:mt-28 lg:mt-36 xl:max-w-[50%] mx-auto">
			<div className="my-4 md:my-6 lg:my-10 lg:text-3xl font-bold tracking-widest uppercase">
				Address
			</div>
			<form className="space-y-6" onSubmit={handleSubmit(singUpHandler)}>
				<div className="flex items-start flex-col gap-2">
					<Label name="Address" />
					<Input
						name="address"
						holder="Doyers Street"
						register={register}
						type="text"
					/>
					<div className=" text-red-500 text-xs">
						{signUpErrors.address && signUpErrors.address.message}
					</div>
				</div>
				<div className="flex items-start flex-col gap-2">
					<Label name="City" />
					<Input
						name="city"
						type="text"
						holder="NewYork"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{signUpErrors.city && signUpErrors.city.message}
					</div>
				</div>
				<div className="flex items-start flex-col gap-2">
					<Label name="Country" />
					<Input
						name="country"
						type="text"
						holder="test@email.com"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{signUpErrors.country && signUpErrors.country.message}
					</div>
				</div>
				<div className="flex items-start flex-col gap-2">
					<Label name="pincode" />
					<Input
						name="pincode"
						type="number"
						holder="123456"
						register={register}
					/>
				</div>
				<div className="flex gap-12">
					<button
						type="submit"
						disabled={isLoading}
						className="w-full text-sm uppercase bg-orange font-semibold py-2 px-[10px] rounded-sm lg:text-lg text-white"
					>
						Proceed to Payment
					</button>
					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							navigate("/cart");
						}}
						className="w-full uppercase border border-wierdBlue font-semibold py-2 px-[10px] rounded-sm text-lg text-white"
					>
						cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdFill;
