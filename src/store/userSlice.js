import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	token:null,
    products:[],
    cart:[],
    wishlist:[]
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
        checkData(state,action){
            state.username = localStorage.getItem('user')
            state.token = localStorage.getItem('token')
            state.cart = JSON.parse(localStorage.getItem('cart'))
            state.wishlist = JSON.parse(localStorage.getItem('wishlist'))
            return state
        },
		setLogin(state, action) {
			const { username, token } = action.payload.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', username);
            if(!localStorage.getItem('cart')){
                localStorage.setItem('cart',JSON.stringify([]))
                localStorage.setItem('wishlist',JSON.stringify([]))
            }else{
                state.cart = JSON.parse(localStorage.getItem('cart'))
                state.wishlist = JSON.parse(localStorage.getItem('wishlist'))
            }
            state.username = username;
            state.token = token;
            return state
		},
        setProduct(state,action){
            const {products} = action.payload;
            console.log(products,'dfdf')
            state.products = products
            return state
        },
        setWishlist(state,action){
            const {product} = action.payload;
            const found = state.wishlist.find((pro)=>pro.id == product.id)
            if(found)
            return state
            const {id,title,price,stock,thumbnail} = product
            state.wishlist.push({
                id,title,price,stock,thumbnail
            })
            localStorage.setItem('wishlist',JSON.stringify(state.wishlist))
            return state
        },
        removeWishedProduct(state,action){
            const {id} = action.payload;
            const filteredWishlist = state.wishlist.filter((pro)=>pro.id != id)
            state.wishlist = filteredWishlist
            localStorage.setItem('wishlist',JSON.stringify(filteredWishlist))
            return state
        },
        setCart(state,action){
            const {product,count} = action.payload;
            // state.products[product.id].stock -= count;
            const found = state.cart.findIndex((pro)=>product.id == pro.id)
            if(found != -1){
                state.cart[found].count = parseInt(state.cart[found].count) + parseInt(count);
            }else{
                const {id,title,price,thumbnail,description} = product
                state.cart.push({
                    id,title,price,count,thumbnail,description
                })
            }
            localStorage.setItem('cart',JSON.stringify(state.cart))
            return state
        },
        removeCartedProduct(state,action){
            const {id} = action.payload;
            const filteredCart = state.cart.filter((pro)=>pro.id != id)
            state.cart = filteredCart
            localStorage.setItem('cart',JSON.stringify(filteredCart))
            return state
        },
		clearLogin(state, action) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
			return { ...initialState };
		},
	},
});


export const userActions = userSlice.actions;
export const userReducers = userSlice.reducer;

export const productData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			try {
                const res = await fetch(import.meta.env.VITE_BACKEND+'/products?limit=100', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const data = await res.json()
                // console.log(data,'yggdh')
                return data.products
            } catch (err) {
                return err
            }
		};

		const products = await fetchData();
		await dispatch(userActions.setProduct({
            products
        }));
	};
};