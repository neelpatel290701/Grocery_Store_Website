import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

import { Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { purple } from '@mui/material/colors';

export default function Navbar() {

    let data = useCart();
    const [cartView, setCartView] = useState(false);
    // const [darkmode , setdarkmode] = useState(false) ;
    const { colorMode, toggleColorMode } = useColorMode()

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme={colorMode === 'dark' ? 'dark' : undefined}>
                <div className="container-fluid">
                    <Link className="navbar-brand  fs-1 fst-bold " to="/">My gRo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                                    </li>
                                    : ""
                            }

                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                                    </li> : ""
                            }

                        </ul>
                        {/* <div className='mx-3'>
                                <input type="checkbox" class="checkbox" id="checkbox" onChange={ ()=>{setdarkmode(!darkmode)}} />
                                <label for="checkbox" class="checkbox-label">
                                <i class="fas fa-moon"></i>
                                <i class="fas fa-sun"></i>
                                <span class="ball"></span>
                                </label>
                                </div> */}
                        <Button className='btn mx-2' leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            size='md'
                            variant='solid'
                            colorScheme='purple'
                            backgroundColor={purple}
                            onClick={toggleColorMode}>
                            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                        </Button>

                        {


                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex mx-10  border-bottom-dark' >
                                    <Link className="btn bg-success text-white mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-danger text-white mx-1" to="/createuser">SignUp</Link>
                                </div>
                                :
                                <>
                                    <div className='btn btn-secondary  max-2 me-2' onClick={() => { setCartView(true) }}>
                                        My Cart{"  "}
                                        <Badge pill bg="black">{data.length}</Badge>
                                    </div>

                                    {cartView ? <Modal onClose={() => setCartView(false)}  ><Cart /></Modal> : null}

                                    <div className='btn btn-light text-danger max-3' onClick={handleLogout}>
                                        Logout
                                    </div>
                                </>
                        }

                        {/* btn btn-light */}

                    </div>

                </div>
            </nav>
        </div>
    )
}
