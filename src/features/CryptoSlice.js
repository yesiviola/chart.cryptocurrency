import { createSlice } from "@reduxjs/toolkit";



export const cryptoSlice = createSlice({
    name: "crypto",
    initialState: {
        selectedCoins: ["bitcoin", "ethereum", "cardano", "litecoin", "dogecoin", "ripple"],
        selectedCoin: '',
    },
    reducers: {
        addCoin: (state, action) => {
            state.selectedCoins.push (action.payload);
           },
        },
    });

export const {   addCoin } = cryptoSlice.actions;
export const selectCrypto = (state) => state.crypto.selectedCoins

export default cryptoSlice.reducer;