import axios from "axios";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { user_login } from "../store";

import Label from "../ui/Label";
import Input from "../ui/Input";
import AccountVan from "../ui/AccountVan";
import AccInstall from "../ui/AccInstall";
import AccStore from "../ui/AccStore";
import AccountHeart from "../ui/AccountHeart";
import AccountRet from "../ui/AccountRet";

async function loginFn(data) {
	const x = await axios("http://localhost:3000/api/v1/users/login", {
		method: "post",
		data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	return x.data.data;
}

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm();

	const { mutate, status } = useMutation({
		mutationKey: "login",
		mutationFn: (data) => loginFn(data),
		onSuccess: (data) => {
			toast.success("Logged In Succesfully");
			dispatch(
				user_login({ name: data.user.name, email: data.user.email })
			);
			if (searchParams.get("redirect")) {
				return navigate("/address");
			} else {
				return navigate("/");
			}
		},
		onError: (error, data) => {
			toast.error(`Invalid Email or Password`);
		},
	});

	function handleLogin(data, e) {
		e.preventDefault();
		mutate(data);
	}

	return (
		<div className="w-[90%] text-white lg:max-w-[80%] mt-24 xl:max-w-[68%] font-poppins mx-auto">
			<div className=" md:flex divide-lightGrey">
				{/* note: Main Left Div */}
				<div className="space-y-6 basis-2/4 md:border-lightGrey md:border-r-2 md:pr-[4%] lg:pr-[8%]">
					{/* note: first two lines div */}
					<div className="text-center space-y-4 mb-12">
						<h2
							className=" text-center uppercase text-lg"
							style={{ fontWeight: "700" }}
						>
							How Nice To See You Again
						</h2>
						<p className=" text-center text-xs leading-5 tracking-wide">
							By entering you will be able to know the status of
							your orders, the products saved in your Wishlist and
							your Jackie Club Points available to exchange for
							discounts.
						</p>
					</div>

					{/* note: Form */}
					<form
						className="space-y-6 text-white"
						onSubmit={handleSubmit(handleLogin)}
					>
						<div className="flex items-start flex-col gap-2">
							<Label name="email" />
							<Input
								name="email"
								register={register}
								holder="test@email.com"
							/>
							<div className=" text-red-500 text-xs">
								{formErrors.email && formErrors.email.message}
							</div>
						</div>
						<div className="flex items-start flex-col gap-2">
							<Label name="password" />
							<input
								name="password"
								type="password"
								minLength={8}
								className="text-xs w-full py-2 px-[10px] text-black focus:outline-greySecondary border-[#80808079] border-[1px]"
								{...register("password", {
									required: true,
									minLength: 8,
								})}
							/>
							<div className=" text-red-500 text-xs">
								{formErrors.password &&
									formErrors.password.type === "minLength" &&
									"Password must be a min length of 8"}
							</div>
						</div>
						<button
							disabled={status === "pending"}
							className=" uppercase bg-orange font-semibold py-2 px-[10px] text-lg text-white w-full"
						>
							log in
						</button>
					</form>
					<div className="flex items-center gap-6">
						<p className="capitalize text-sm text-start">
							did you forgot your password ?
						</p>
						<NavLink to="/forgotPassword">
							<button className="text-xs md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border- hover:bg-wierdBlue hover:text-white rounded-sm">
								Click Here
							</button>
						</NavLink>
					</div>
				</div>

				{/* note: Main right */}
				<div className=" space-y-8 mt-24 md:mt-0 md:pl-[8%] basis-2/4">
                    
					{/* note: Two lines */}
					<div className="text-center space-y-4 mb-8">
						<h2
							className=" text-center uppercase text-lg"
							style={{ fontWeight: "700" }}
						>
							How Nice To See You Again
						</h2>
						<p className=" text-center text-xs leading-5 tracking-wide">
							By entering you will be able to know the status of
							your orders, the products saved in your Wishlist and
							your Jackie Club Points available to exchange for
							discounts.
						</p>
					</div>

					{/* Grid Items */}
					<div className="grid grid-cols-2 gap-8 md:gap-12 md:grid-cols-3">
						<AccountVan />
						<AccInstall />
						<AccStore />
						<AccountRet />
						<AccountHeart />
					</div>
					<NavLink to="/createaccount?redirect=address">
						<button className="mt-6 uppercase rounded-sm bg-wierdBlue font-semibold py-2 px-[10px] text-sm text-white w-full">
							create account
						</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Login;
