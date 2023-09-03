import React , {useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';

export default function Signup() {

    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e)=>{

        e.preventDefault();
        const response = await fetch("https://grocery-store-website-backend.vercel.app/api/createuser", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          mode: "cors", 
          headers: {
            'Content-Type': 'application/json'
          },
     
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
                    alert("Enter Valid Credentials")
        }
        if(json.success){
                    navigate("../login")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

    return (
        <>
            <Navbar/>
            <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label text-white">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label text-white">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label text-white">Address</label>
                        <fieldset>
                            <input type="text" className="form-control" name='address' onChange={onChange} placeholder='"Click below for fetching address"'  aria-describedby="emailHelp" />
                        </fieldset>
                    </div>
                    <div className="m-3">
                        <button type="button" name="geolocation" className=" btn btn-success text-white">Click for current Location </button>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white"  >Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </>
    )
}
