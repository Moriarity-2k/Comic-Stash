/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				orange: "#ff4d5a",
				white: "#fff",
				darkNavy: "#072142",
				greySecondary: "#6c757d",
				greyPrimary: "#6c757d",
				// primary: "#8f00ff",
				primary: "#512888",
				lightGrey: "#80808079",
				btnColor: "#ff4d5a",
				wierdBlue: "#0179ca",
			},
			fontFamily: {
				poppins: ["Poppins"],
			},
		},
	},
	plugins: [],
};

// tracking -> letter spacing
// lineheight -> leading

// Modifier	Media query
// max-sm	@media not all and (min-width: 640px) { ... }
// max-md	@media not all and (min-width: 768px) { ... }
// max-lg	@media not all and (min-width: 1024px) { ... }
// max-xl	@media not all and (min-width: 1280px) { ... }
// max-2xl	@media not all and (min-width: 1536px) { ... }
