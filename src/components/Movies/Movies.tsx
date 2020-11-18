import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movies.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export interface IMovie {
    id: number;
    name: string;
    description:string;
    price: number;
    imageUrl: string;
    year: number;
    count: number;
};

interface IMovieProps {
    updateShoppingCart(movie: IMovie): void;
}

export default function Movies(props: IMovieProps) {
    const defaultValue: IMovie[] = [];
    const [movies, setMovies] = useState(defaultValue);

    
    useEffect(() => {

        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
            .then(result => {
                setMovies(result.data);
            });
    }, []);

    
    function addToCart(movie: IMovie) {
        props.updateShoppingCart(movie)
    }
    

    let moviesHtml = movies.map((movie:IMovie) => {
        return (
            <div key={movie.id} className="box">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.imageUrl}/>
                    <Card.Body>
                        <Card.Title>{movie.name}{", "}{movie.price}{" kr"}</Card.Title>
                        <Card.Text>
                            {movie.description}
                        </Card.Text>
                        <Button variant="primary" onClick={() => addToCart(movie)}>
                        Add to cart</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    })
    
    return (
        <div className="grid">  
            {moviesHtml}
        </div>
    );
}