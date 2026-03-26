import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { supabase } from "../supabaseClient";
  

// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetchWishlist",
//   async (userId) => {
//     const response = await fetch(`${API_URL}/wishlist`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, action: "fetch" }),
//     });

//     const result = await response.json();
//     if (result.error) throw new Error(result.error);

//     return result.items;
//   }
// );
   

// export const toggleWishlist = createAsyncThunk(
//   "wishlist/toggleWishlist",
//   async ({ userId, productId }) => {
//     const response = await fetch(`${API_URL}/wishlist`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, productId, action: "toggle" }),
//     });

//     const result = await response.json();
//     if (result.error) throw new Error(result.error);

//     return result; // { productId, action: "add" | "remove" }
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     items: [],
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch wishlist
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchWishlist.rejected, (state) => {
//         state.loading = false;
//       })

//       // Optimistic toggle
//       .addCase(toggleWishlist.pending, (state, action) => {
//         const { productId } = action.meta.arg;
//         const exists = state.items.includes(productId);

//         if (exists) {
//           state.items = state.items.filter((id) => id !== productId);
//         } else {
//           state.items.push(productId);
//         }
//       })

//       // Rollback if error
//       .addCase(toggleWishlist.rejected, (state, action) => {
//         const { productId } = action.meta.arg;
//         const exists = state.items.includes(productId);

//         if (exists) {
//           state.items = state.items.filter((id) => id !== productId);
//         } else {
//           state.items.push(productId);
//         }
//       });
//   },
// });

//export default wishlistSlice.reducer;
