import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MainContext } from '../context/context';
import Header from '../components/Header';

const Products = (props) => {
  const { products, setProducts } = useContext(MainContext);
  let ini = [];
  if(localStorage.getItem('carts')) {
    ini = (JSON.parse(localStorage.getItem('carts')));
  }
  const [carts, setCarts] = useState(ini);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedIn, setLoggedIn] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  let cartIndex = carts.findIndex((e) => currentUser ? e.user === currentUser.email : -1);
  useEffect(() => {
    let headers;
    if(currentUser){
      if(cartIndex < 0) {
        setCarts([...carts, { user: currentUser.email, list: [] }]);
        localStorage.setItem('carts', JSON.stringify(carts));
        cartIndex = carts.findIndex((e) => e.user === currentUser.email);
      }
    headers = new Headers({
      "Authorization": currentUser.token
    })}
    fetch('http://localhost:3001/products', { headers })
    .then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
    .then((data) => setProducts(data))
    .catch((err) => setLoggedIn(false))
  }, [])

  useEffect(() => {
    if(carts[cartIndex])
    setTotalPrice(carts[cartIndex].list.reduce((acc, e) => acc + Number(e.price)*Number(e.qty), 0));
  }, [carts])

  const addProduct = (product) => {
    const cartItemIndex = carts[cartIndex].list.findIndex((e) => e.id === product.id);
    const qty = Number(document.getElementById(`id-${product.id}-qty`).innerHTML);
    if(cartItemIndex >= 0){
      setCarts([ ...carts, carts[cartIndex].list[cartItemIndex].qty += 1 ])
      document.getElementById(`id-${product.id}-qty`).innerHTML = qty + 1;
      return localStorage.setItem('carts', JSON.stringify(carts));
    }
    setCarts([...carts, carts[cartIndex].list.push({...product, qty: 1})]);
    localStorage.setItem('carts', JSON.stringify(carts));;
    document.getElementById(`id-${product.id}-qty`).innerHTML = qty + 1;
  };

  const removeProduct = (product) => {
    const cartItemIndex = carts[cartIndex].list.findIndex((e) => e.id === product.id);
    const qty = Number(document.getElementById(`id-${product.id}-qty`).innerHTML);
    if(cartItemIndex < 0) return;
    if((carts[cartIndex].list[cartItemIndex].qty - 1) === 0) {
      const newList = carts[cartIndex].list.filter((e) => e.id !== product.id);
      setCarts([...carts, carts[cartIndex].list = newList])
      document.getElementById(`id-${product.id}-qty`).innerHTML = qty - 1;
      return localStorage.setItem('carts', JSON.stringify(carts));
    }
    setCarts([...carts, carts[cartIndex].list[cartItemIndex].qty -= 1]);
    document.getElementById(`id-${product.id}-qty`).innerHTML = qty - 1;
    localStorage.setItem('carts', JSON.stringify(carts));
  }
  if(!loggedIn) return <Redirect to="/login" />
  return (
    <div>
      <Header title='TryBeer' />
      {products.map((product, ind) =>{
        let index;
        if (carts[cartIndex] && carts[cartIndex].list) index = carts[cartIndex].list.findIndex((e) => e.id === product.id);
        return (<div>
          <h3 data-testid={`${ind}-product-name`}>{product.name}</h3>
          <img data-testid={`${ind}-product-img`} src={product.urlImage} width='125px' />
          <h4 data-testid={`${ind}-product-price`}>{`R$ ${product.price.toFixed(2).toString().replace('.', ',')}`}</h4>
          <button type="button" data-testid={`${ind}-product-minus`} onClick={() => removeProduct(product)}>-</button>
          <span id={`id-${product.id}-qty`} data-testid={`${ind}-product-qtd`}>
            { (carts[cartIndex] && carts[cartIndex].list[index]) ? carts[cartIndex].list[index].qty : 0}
          </span>
          <button type="button" data-testid={`${ind}-product-plus`} onClick={() => addProduct(product)}>+</button>
        </div>)}
      )}
      <div style={{
        position: "fixed", backgroundColor:"green",
        height:"50px", bottom:"0", width:"100%", color:"white"
        }}>
          <p data-testid="checkout-bottom-btn-value">{`R$ ${(Math.round(totalPrice*100)/100).toFixed(2).toString().replace('.', ',')}`}
          <Link to="/checkout">
            <button data-testid="checkout-bottom-btn" disabled={totalPrice===0}>Ver Carrinho</button>
          </Link>
          </p>
      </div>
    </div>
  )
};

export default Products;