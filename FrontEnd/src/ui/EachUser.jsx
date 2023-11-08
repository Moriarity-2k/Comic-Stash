import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function EachUser({ user, handleDelete }) {
	const [viewConfirm, setViewConfirm] = useState(false);

	return (
		<div className="grid border-[#ffffff59] border-b last:border-0 p-3 grid-cols-[1fr_2fr_1fr_1fr] gap-4 mx-4 my-3">
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div className="uppercase">{user.role}</div>
			<div className="flex hover:cursor-pointer gap-4 text-xl items-center">
				<CiEdit />
				<MdDeleteForever onClick={() => setViewConfirm((x) => !x)} />
				{viewConfirm && (
					<button
						onClick={() => {
							setViewConfirm((x) => !x);
							handleDelete(user._id);
						}}
						className="text-sm px-3 text-black font-bold uppercase bg-red-300"
					>
						Confirm
					</button>
				)}
			</div>
		</div>
	);
}

export default EachUser;
