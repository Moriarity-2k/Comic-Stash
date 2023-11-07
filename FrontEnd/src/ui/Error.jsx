import { useNavigate, useRouteError } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";

function Error() {
	const navigate = useNavigate();
	const error = useRouteError();

    console.log(error)

	return (
		<div className="w-[90%] lg:max-w-[80%] text-white pt-6 pb-4 xl:max-w-[68%] font-poppins mx-auto">
			{/* <div className="mt-4 text-red-800"> */}
			<div className="space-y-6 border-red-300 p-8 flex flex-col w-full justify-center border-2">
				<p className="font-bold">Something went wrong 😢 !!! </p>
				<p className="font-bold text-red-800">
					{error?.message || error?.data}
				</p>
				<button
					className="border-1 gap-4 rounded-full w-max bg-green-600 text-white font-bold py-2 px-4 uppercase tracking-wider text-sm flex items-center"
					onClick={() => navigate('/')}
				>
					<BsArrowLeft />
					<p>back</p>
				</button>
			</div>
		</div>
	);
}

export default Error;
