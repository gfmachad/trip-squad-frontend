import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { TripDetailsPage } from "./pages/TripDetails";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/trips/:tripId",
		element: <TripDetailsPage />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
