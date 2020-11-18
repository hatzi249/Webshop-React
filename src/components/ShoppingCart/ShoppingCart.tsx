import Axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { IMovie } from '../Movies/Movies';
import './ShoppingCart.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface IChildProps {
    movieValue: IMovie[];
    removeMovie(movie: IMovie): void;
    clearCart(movie: IMovie[]): void;
}


export default function ShoppingCart(props: IChildProps) {
    const [customerEmail, setCustomerEmail] = useState('');

    
    function updateCustomerEmail(e:ChangeEvent<HTMLInputElement>){
        setCustomerEmail(e.target.value);
    }
    
    let totalPrice = props.movieValue.reduce((a, c) => a + c.price * c.count, 0)

    const value = props.movieValue;
    const clearMovies = (value: IMovie[]) => {
        props.clearCart(value);
    }

    let orderMovies = props.movieValue.map((movie: IMovie) => {
        return(
            {
             id: 0,
             productId: movie.id,
             product: null,
             amount: movie.count,
             orderId: 0
            }
        );  
    });
    
      async function checkOut() {
        
          let params = {
              id: 0,
              companyId: 3981,
              created: new Date(),
              createdBy: customerEmail,
              paymentMethod: "mastercard",
              totalPrice: props.movieValue.reduce((a, c) => a + c.price * c.count, 0),
              status: 0,
              orderRows: orderMovies
          }
          let res = await Axios.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
          params)

          clearMovies(value);
          console.log(res.data);
      };
      

    let cartMovies = props.movieValue.map((movie:IMovie) => {
        return (
            <div className="box"key={movie.id}>
                    <Card style={{ width: '18rem', height:'100%' }}>
                        <Card.Img variant="top" src={movie.imageUrl}/>
                        <Card.Body>
                            <Card.Title>{movie.count} x {movie.name}, {movie.price} kr"</Card.Title>
                            <Card.Text>
                                {movie.description}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>props.removeMovie(movie)}>
                            Delete</Button>
                        </Card.Body>
                    </Card>
            </div>
        )
    });

    return (
        <div>
            <div className="grid">
                {cartMovies}
            </div>
            <p>Please enter your email:</p>
            <input type="email" id="email" onChange={updateCustomerEmail}/>
            <h2>Total price: {totalPrice}kr</h2>
            <button type="button" className="checkout" onClick={()=>checkOut()}>
                Checkout
            </button>
        </div>
    )
};