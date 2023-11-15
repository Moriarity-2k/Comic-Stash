import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import EachUser from "./Users";
import Spinner from "../../../ui/Spinner";
import { base } from "../../../App";

async function deleteUser(id) {
	const x = await axios.delete(`${base}/api/v1/users/${id}`, {
		withCredentials: "include",
	});

	console.log(x.data);

	return x.data.data;
}

function AdminUser() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["All-users"],
		queryFn: async () => {
			const x = await axios(`${base}/api/v1/users`, {
				method: "get",
				withCredentials: "include",
			});

			return x.data.data.users;
		},
	});

	const client = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: "user-delete",
		mutationFn: deleteUser,
		onSuccess: (data) => {
			toast.success("user deleted succesfully");
			client.invalidateQueries({ queryKey: "user-delete" });
			window.location.reload();
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
		},
	});

	if (error) return toast.error(error.message);
	else if (isLoading) return <Spinner />;
	else
		return (
			<div className=" text-sm text-purple-100 border-[#ffffff59] border">
				<div className=" text-orange uppercase text-xl font-bold grid border-[#ffffff59] border-b last:border-0 p-4  grid-cols-[1fr_2fr_1fr_1fr] gap-4 mx-4 my-4">
					<div>Name</div>
					<div>email</div>
					<div>role</div>
					<div>Modilfy</div>
				</div>
				{data &&
					data.map((user, i) => {
						return (
							<EachUser
								user={user}
								key={i + 1}
								handleDelete={mutate}
							/>
						);
					})}
			</div>
		);
}

export default AdminUser;
