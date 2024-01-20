import { configureStore} from "@reduxjs/toolkit";
import cryptoReducer from "../features/CryptoSlice";


export default configureStore({
    reducer: {
        crypto: cryptoReducer,
    }
})