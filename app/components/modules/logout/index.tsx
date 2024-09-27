import React from 'react'
import DjangoService from "@/app/store/services/DjangoService";


export default function Logout() {
  const [ logoutUser ] = DjangoService.useGetLogoutMutation()

  const logoutUser1 = () => {
    localStorage.removeItem("authToken")
  }
  return (
    <div>
      <input type={"submit"} onClick={logoutUser1} />
    </div>
  )
}