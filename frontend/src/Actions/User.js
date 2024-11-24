import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,  // Ensure cookies are sent with requests
});


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });

        const { data } = await api.post(
            "/api/auth/login",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });

        const { data } = await api.get("/api/auth/me");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest",
        });

        await api.get("/api/auth/logout");

        dispatch({
            type: "LogoutUserSuccess",
        });
    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const registerUser = (name, email, password, phone) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest",
        });

        const { data } = await api.post(
            "/api/auth/register",
            { name, email, password, phone },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
        });
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadProductsRequest",
        });

        const { data } = await api.get("/api/product/feed");

        dispatch({
            type: "LoadProductsSuccess",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "LoadProductsFailure",
            payload: error.response.data.message,
        });
    }
};


export const addProduct = (name, price, description, category, stock, image) => async (dispatch) => {
    try {
        dispatch({
            type: "AddProductRequest",
        });

        const { data } = await api.post(
            "/api/product/create",
            { name, price, description, category, stock, image },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        alert('Product added successfully');
        dispatch({
            type: "AddProductSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "AddProductFailure",
            payload: error.response.data.message,
        });
    }
};