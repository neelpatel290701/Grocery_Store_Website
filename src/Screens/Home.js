import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import Footer from '../Components/Footer'
// import Carousel from '../Components/Carousel'
// import Login from './Login'

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://grocery-store-website-backend.vercel.app/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        // console.log(response[0] , response[1]);
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            {/* <div><Carousel /></div> */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit :"contain !imporatant"}}>

                <div className="carousel-inner " id='carousel'>
                    <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                        <form className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search"  onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                        </form>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            <div className='container' >

                {
                    foodCat !== []
                        ?
                        foodCat?.map((data) => {

                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    <hr />
                                    {
                                        foodItem !== [] ?
                                            foodItem.filter((item) => { return (item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) })
                                                .map((filterItems) => {
                                                    return (
                                                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                            <Card foodItem = {filterItems}
                                                                options={filterItems.options[0]}
                                                            ></Card>
                                                        </div>

                                                    )
                                                })
                                            : <div>No Such data Found </div>
                                    } 

                                 </div>

                             ) 
                         } 
                        )
                         : "" 


                 }


            </div>

            <div><Footer /></div>
        </div>
    )
}
