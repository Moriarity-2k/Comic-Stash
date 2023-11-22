import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const PROJECT_URL =
	"https://firebasestorage.googleapis.com/v0/b/comicstash-99a6f.appspot.com/o/bookCovers%2F";

export const IMAGE_PUBLIC_TOKEN = "e2eb3365-d2a9-4689-af13-d7e96448271e";

function AppLayout() {
	return (
		<>
			<div
				className="min-h-[100vh] overflow-hidden bg-dark-100 "
				// style={{
				// 	backgroundImage:
				// 		"linear-gradient(to bottom, #072142, #061c37, #07182b, #061220, #020b16)",
				// }}
			>
				<Header />
				<div className="min-h-[77vh]">
					<Outlet />
				</div>
				<Footer />
			</div>
		</>
	);
}

export default AppLayout;
