import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialStateWIshList = JSON.parse(localStorage.getItem("cart_items")) || {
	items: [],
};

const initialStateUser = JSON.parse(localStorage.getItem("u_config")) || {};

const initialStateCart = JSON.parse(localStorage.getItem("cart_M_items")) || {
	cartItems: [],
};

const initialStateAdress = JSON.parse(localStorage.getItem("_Address_")) || {};

// id , price
// const add_item = "addItem";

const wishSlice = createSlice({
	name: "wishlist",
	initialState: initialStateWIshList,
	reducers: {
		add_item: (state, action) => {
			state.items.push(action.payload);
			localStorage.setItem("cart_items", JSON.stringify(state));
		},
		remove_item: (state, action) => {
			state.items = state.items.filter((x) => {
				return x.id !== action.payload;
			});
			localStorage.setItem("cart_items", JSON.stringify(state));
		},
	},
});

const cartSlice = createSlice({
	name: "cartItems",
	initialState: initialStateCart,
	reducers: {
		add_cart: (state, action) => {
			// console.log(action.payload);

			const item = state.cartItems.find(
				(x) => x.id === action.payload.id
			);

			if (!item) {
				state.cartItems.push(action.payload);
			} else {
				state.cartItems = state.cartItems.map((x) => {
					if (x.id === action.payload.id) {
						return { ...x, quantity: action.payload.quantity };
					}
					return x;
				});
			}

			localStorage.setItem("cart_M_items", JSON.stringify(state));
		},
		remove_cart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => {
				return x.id !== action.payload;
			});
			localStorage.setItem("cart_M_items", JSON.stringify(state));
		},
	},
});

const addressSlice = createSlice({
	name: "Address",
	initialState: initialStateAdress,
	reducers: {
		set_address: (state, action) => {
			localStorage.setItem(
				"_Address_",
				JSON.stringify(action.payload)
			);
			return { ...action.payload };
		},
	},
});

const userSlice = createSlice({
	name: "User",
	initialState: initialStateUser,
	reducers: {
		user_login: (state, action) => {
			const x = { ...action.payload };
			localStorage.setItem("u_config", JSON.stringify(x));
			return x;
		},
		remove_user: () => {
			localStorage.removeItem("u_config");
			return {};
		},
	},
});

export const { add_item, remove_item } = wishSlice.actions;
export const { user_login, remove_user } = userSlice.actions;
export const { add_cart, remove_cart } = cartSlice.actions;
export const { set_address } = addressSlice.actions;

const store = configureStore({
	reducer: {
		wishReducer: wishSlice.reducer,
		userReducer: userSlice.reducer,
		cartReducer: cartSlice.reducer,
		addressReducer: addressSlice.reducer,
	},
});

export default store;
