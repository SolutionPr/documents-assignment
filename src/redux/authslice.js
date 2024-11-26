import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const BASE_URL = "http://35.154.171.148:8019"

const initialState = {
    isLoading: false,
    listingdata: []
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        filelist: (state, action) => {
            state.listingdata = action.payload;
        },
    },
});

export const { filelist } = authSlice.actions;

export default authSlice.reducer;


// --------------- upload file api ----------------

export function Upload_File(file, setFile, dispatch) {
    return async () => {
        const formdata = new FormData();
        formdata.append("file", file);

        try {
            const response = await axios.post(
                `${BASE_URL}/api/document/`,
                formdata
            );
            if (response?.status === 201) {
                setFile(null)
                dispatch(Get_Files(dispatch))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
}


// --------------- get all data api ----------------

export function Get_Files(searchText = '', page = null) {
    return async (dispatch) => {
        const search = (typeof searchText === 'string' ? searchText : '').trim();

        let url = `${BASE_URL}/api/document/`;

        if (search) {
            url = `${BASE_URL}/api/document/?search=${encodeURIComponent(search)}`;
        }

        if (page) {
            url += search ? `&page=${page}` : `?page=${page}`;
        }

        try {
            const response = await axios.get(url);
            if (response?.status === 200) {
                dispatch(filelist(response.data));
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'An error occurred while fetching the data';
            toast.error(errorMessage);
        }
    };
}

// --------------- delete file api ----------------

export function delete_file(id, dispatch) {
    return async () => {
        try {
            const response = await axios.request({
                url: `${BASE_URL}/api/document/${id}`,
                method: "DELETE",
            });
            if (response?.status === 200) {
                dispatch(Get_Files(dispatch))
                toast.success(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
}









