import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import axios from "axios";
import { useDispatch } from "react-redux";
import { user_login } from "../store";

function CreateAccountF() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors: signUpErrors },
	} = useForm();

	const singUp = async (data) => {
		const x = await axios("http://localhost:3000/api/v1/users/sign-up", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			data: { ...data, passwordConfirm: data.password },
			withCredentials: "include",
		});
		console.log(x);
		return x.data.data;
	};

	const { mutate, isError, status } = useMutation({
		mutationKey: ["signup"],
		mutationFn: (data) => singUp(data),
		onSuccess: (data) => {
			dispatch(user_login(data));
			toast.success("SingUp SuccessFul . Redirecting to home page");
			if (searchParams.get("redirect")) {
				navigate("/address");
				return;
			}
			navigate("/");
		},
		onError: (error) => {
			toast.error("Sign Up failed .. Try again later");
		},
	});

	function singUpHandler(data) {
		mutate(data);
	}

	if (status === "pending") return <SpinnerMini />;
	else
		return (
			<div className="w-[90%] text-white lg:max-w-[60%] mt-24 lg:mt-44 xl:max-w-[45%] font-poppins mx-auto">
				<div className="space-y-6 basis-2/4 lg:pr-[8%]">
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
					<form
						className="space-y-6"
						onSubmit={handleSubmit(singUpHandler)}
					>
						<div className="flex items-start flex-col gap-2">
							<Label name="name" />
							<Input
								name="name"
								holder="Elon"
								register={register}
								type="text"
							/>
							<div className=" text-red-500 text-xs">
								{signUpErrors.name && signUpErrors.name.message}
							</div>
						</div>
						<div className="flex items-start flex-col gap-2">
							<Label name="lastName" />
							<Input
								name="lastName"
								holder="Musk"
								type="text"
								register={register}
							/>
							<div className=" text-red-500 text-xs">
								{signUpErrors.lastName &&
									signUpErrors.lastName.message}
							</div>
						</div>
						<div className="flex items-start flex-col gap-2">
							<Label name="email" />
							<Input
								name="email"
								type="email"
								holder="test@email.com"
								register={register}
							/>
							<div className=" text-red-500 text-xs">
								{signUpErrors.email &&
									signUpErrors.email.message}
							</div>
						</div>
						<div className="flex items-start flex-col gap-2">
							<Label name="password" />
							<input
								name="password"
								type="password"
								className="text-xs w-full py-2 px-[10px] text-black focus:outline-greySecondary border-[#80808079] border-[1px]"
								{...register("password", {
									required: true,
									minLength: 8,
								})}
							/>
							<div className=" text-red-500 text-xs">
								{signUpErrors.password &&
									signUpErrors.password.type ===
										"minLength" &&
									"Password must be a min length of 8"}
							</div>
						</div>
						<div className="flex gap-12">
							<button
								type="submit"
								// disabled={status === "pending"}
								className="w-full uppercase bg-orange font-semibold py-2 px-[10px] rounded-sm text-lg text-white"
							>
								create account
							</button>
							<button
								type="submit"
								onClick={(e) => {
									e.preventDefault();
									navigate(-1);
								}}
								className="w-full uppercase border border-wierdBlue font-semibold py-2 px-[10px] rounded-sm text-lg text-white"
							>
								cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		);
}

export default CreateAccountF;
