import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    // get post
    posts: [],
    errorStatus: false,
    error: "",
    loading: false,

    // add post
    addDataLoading: false,
    addData: [],
    addDataErrorStatus: false,
    addDataErrorMessage: ""
}


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (payload) => {
    console.log("Inside entered action");
    const response = await axios.get(POSTS_URL);
    console.log("Inside action response", response);
    return response.data
})

// export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
//     const response = await axios.post(POSTS_URL, initialPost)
//     return response.data
// })

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        resetFetchPosts(state, action) {
            state.posts = [];
            state.errorStatus = false;
            state.error = "";
            state.loading = false;
        },
        addSomeData(state, action) {
            state.addData.push("Hi")
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                console.log("Inside pending", action)
                state.errorStatus = false;
                state.error = "";
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log("Inside fulfilled", action)
                state.errorStatus = false;
                state.error = "";
                state.loading = false;
                state.posts = action.payload
                console.log("Inside fulfilled payload", action.meta.arg)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log("Inside error", action)
                state.errorStatus = true;
                state.loading = false;
                state.error = action.error.message
                console.log("Inside error payload", action.meta.arg)
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostserrorStatus = (state) => state.posts.errorStatus;
export const getPostsErrorMessage = (state) => state.posts.error;
export const getLoading = (state) => state.posts.loading;

export const { resetFetchPosts, addSomeData } = postsSlice.actions;

export default postsSlice.reducer