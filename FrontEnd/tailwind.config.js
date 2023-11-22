/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// primary: {
				// 	100: "#FFF1E6",
				// },
				primary2: {
					400: "#6e26eb",
					500: "#5b0be6",
				},
				dark: {
					100: "#000000",
					200: "#0F1117",
					300: "#151821",
					400: "#212734",
					500: "#101012",
				},
				light: {
					900: "#FFFFFF",
					800: "#F4F6F8",
					850: "#FDFDFD",
					700: "#DCE3F1",
					500: "#7B8EC8",
					400: "#858EAD",
				},
				"accent-blue": "#1DA1F2",
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
