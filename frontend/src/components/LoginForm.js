import React from 'react'
import authStore from '../stores/authStore'

export default function LoginForm() {
    const store = authStore();
  return (
    <form>
      <input onChange={store.updateLoginForm} value={store.loginForm.email} type="email" name="email" />
      <input onChange={store.updateLoginForm} value={store.loginForm.password} type="password" name="password" />
    <button type="submit">Login</button>

    </form>
  )
}
