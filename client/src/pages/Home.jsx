import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../ui/Spinner";
import EachCard from "../ui/EachCard";
import Featured from "../ui/Featured";
import { base } from "../App";

function Home() {
	const {
		data: fetchedBooks,
		error: fetchError,
		status: fetchStatus,
	} = useQuery({
		queryKey: ["All-books"],
		queryFn: async () => {
			const books = await axios(`${base}/api/v1/books`);
			return books.data.data.comics;
		},
	});

	if (fetchStatus === "pending") return <Spinner />;

	if (fetchError) throw new Error(fetchError.message);

	return (
		<div className="w-[95%] pt-4 pb-4 mt-14 lg:mt-20  mx-auto">
			<div className="my-16">
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
									slug={x.slug}
								/>
							);
						}
					}}
				/>

				<Featured
					name="featured"
					fetchedBooks={fetchedBooks}
					render={(x, i) => {
						if (x.ratingsAverage >= 4.1) {
							return (
								<EachCard
									key={x._id}
									Image={x.image}
									ratingsAverage={x.ratingsAverage}
									price={x.price}
									id={x._id}
									name={x.name}
									slug={x.slug}
								/>
							);
						}
					}}
				/>

				<Featured
					name="most popular"
					fetchedBooks={fetchedBooks}
					render={(x) => {
						if (x.publishedAt.split("-")[0] < 2022) {
							return (
								<EachCard
									key={x._id}
									Image={x.image}
									ratingsAverage={x.ratingsAverage}
									price={x.price}
									id={x._id}
									name={x.name}
									slug={x.slug}
								/>
							);
						}
					}}
				/>
			</div>
		</div>
	);
}

export default Home;
