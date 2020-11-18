import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { IMovie } from '../Movies/Movies';

interface IChildProps {
    movieValue: IMovie[];
}


export default function Header(props: IChildProps) {


    return (
        <nav>
            <ul>
                <Link to='/'>
                    <li>Main</li>
                </Link>
                <Link to='/shoppingcart'>
                    <li>Shopping Cart: {props.movieValue.length}</li>
                </Link>
                <Link to='/admin'>
                    <li>Admin</li>
                </Link>
            </ul>
        </nav>
    );
}
