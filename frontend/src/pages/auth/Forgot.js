import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from "./auth.module.scss"
import { Link } from 'react-router-dom'
import PasswordInput from "../../components/passwordInput/passwordInput"
import { AiOutlineMail } from 'react-icons/ai'

const Forgot = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const loginUser = (e) => {
        e.preventDefault();
        // Logic to login user               
    };

    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <AiOutlineMail size={35} color="#999" />
                    </div>
                    <h2>Forgot Password</h2>
                    
                    <form onSubmit={loginUser}>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        
                        <button type='submit' className='--btn --btn-primary --btn-block'>
                          Get Rest Email
                        </button>
                        <div className={styles.links}>
                        <p>
                        <Link to="/">- Home</Link>
                        </p>
                        <p>
                        <Link to='/login'>- Loign</Link>
                        </p>
                    </div>
                    </form>
                 
                   
                </div>
            </Card>
        </div>
    )
}

export default Forgot
