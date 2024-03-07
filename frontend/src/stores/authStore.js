import create from "zustand";

const authStore = create((set) => ({
    loginForm: {
        email: "",
        password: "",
    },

    updateLoginForm: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            loginForm: {
                ...state.loginForm,
                [name]: value,
            },
        }));
    }
}));

export default authStore;
