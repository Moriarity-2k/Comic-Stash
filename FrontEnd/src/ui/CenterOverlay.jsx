import { IoClose } from "react-icons/io5";

import Overlay from "./Overlay";

function CenterOverlay({ title, About, valueFn }) {
	return (
		<>
			<div className=" fixed inset-0 text-orange flex items-center justify-center">
				<div className="z-10 w-[90%] mx-auto space-y-4 lg:max-w-[50%]">
					<div className="bg-blue font-bold text-lg flex px-4 items-center gap-4">
						<span className="inline-block">About this Ebook</span>
						<button onClick={valueFn}>
							<IoClose className="inline-block" />
						</button>
					</div>
					<blockquote className="text-wierdBlue pl-4">
						{About}
					</blockquote>
				</div>
				<Overlay valueFn={valueFn} />
			</div>
		</>
	);
}

export default CenterOverlay;
