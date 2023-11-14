import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import SpinnerMini from "../../ui/SpinnerMini";

function Contact() {
	const user = useSelector((state) => state.userReducer);
	console.log(user);

	const [email, setEmail] = useState(user.email);
	const [name, setName] = useState(user.name);
	const [textarea, setTextarea] = useState("Hello ");

	async function handleContact() {
		console.log("first");
		const x = await axios("/api/v1/contactUs", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: "include",
			data: {
				name,
				email,
				message: textarea,
			},
		});
		return x.data;
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ["contact"],
		mutationFn: handleContact,
		onSuccess: () => {
			toast.success(
				"Message sent succesfully. Thank you for your valuable feedback"
			);
		},
		onError: () => {
			toast.error("Something went wrong. Please try again later");
		},
	});

	return (
		<div className="w-[90%] text-slate-200 font-sans lg:max-w-[60%] mt-24 lg:mt-44 xl:max-w-[45%] mx-auto">
			{user && (
				<div>
					<div className="mb-6">
						<label
							className="block text-sm font-bold mb-2"
							htmlFor="password"
						>
							Name
						</label>
						<input
							className="shadow appearance-none bg-slate-300 focus-within:bg-slate-200  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							autoComplete="username"
							type="text"
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
							className="shadow appearance-none bg-slate-300 focus-within:bg-slate-200  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-sm font-bold mb-2 capitalize"
							htmlFor="password"
						>
							Give Some FeedBack
						</label>
						<textarea
							className="shadow appearance-none h-32 bg-slate-300 focus-within:bg-slate-200  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							value={textarea}
							onChange={(e) => setTextarea(e.target.value)}
						/>
					</div>
					{isPending ? (
						<SpinnerMini />
					) : (
						<button
							onClick={mutate}
							// onClick={handleContact}
							className=" w-44 h- hover:bg-wierdBlue px-4 py-2 bg-[#0265a7] text-slate-200 font-poppins font-bold"
						>
							Share FeedBack
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default Contact;
