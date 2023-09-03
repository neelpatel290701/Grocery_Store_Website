import React , {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
    const handleSubmit = async (e)=>{

        e.preventDefault();
        const response = await fetch("https://grocery-store-website-backend.vercel.app/api/loginuser", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
     
          body: JSON.stringify({email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
                    alert("Enter Valid Credentials")
        }

        if(json.success){
                localStorage.setItem("userEmail" , credentials.email) ;
                localStorage.setItem("authToken" , json.authToken) ;
                console.log(localStorage.getItem("authToken")) ;
                navigate("/");
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
                <label htmlFor="email" className="form-label text-white">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            
            <div className="m-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-white"  >Password</label>
                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger">I'm a new user</Link>
        </form>
    </div>
</>
  );
}
