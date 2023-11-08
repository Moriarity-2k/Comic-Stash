import { useState } from "react";

import { Button } from "./Categores";
import Ripple from "../ui/Ripple";
import AdminUser from "../Features/Admin/AdminUser";
import AdminComic from "../Features/Admin/AdminComic";

const AdminView = () => {
	const [view, setView] = useState("users");

	return (
		<div className="w-[90%] font-poppins text-white mx-auto mt-28  lg:mt-44 lg:max-w-[80%] xl:max-w-[80%]">
			<div className="text-2xl lg:text-[3rem] uppercase tracking-widest w-max border-orange border-b pb-4">
				Admin View
			</div>
			<div className="flex flex-col mt-12 lg:mt-16 lg:flex-row">
				<div className=" basis-1/4 uppercase lg:text-xl text-purple-300 flex lg:flex-col tracking-widest font-mono gap-8">
					<div
						style={{
							color: `${view === "users" ? "orchid" : ""}`,
						}}
						onClick={() => setView("users")}
					>
						<Button
							style={{
								backgroundColor: `${
									view === "users" ? "#ffffff21" : ""
								}`,
							}}
						>
							Users
							<Ripple />
						</Button>
					</div>
					<div
						style={{
							color: `${view === "comics" ? "orchid" : ""}`,
						}}
						onClick={() => setView("comics")}
					>
						<Button
							style={{
								backgroundColor: `${
									view === "comics" ? "#ffffff21" : ""
								}`,
							}}
						>
							Comics
							<Ripple />
						</Button>
					</div>
				</div>
				<div className="basis-3/4 mt-8 lg:mt-0">
					{view === "users" && <AdminUser />}
					{view === "comics" && <AdminComic />}
				</div>
			</div>
		</div>
	);
};

export default AdminView;
