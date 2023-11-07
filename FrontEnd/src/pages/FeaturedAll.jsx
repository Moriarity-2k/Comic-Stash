import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import EachCard from "../ui/EachCard";
import SpinnerMini from "../ui/SpinnerMini";

const Featured = () => {
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

	if (fetchStatus === "pending") return <SpinnerMini />;

	if (fetchError) throw new Error(fetchError.message);

	return (
		<div className="w-[98%] pt-4 pb-4 xl:max-w-[80%] font-poppins md:mx-auto">
			<div className="my-16 mx-auto">
				<div className="text-white font-mono transition-all duration-1000  flex items-center justify-between">
					<h1 className="pl-4 text-2xl font-bold md:text-3xl uppercase tracking-wide text-white">
						Featured
					</h1>
				</div>
				<div className="flex items-center flex-wrap gap-6 md:gap-10 ml-8 md:ml-4 last:justify-start justify-evenly">
					{fetchedBooks &&
						fetchedBooks.map((x) => {
                            console.log(x)
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
						})}
				</div>
			</div>
		</div>
	);
};

export default Featured;
