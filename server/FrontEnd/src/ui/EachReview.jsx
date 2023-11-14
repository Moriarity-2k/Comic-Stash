import { FaRegStar, FaStar } from "react-icons/fa6";

const EachReview = ({x, i}) => {

	return (
        x && 
		<div
			className=" space-y-4 shadow-sm shadow-white border-[#ffffff73] px-4 py-2 border"
		>
			<h1 className="font-sm md:text-md font-bold text-white capitalize">
				{x.user.name}
			</h1>
			<div className="flex items-center gap-4">
				<div className=" text-[#ffffff94] text-sm">
					{new Date(x.postedAt).toDateString()}
				</div>
				<div className="flex items-center">
					{Array.from({ length: Math.round(+x.rating) }, (x, i) => {
						return (
							<FaStar key={i + 1} className=" text-wierdBlue" />
						);
					})}
					{Array.from(
						{ length: 5 - Math.round(+x.rating) },
						(x, i) => {
							return (
								<FaRegStar
									key={i + 1}
									className=" text-wierdBlue"
								/>
							);
						}
					)}
				</div>
			</div>
			<div className=" text-greySecondary">{x.review}</div>
		</div>
	);
};

export default EachReview;
