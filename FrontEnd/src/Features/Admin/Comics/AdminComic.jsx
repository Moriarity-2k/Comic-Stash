import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../../pages/Categores";
import Modal from "../../../ui/Modal";
import Ripple from "../../../ui/Ripple";
import AdminBook from "./AdminBook";
import SpinnerMini from "../../../ui/SpinnerMini";
import axios from "axios";
import toast from "react-hot-toast";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { IMAGE_PUBLIC_TOKEN, PROJECT_URL } from "../../../ui/AppLayout";
import { CiEdit } from "react-icons/ci";
import Spinner from "../../../ui/Spinner";
import EmptyBlock from "../../../ui/EmptyBlock";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ImageComponent from "../../../ui/ImageComponent";
import { NavLink } from "react-router-dom";
import { base } from "../../../App";

async function handleDelete(id) {
	const x = await axios.delete(`${base}/api/v1/books/${id}`, {
		withCredentials: "include",
	});

	console.log(x.data);
	return x.data.data;
}

function DeleteConfirm({ cancelButton, name, _id, mutate }) {
	return (
		<div className=" space-y-4">
			<div>
				Are you sure you want to delete{" "}
				<span className=" text-orange font-bold">{name}</span>{" "}
				permanently
			</div>
			<div className="space-x-8 text-white">
				<Button onClick={cancelButton} className="  bg-wierdBlue">
					Cancel <Ripple />
				</Button>
				<Button className="bg-orange" onClick={() => mutate(_id)}>
					Confirm <Ripple />
				</Button>
			</div>
		</div>
	);
}

function AdminComic() {
	const [page, setPage] = useState(1);

	console.log(page);

	const {
		data: fetchedBooks,
		error: fetchError,
		isLoading,
	} = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const books = await axios(`${base}/api/v1/books`);
			// console.log(books.data);
			return books.data.data.comics;
		},
	});

	const client = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: "deleteComic",
		mutationFn: handleDelete,
		onSuccess: (data) => {
			toast.success("Comic Deleted succesfully");
			client.invalidateQueries("All-books");
		},
		onError: (error) => {},
	});

	if (fetchError) return toast.error(fetchError.message);

	if (isLoading || isPending) return <Spinner />;

	return (
		<Modal>
			<Modal.Open opens="addNewComicWindow">
				<Button className=" bg-wierdBlue px-4 py-2">
					<Ripple />
					Add New Comic
				</Button>
			</Modal.Open>
			<div>{isLoading && <SpinnerMini />}</div>
			<div className="mt-8 text-sm text-slate-200"></div>
			<div className=" text-sm text-purple-100 border-[#ffffff59] border">
				<div className=" text-orange uppercase text-xl font-bold grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr] md:grid-cols-[0.6fr_1.6fr_0.5fr_0.5fr] lg:md:grid-cols-[0.6fr_1.4fr_0.6fr_0.6fr] gap-[0.8rem] md:gap-[1.2rem] lg:gap-[1.6rem] items-center  border-[#ffffff59] border-b last:border-0 p-4 mx-4 my-4">
					<div>Name</div>
					<div>email</div>
					<div>
						<FaIndianRupeeSign />
					</div>
					<div>Modilfy</div>
				</div>
				{!fetchedBooks ? (
					<EmptyBlock message="No comics exists as of now !!! Create one. " />
				) : (
					fetchedBooks.map((x, i) => {
						if (
							i >= page * 10 - 10 &&
							i <= Math.min(fetchedBooks.length, page * 10 - 1)
						)
							return (
								// <div key={i} className="border-white p-3 border flex items-center gap-8 ">
								<div
									key={i + 1}
									className="border-[#ffffff94] text-[10px] md:text-base p-4 mx-4 my-2 border-b last:border-0 grid grid-cols-[0.4fr_1.8fr_0.8fr_0.8fr] md:grid-cols-[0.6fr_1.6fr_0.5fr_0.5fr] lg:md:grid-cols-[0.6fr_1.4fr_0.6fr_0.6fr] gap-[0.8rem] md:gap-[1.2rem] lg:gap-[1.6rem] items-center "
								>
									<ImageComponent
										mainImageSrc={`${PROJECT_URL}${x.image}?alt=media&token=${IMAGE_PUBLIC_TOKEN}`}
										altText={x.name}
									/>
									<NavLink
										to={`/books/${x.slug}`}
										className=""
									>
										{x.name}
									</NavLink>
									<div>{x.price} </div>
									<div className="hover:cursor-pointer gap-4 flex items-center">
										<Modal>
											<Modal.Open opens="editComic">
												<CiEdit className="text-xl" />
											</Modal.Open>
											<Modal.Window name="editComic">
												<AdminBook
													isEditing={true}
													defaultFormValues={x}
												/>
											</Modal.Window>
										</Modal>

										<Modal>
											<Modal.Open opens="deleteComic">
												<Button className=" bg-[#ffffff59]">
													Delete
												</Button>
											</Modal.Open>
											<Modal.Window name="deleteComic">
												<DeleteConfirm
													_id={x._id}
													name={x.name}
													mutate={mutate}
												/>
											</Modal.Window>
										</Modal>
									</div>
								</div>
							);
					})
				)}
			</div>
			<div className="pt-4 flex items-center gap-4">
				{page !== 1 && (
					<button
						onClick={() => setPage((x) => x - 1)}
						className="font-bold bg-[#ffffff69] p-2 rounded-sm"
					>
						<HiChevronLeft className=" text-white font-extrabold" />
					</button>
				)}
				<div className=" text-[#ffffff96]">
					Showing{" "}
					<span className="font-bold text-slate-300">
						{(page - 1) * 10 + 1}
					</span>{" "}
					to{" "}
					<span className="font-bold text-slate-300">
						{Math.min(page * 10, fetchedBooks.length)}
					</span>{" "}
					of{" "}
					<span className="font-bold text-slate-300">
						{fetchedBooks.length}
					</span>{" "}
					results
				</div>
				{page * 10 <= fetchedBooks.length && (
					<button
						// disabled={true}
						onClick={() =>
							setPage((x) => {
								if (x * 10 <= fetchedBooks.length) {
									return (x = x + 1);
								} else {
									return x;
								}
							})
						}
						className="font-bold bg-[#ffffff69] p-2 rounded-sm disabled:bg-[#ffffff3b]"
					>
						<HiChevronRight className=" text-white font-extrabold" />
					</button>
				)}
			</div>
			<Modal.Window name="addNewComicWindow">
				<AdminBook />
			</Modal.Window>
		</Modal>
	);
}

export default AdminComic;
