import React, { useState } from 'react'
import Card from "../../components/card/Card"
import profieImg from "../../assets/avatarr.png"
import "./Profile.scss"

const initialState = {
    name: "Anjana",
    email : "anjana@gmai.com",
    phone : "",
    bio : "",
    photo : "",
    role: "",
    isVerified : false
}

const Profile = () => {

    const [profile,setProfilr] = useState(initialState)

const handleImageChange = () =>{

}

const handleInputChange = () =>{}

  return (
    <>
    <section>
        <div className='container'>
            <h2>Profile</h2>
<div className='--flex-start profile'>
    <Card cardClass={"card"}>
   <>
    <div className='profile-photo'>
        <div> <img src={profieImg} alt='profileimg'/>
        <h3>Role : Admin</h3>
        </div>
  
   
    </div>
    <form>
        <p>
           <lable>Change photo :</lable> 
           <input 
           type='file'
           accept='image/*'
           name='image'
           onChange={handleImageChange}/>
        </p>
        <p>
           <lable>Name :</lable> 
           <input 
           type='text'
           name='name'
           value={profile.name}
           onChange={handleInputChange}/>
        </p>
        <p>
           <lable>Email :</lable> 
           <input 
           type='email'
           name='email'
           value={profile.email}
           onChange={handleInputChange}
           disabled/>
        </p>
        <p>
           <lable>Phone :</lable> 
           <input 
           type='text'
           name='phone'
           value={profile.phone}
           onChange={handleInputChange}
           />
        </p>
        <p>
           <lable>Bio :</lable> 
           <textarea
           name='bio'
           value={profile.bio}
           onChange={handleInputChange}
           color='30' rows={10}
           >
           </textarea>
        </p>
        <bitton className='--btn --btn-primary --btn-block'>
            Update Profiles
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

export default Profile