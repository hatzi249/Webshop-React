import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Movies, { IMovie } from './components/Movies/Movies';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';



function App() {
  const defaultValue: IMovie[] = [];
  const [cart, setCart] = useState(defaultValue);


  const updateCart =(movie: IMovie) =>{
    const moviesInCart = cart.slice();
    let alreadyInCart = false;
    moviesInCart.forEach((addedMovie) =>{
      if (addedMovie.id === movie.id) {
        addedMovie.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      moviesInCart.push({...movie, count: 1})
    }
    setCart(moviesInCart);
    console.log(moviesInCart);
  };


  const removeMovie = (movie: IMovie) => {
    const moviesInCart = cart.slice();
    let alreadyInCart = false;
    moviesInCart.forEach((addedMovie) =>{
      if (addedMovie.id === movie.id && addedMovie.count > 1) {
        addedMovie.count--;
        alreadyInCart = true;
      }
      setCart(moviesInCart);
    });
    if (!alreadyInCart) {
      const moviesInCart =cart.slice().filter((x) => x.id !== movie.id);
      setCart(moviesInCart);
    }
  }; 

  const clearCart = (addedMovie: IMovie[]) => {
    setCart([]);
  }


  return (
    <div className="App">
      <Router>
        <header>
          <Header movieValue={cart}></Header>
        </header>

        <main>
          <Switch>

            <Route path="/admin">
              <Admin></Admin>
            </Route>

            <Route path="/shoppingcart">
              <ShoppingCart movieValue={cart} clearCart={clearCart} 
              removeMovie={removeMovie}></ShoppingCart>              
            </Route>

            <Route path="/" exact={true}> 
              <Movies updateShoppingCart={updateCart}></Movies>
            </Route>

            <Route path="*" component={PageNotFound}></Route>

          </Switch>
        </main>

      </Router>
      
    </div>
  );
}

export default App;
