import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import EachCard from "../ui/EachCard";
import { useQuery } from "@tanstack/react-query";
import SpinnerMini from "../ui/SpinnerMini";
import axios from "axios";

const Image =
	"https://firebasestorage.googleapis.com/v0/b/comicstash-99a6f.appspot.com/o/bookCovers%2F1_SuperiorIronMan_Img.jpeg?alt=media&token=e2eb3365-d2a9-4689-af13-d7e96448271e";

const Featured = () => {
	const {
		data: fetchedBooks,
		error: fetchError,
		status: fetchStatus,
	} = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const books = await axios("http://localhost:3000/api/v1/books");
			// console.log(books.data);
			return books.data.data.comics;
		},
	});

	if (fetchStatus === "pending") return <SpinnerMini />;

	if (fetchError) throw new Error(fetchError.message);

	return (
		<div className="w-[98%] pt-4 pb-4 xl:max-w-[80%] font-poppins md:mx-auto">
			<div className="my-16">
				<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
					<h1 className="pl-4 md:text-3xl uppercase tracking-wide text-white">
						New Arrivals
					</h1>
					{/* <button className="text-xs md:text-sm flex items-center border-wierdBlue px-2 py-1 md:px-4 md:py-2 hover:text-lightGrey border hover:border- hover:bg-wierdBlue hover:text-white rounded-sm">
						<span className="block">View More</span>
						<FaLongArrowAltRight />
					</button> */}
				</div>
				{/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
				<div className="flex items-center flex-wrap gap-6 md:gap-10 ml-8 md:ml-4 last:justify-start  justify-evenly">
					{fetchedBooks &&
						fetchedBooks.map((x) => {
							console.log(x);
							if (x.publishedAt.split("-")[0] >= 2023) {
								return (
									<EachCard
										key={x._id}
										Image={Image}
										ratingsAverage={x.ratingsAverage}
										price={x.price}
										id={x._id}
										name={x.name}
									/>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default Featured;
