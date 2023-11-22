import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Label from "../ui/Label";
import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ForPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm();

	function sendEmail(data) {
		console.log(data);
	}

	const navigate = useNavigate();

	const { mutate, isPending } = useMutation({
		mutationKey: ["signup"],
		mutationFn: (data) => sendEmail(data),
		onSuccess: () => {
			toast.success(
				"Click the link sent to your email to reset your password"
			);
			navigate("/login");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
    
	return (
		<div className="w-[90%] text-white lg:max-w-[60%] mt-24 xl:max-w-[45%] font-poppins mx-auto">
			<div className="space-y-6 basis-2/4 text-white md:border-lightGrey md:border-r-2 lg:pr-[8%]">
				{/* note: first two lines div */}
				<div className="text-center md:space-y-4 mb-12">
					<h2
						className=" text-center uppercase text-lg"
						style={{ fontWeight: "700" }}
					>
						Reset your password
					</h2>
					<p className=" text-center text-xs leading-5 tracking-wide">
						we will send an email to reset your password
					</p>
				</div>
				<form className="space-y-6" onSubmit={handleSubmit(mutate)}>
					<div className="flex items-start flex-col gap-2">
						<Label name="email" />
						<Input
							name="email"
							type="email"
							holder="test@email.com"
							register={register}
						/>
						<div className=" text-red-500 text-xs">
							{formErrors.email && formErrors.email.message}
						</div>
					</div>
					<div className="flex gap-12">
						<button
							type="submit"
							className="w-full uppercase bg-orange font-semibold py-2 px-[10px] text-lg text-white"
						>
							{isPending ? <SpinnerMini /> : "send"}
						</button>
						<button
							type="submit"
							className="w-full uppercase text-[#ffffffc9] border-wierdBlue border-2 font-semibold py-2 px-[10px] text-lg "
						>
							cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForPassword;
