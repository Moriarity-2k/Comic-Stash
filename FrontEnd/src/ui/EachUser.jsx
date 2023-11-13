import Modal from "./Modal";
import { Button } from "../pages/Categores";
import Ripple from "./Ripple";

function DeleteConfirm({ cancelButton, handleDelete, name, _id }) {
	return (
		<div className=" space-y-4">
			<div>
				Are you sure you want to delete <span className=" text-orange font-bold">{name}</span> permanently
			</div>
			<div className="space-x-8 text-white">
				<Button onClick={cancelButton} className="  bg-wierdBlue">
					Cancel <Ripple />
				</Button>
				<Button className="bg-orange" onClick={() => handleDelete(_id)}>
					Confirm <Ripple />
				</Button>
			</div>
		</div>
	);
}

function EachUser({ user, handleDelete }) {
	return (
		<div className="grid border-[#ffffff59] border-b last:border-0 p-3 grid-cols-[1fr_2fr_1fr_1fr] gap-4 mx-4 my-3">
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div className="uppercase">{user.role}</div>
			<div className="hover:cursor-pointer gap-4">
				{/* <CiEdit /> */}
				<Modal>
					<Modal.Open opens="deleteUser">
						{/* <MdDeleteForever /> */}
                        <Button className=" bg-[#ffffff59]">Delete</Button>
					</Modal.Open>

					<Modal.Window name="deleteUser">
						<DeleteConfirm
							handleDelete={handleDelete}
							name={user.name}
							_id={user._id}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}

export default EachUser;
