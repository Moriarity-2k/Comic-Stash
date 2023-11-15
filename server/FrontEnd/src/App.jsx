import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import store from "./store";

import Login from "./pages/Login";
import CreateAccountF from "./pages/CreateAccountPage";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ForPassword from "./pages/ForPassword";
import UserAccount from "./pages/UserAccount";
import ShowCase from "./pages/ShowCase";
import Categores from "./pages/Categores";
import WishList from "./pages/WishList";
import CartP from "./pages/CartP";
import AddressFill from "./pages/AddressFill";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import AdminView from "./pages/AdminView";
import Contact from "./Features/Contact Form/Contact";

// export const base = "http://localhost:3000";
export const base = "";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
				errorElement: <Error />,
			},
			{
				path: "/admin-control",
				element: <AdminView />,
				errorElement: <Error />,
			},

			{
				path: "/showcase/:showParam",
				element: <ShowCase />,
				errorElement: <Error />,
			},
			{
				path: "/categories",
				element: <Categores />,
				errorElement: <Error />,
			},
			{
				path: "/books/:id",
				element: <Product />,
				errorElement: <Error />,
			},
			{
				path: "/login",
				element: <Login />,
				errorElement: <Error />,
			},
			{
				path: "/createaccount",
				element: <CreateAccountF />,
				errorElement: <Error />,
			},
			{
				path: "/forgotPassword",
				element: <ForPassword />,
				errorElement: <Error />,
			},
			{
				path: "/my-account",
				element: <UserAccount />,
				errorElement: <Error />,
			},
			{
				path: "/wishlist",
				element: <WishList />,
				errorElement: <Error />,
			},
			{
				path: "/address",
				element: <AddressFill />,
				errorElement: <Error />,
			},
			{
				path: "/cart",
				element: <CartP />,
				errorElement: <Error />,
			},
			{
				path: "/contactUs",
				element: <Contact />,
				errorElement: <Error />,
			},
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<RouterProvider router={router} />
				<Toaster
					position="top-center"
					gutter={8}
					containerStyle={{
						margin: "4px 6px",
					}}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 4000,
						},
						style: {
							fontSize: "1rem",
							padding: "0.6rem",
							border: "1px solid green ",
						},
					}}
				/>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
