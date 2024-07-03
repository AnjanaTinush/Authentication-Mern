import React, { useState } from 'react'
import Card from "../../components/card/Card"
import profieImg from "../../assets/avatarr.png"
import "./ChangePassword.scss"
import PageMenu from '../../components/pageMenu/PageMenu'
import PasswordInput from '../../components/passwordInput/passwordInput'

const initialState = {
    oldPassword: "",
    password : "",
    password2 : "",
   
}

const ChangePassword = () => {

    const [formData,setFromData] = useState(initialState)

    const {oldPassword,password,password2} = formData

    const handleInputChange  = () => {}

  return (
    <>
    <section>
        <div className='container'>
            <PageMenu/>
            <h2>Change Password</h2>
<div className='--flex-start profile'>
    <Card cardClass={"card"}>
   <>
    
    <form>
        <p>
           <lable>Current Password :</lable> 
           <PasswordInput
                            placeholder="Old Password"
                            required
                            name="oldpassword"
                            value={password}
                            onChange={handleInputChange}
                        />
                        
        </p>
        <p>
           <lable>New Password :</lable> 
           <PasswordInput
                            placeholder="New Password"
                            required
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
        </p>
        <p>
           <lable>Confirm New Password :</lable> 
           <PasswordInput
                            placeholder="Confirm Password"
                            required
                            name="password2"
                            value={password2}
                            onChange={handleInputChange}
                        />
        </p>
        
       
        <bitton className='--btn --btn-danger --btn-block'>
            Change Password
        </bitton>
    </form>
   </>
    </Card>
</div>
        </div>
    </section>
        
    </>
  )
}

export default ChangePassword