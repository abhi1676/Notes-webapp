import { useEffect } from "react"
import authStore from "../stores/authStore";

export default function LogoutPage() {
    const store = authStore();

    useEffect(() => {
      store.logout();  
    }, []);
  return (
    <div>YOU ARE LOGGED OUT</div>
  )
}
