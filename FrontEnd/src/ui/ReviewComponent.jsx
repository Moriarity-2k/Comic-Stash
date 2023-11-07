import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import Star from "./Star";
import SpinnerMini from "./SpinnerMini";
import EachReview from "./EachReview";

const ReviewComponent = ({ id }) => {
	const [star, setStar] = useState(3);
	const [ownData, setOwnData] = useState(false);

	const User = useSelector((state) => state.userReducer);

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm();

	const {
		data: reviewData,
		error: reviewError,
		status: reviewStatus,
	} = useQuery({
		queryKey: ["reviewSingle"],
		queryFn: async () => {
			const x = await axios(
				`http://localhost:3000/api/v1/books/${id}/reviews`
			);

			let reviews = x.data.data.reviews;
			const p = reviews.map((review) => {
				if (User.email && review.user.email === User.email) {
					setOwnData(review);
				} else {
					return review;
				}
			});

			return p;
		},
	});

	async function reviewPosting(data) {
		const x = await axios(
			`http://localhost:3000/api/v1/books/${id}/reviews`,
			{
				method: "post",
				data: {
					comic: id,
					review: data.reviewText,
					rating: star,
				},
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: "include",
			}
		);
		return x.data.data.review;
	}

	const { mutate, isLoading: loadMutate } = useMutation({
		mutationKey: "new Cabin",
		mutationFn: (data) => reviewPosting(data),
		onSuccess: (data) => {
			toast.success("Review Posted Successfully");
			setOwnData({
				...data,
				user: {
					name: User.name,
				},
			});
		},
		onError: (error) => {
			toast.error(`Couldn't post the review ${error.message}`);
		},
	});

	// console.log(user);

	const postReviewHandler = (data) => {
		// console.log("pst review", data);
		if (!User.name) {
			return toast("Please login to post a review");
		}

		if (User.email && ownData) {
			return toast("You have already posted a review");
		}

		mutate(data);
	};

	if (reviewStatus === "pending" || loadMutate) return <SpinnerMini />;
	if (reviewError) {
		toast("SOrry , unable to fetch reviews . Please try again later");
	}

	// else if (reviewError || errorMutate) return reviewError || errorMutate;
	else
		return (
			<div className=" space-y-4 text-white">
				<form
					className=" space-y-4"
					onSubmit={handleSubmit(postReviewHandler)}
				>
					<Star star={star} setStar={setStar} />
					<label htmlFor="reviewText" />
					<div>
						<textarea
							name="reviewText"
							id="reviewText"
							className=" border-none px-4 py-2 text-black text-sm active:ring-0 w-[100%] h-24"
							defaultValue="Never read a book like this. The book is very good"
							{...register("reviewText", {
								required:
									"Please write some review and help us improve",
							})}
						/>
						<div className=" text-red-500 text-sm">
							{formErrors.reviewText &&
								formErrors.reviewText.message}
						</div>
					</div>
					<button className="text-xs md:text-sm border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border- hover:bg-wierdBlue hover:text-white rounded-sm">
						Post Review
					</button>
				</form>

				{ownData && <EachReview x={ownData} i={10000} />}

				{reviewData.length > 0 &&
					reviewData.map((x, i) => (
						<EachReview key={i + 1} x={x} i={i} />
					))}
			</div>
		);
};

export default ReviewComponent;