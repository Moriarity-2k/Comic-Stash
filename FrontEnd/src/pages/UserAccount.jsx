import { NavLink, useNavigate } from "react-router-dom";
import userImg from "/Images/default.jpg";

import { FcExpand } from "react-icons/fc";
import { useState } from "react";
import { MdOutlineExpandLess } from "react-icons/md";
// import AccountVan from "../ui/AccountVan";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";
import { remove_user, user_login } from "../store";

//  TODO:
// update profile
// update password

async function updateProfile(data) {
	// console.log(data);
	const x = await axios("http://localhost:3000/api/v1/users/updateMe", {
		method: "patch",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
		withCredentials: "include",
	});

	// console.log(x);

	return x.data.data.user;
}

function UserAccount() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const dispatch = useDispatch();
	const User = useSelector((x) => x.userReducer);

	const { mutate, isPending } = useMutation({
		mutationKey: ["updateName"],
		mutationFn: (data) => updateProfile(data),
		onSuccess: (data) => {
			dispatch(user_login(data));
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		if (!name && !email) return;
		mutate({ name: name || User.name, email: email || User.email });
	}

	if (isPending) return <SpinnerMini />;

	return (
		<div className="w-[90%] text-white lg:max-w-[80%] mt-32  pt-6 pb-4 xl:max-w-[68%] font-poppins mx-auto">
			{/* note: user details  */}
			<div className="mt-8 flex flex-col items-center gap-2">
				<h1 className="uppercase font-extralight text-xl tracking-widest">
					my account
				</h1>
				{/* <img
					src={userImg}
					alt="user-image"
					className="rounded-full h-24 lg:h-32 xl:h-44"
				/> */}
				{/* <p>
					Hello , <strong className="uppercase">{User.name}</strong>
				</p>
				<p className="text-greyPrimary capitalize">
					How nice to see you again
				</p> */}

				{/* Update profile , name and email */}
				<div className="w-full lg:w-[60%] shadow-white font-poppins drop-shadow-lg">
					<form
						onSubmit={handleSubmit}
						className=" text-[#ffffffa1] shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<div className="mb-4">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="username"
							>
								Username
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								type="text"
								placeholder={User.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="password"
							>
								Email
							</label>
							<input
								className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder={User.email}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{/* <p className="text-red-500 text-xs italic">
								Please choose a password.
							</p> */}
						</div>
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 uppercase tracking-wider hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Update Profile
							</button>
							{/* <a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a> */}
						</div>
					</form>
				</div>

				{/* Password Update */}
				<div className="w-full lg:w-[60%] shadow-white font-poppins drop-shadow-lg">
					<form
						onSubmit={handleSubmit}
						className=" text-[#ffffffa1] shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<div className="mb-4">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="username"
							>
								Password
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="text"
								placeholder="********"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="password"
							>
								New Password
							</label>
							<input
								className="shadow bg-slate-300 focus:bg-slate-200  appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="newPassword"
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="password"
							>
								Confirm Password
							</label>
							<input
								className="shadow bg-slate-300 focus:bg-slate-200 appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="passwordConfirm"
								type="password"
								value={passwordConfirm}
								onChange={(e) =>
									setPasswordConfirm(e.target.value)
								}
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 uppercase tracking-wider hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Update Password
							</button>
							{/* <a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a> */}
						</div>
					</form>
				</div>

				{/* note: Options */}
				{/* <div className="w-full text-center cursor-pointer">
					<div
						className="border-white border-2"
						onClick={() => setAddrAct((x) => !x)}
					>
						<p className="uppercase tracking-[0.36rem] bg-white text-black text-sm py-4 w-[100%]">
							my addresses
							{addrAct ? (
								<MdOutlineExpandLess className="inline float-right mr-8 text-lg" />
							) : (
								<FcExpand className="inline float-right mr-8 text-lg" />
							)}
						</p>
						{addrAct && (
							<div className="w-full border-greyPrimary py-8 border-t">
								<div className="space-y-4 w-max text-start text-sm text-gray-500 mx-auto">
									<p className="space-x-4">
										<span className="font-bold text-white">
											Name:
										</span>
										<span>UserName</span>
									</p>
									<p className="space-x-4">
										<span className="font-bold text-white">
											Email:
										</span>
										<span> UserEmail </span>
									</p>
									<p className="space-x-4">
										<span className="font-bold text-white">
											Lives At :
										</span>
										<span> **** street , **** city </span>
									</p>
									<p className="space-x-4">
										<span className="font-bold text-white">
											PinCode :
										</span>
										<span>111 111</span>
									</p>
									<p>
										** More Features will be added soon **
									</p>
								</div>
							</div>
						)}
					</div>

					note: order history 
					<div
						className="border-black border-2 border-t-0"
						onClick={() => setOrderAct((x) => !x)}
					>
						<p className="uppercase tracking-[0.34rem] text-white text-sm py-4 w-[100%]">
							my orders
							{orderAct ? (
								<MdOutlineExpandLess className="inline float-right mr-8 text-lg" />
							) : (
								<FcExpand className="inline float-right mr-8 text-lg" />
							)}
						</p>
						{orderAct && (
							<div className="w-full border-greyPrimary py-8 border-t">
								<div className="space-y-4 w-max text-start text-sm text-gray-500 mx-auto">
									<p className="space-x-4">
										<span className="font-bold text-white">
											Name:
										</span>
										<span>UserName</span>
									</p>
								</div>
							</div>
						)}
					</div>
				</div> */}

				<NavLink>
					<button
						onClick={async () => {
							const x = await axios(
								"http://localhost:3000/api/v1/users/logout",
								{
									method: "get",
									withCredentials: true,
								}
							);
							// console.log(x);
							dispatch(remove_user());
							navigate("/");
							return x.data.data;
						}}
						className="text-xs md:text-sm px-2 py-1 md:px-4 md:py-2 w-52 font-bold uppercase tracking-[0.3rem] text-lightGrey bg-wierdBlue text-white rounded-sm"
					>
						log out
					</button>
				</NavLink>
				<NavLink to="/">
					<button className="border-white border text-xs w-52 font-bold uppercase tracking-[0.3rem] py-3 px-5 text-white ">
						keep buying
					</button>
				</NavLink>
			</div>
		</div>
	);
}

export default UserAccount;
