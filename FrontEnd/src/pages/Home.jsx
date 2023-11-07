import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigation } from "react-router-dom";

import Spinner from "../ui/Spinner";
import EachCard from "../ui/EachCard";
import Featured from "../ui/Featured";

function Home() {
	const { state } = useNavigation();

	const {
		data: fetchedBooks,
		error: fetchError,
		status: fetchStatus,
	} = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const books = await axios("http://localhost:3000/api/v1/books");
			return books.data.data.comics;
		},
	});

	if (state === "loading") return <Spinner />;

	if (fetchStatus === "pending") return <Spinner />;

	if (fetchError) throw new Error(fetchError.message);

	return (
		<div className="w-[95%] pt-4 pb-4 mt-14 lg:mt-20  mx-auto">
			<div className="my-16">
				<Featured
					name="featured"
					fetchedBooks={fetchedBooks}
					render={(x) => {
						if (x.ratingsAverage >= 4.2) {
							return (
								<EachCard
									key={x._id}
									Image={x.image}
									ratingsAverage={x.ratingsAverage}
									price={x.price}
									id={x._id}
									name={x.name}
								/>
							);
						}
					}}
				/>
				<Featured
					name="new arrivals"
					fetchedBooks={fetchedBooks}
					render={(x) => {
						if (x.publishedAt.split("-")[0] >= 2022) {
							return (
								<EachCard
									key={x._id}
									Image={x.image}
									ratingsAverage={x.ratingsAverage}
									price={x.price}
									id={x._id}
									name={x.name}
								/>
							);
						}
					}}
				/>
			</div>

			<div className="mt-8 text-white">
				Check Out
				<NavLink to="/categories">
					<span className="font-bold text-wierdBlue border-orange border px-4 py-2 mx-4 hover:text-white hover:bg-wierdBlue hover:border-wierdBlue uppercase cursor-pointer hover:border">
						All Categores
					</span>
				</NavLink>
				to explore more ...
			</div>
		</div>
	);
}

export default Home;
