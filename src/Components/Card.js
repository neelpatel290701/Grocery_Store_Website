import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    // console.log(options);
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    let foodItem = props.foodItem;
    // console.log(props.foodItem);
    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return 
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })

    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div >
            <div className="card mt-5 "  style={{ width: "18rem", maxHeight: "362px"}} >
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description}</p>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>)
                            })}
                        </select>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map(data => {

                                    return (<option key={data} value={data}>{data}</option>)
                                })
                            }
                        </select>

                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                        ₹ {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className={'btn bg-dark text-white justify-center mx-2'} onClick={handleAddToCart} >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
