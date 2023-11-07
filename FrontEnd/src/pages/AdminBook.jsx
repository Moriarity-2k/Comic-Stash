import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Label from "../ui/Label";
import Input from "../ui/Input";
import { useRef } from "react";

async function sendBookData(data) {
	const formData = new FormData();

	Object.keys(data).forEach((x) => {
		if (x === "image") {
			formData.append("imageComic", data[x]);
		} else formData.append(x, data[x]);
	});

	const x = await axios("http://localhost:3000/api/v1/books/", {
		method: "post",
		data: formData,
		headers: {
			// "Content-Type": "application/json",
			'Content-Type': 'multipart/form-data'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		withCredentials: "include",
	});
	console.log(x.data);
	return x.data.data;
}

const AdminBook = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors: bookErrors },
	} = useForm();

	const { mutate } = useMutation({
		mutationKey: ["postBookData"],
		mutationFn: sendBookData,
		onSuccess: (data) => {
			toast.success("Product Creation Successful");
			// reset();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleCreateBook = (data, e) => {
		e.preventDefault();
		data.image = data.image[0];
		mutate(data);
	};

	return (
		<div className="w-[95%] md:w-[80%] text-[#ffffffc2] font-mono lg:max-w-[60%] mt-24 md:mt-28 lg:mt-40 xl:max-w-[50%] mx-auto">
			<div className=" font-bold uppercase my-8 text-lg lg:text-3xl tracking-wider">
				Publish New Comic
			</div>
			<form
				className="space-y-6"
				onSubmit={handleSubmit(handleCreateBook)}
			>
				<div className="flex items-start flex-col gap-2">
					<Label name="name of the book" />
					<Input
						name="name"
						holder="Dungeons and Dragons"
						register={register}
						type="text"
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.name && bookErrors.name.message}
					</div>
				</div>
				<div className="flex items-start flex-col gap-2">
					<Label name="description" />
					<Input
						name="description"
						holder="Lorem Ipsum"
						type="text"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.description &&
							bookErrors.description.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="author" />
					<Input
						name="author"
						type="text"
						holder="J K "
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.author && bookErrors.author.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="price" />
					<Input
						name="price"
						type="number"
						holder="999"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.price && bookErrors.price.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="genre" />
					<Input
						name="genre"
						type="text"
						holder="fantasy"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.genre && bookErrors.genre.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="Official Published Date" />
					<Input
						name="publishedAt"
						type="date"
						holder="1/1/2000"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.publishedAt &&
							bookErrors.publishedAt.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="Pages" />
					<Input
						name="numPages"
						type="number"
						holder="999"
						register={register}
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.numPages && bookErrors.numPages.message}
					</div>
				</div>

				<div className="flex items-start flex-col gap-2">
					<Label name="Image" />
					<input
						name="imageComic"
						type="file"
						{...register("image", {
							required: "Please provide an image for reference",
						})}
						accept="image/*"
					/>
					<div className=" text-red-500 text-xs">
						{bookErrors.numPages && bookErrors.numPages.message}
					</div>
				</div>

				<div className="flex gap-12">
					<button
						type="submit"
						// disabled={isLoading}
						className="w-full text-sm uppercase bg-orange font-semibold py-2 px-[10px] rounded-sm lg:text-lg text-white"
					>
						Create Product
					</button>
					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
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

export default AdminBook;
