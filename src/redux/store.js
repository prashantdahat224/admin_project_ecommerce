import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import authReducer from "./authSlice";
import userDataReducer from "./userDataSlice";
import productReducer from "./productSlice";
import adminReducer from "./adminSlice";

const storage = createWebStorage("local");

const persistConfig = {
  key: "admin",
  storage,
};

const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userData: userDataReducer,
    products: productReducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);



// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage

// import authReducer from "./authSlice";
// import userDataReducer from "./userDataSlice";
// import productReducer from "./productSlice";
// //import wishlistReducer from "./wishlistSlice";
// import adminReducer from "./adminSlice";

// const persistConfig = {
//   key: "admin",       // only persist the admin slice
//   storage,
//  };

// const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     userData: userDataReducer,
//     products: productReducer,
//     //wishlist: wishlistReducer,
//     admin: persistedAdminReducer,
//   },
// });

// export const persistor = persistStore(store);
