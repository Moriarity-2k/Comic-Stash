import { Button } from "../../pages/Categores";
import Modal from "../../ui/Modal";
import Ripple from "../../ui/Ripple";
import AdminBook from "./AdminBook";

function AdminComic() {
	return (
		<Modal>
			<Modal.Open opens="addNewComicWindow">
				<Button className=" bg-wierdBlue px-4 py-2">
					<Ripple />
					Add New Comic
				</Button>
			</Modal.Open>

			<Modal.Window name="addNewComicWindow">
				<AdminBook />
			</Modal.Window>
		</Modal>
	);
}

export default AdminComic;
