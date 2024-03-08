import axios from "axios";
import { create } from "zustand";

const authStore = create((set) => ({

    loggedIn: null, 

    loginForm: {
        email: "",
        password: "",
    },

    signupForm: {
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
    },

    updateSignupForm: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            signupForm: {
                ...state.signupForm,
                [name]: value,
            },
        }));
    },

    login: async () => {
      

      const {loginForm} = authStore.getState();

     const res = await  axios.post("http://localhost:3001/login", loginForm, {withCredentials: true});
     
     set({ loggedIn: true,
    loginForm: {
        email: "",
        password: "",
    } });
     console.log(res);

     
    },
        checkAuth: async () => {
            try{
                await axios.get("http://localhost:3001/check-auth", { withCredentials: true }) 
           set({loggedIn: true });
            }
            catch(err)
            {
                set({loggedIn: false });

            }
           
        },

        signup: async() => {
            const { signupForm } = authStore.getState();
            const res = await axios.post("http://localhost:3001/signup", signupForm,{withCredentials: true })
            
            set({
                signupForm: {
                    email: "",
                    password: "",
                },
            })
            
            console.log(res);
        },

        logout: async() =>
        {
            await axios.get("http://localhost:3001/logout",{withCredentials: true})
            set({ loggedIn: false})
        },

}));

export default authStore;
