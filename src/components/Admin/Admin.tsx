import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'

interface IOrder {
    id: number;
    createdBy: string;
    totalPrice: number;
}

export default function Admin() {
    const defaultValue: IOrder[] = [];
    const [orders, setOrders] = useState(defaultValue);

    useEffect(() => {

        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=3981')
            .then(result => {
                setOrders(result.data);
            });
    }, []);

    async function deleteOrder(id: number) {

        axios.delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`)
            .then(result => {
                console.log(result);
                const filteredOrders = orders.filter(item => item.id !== id);
                setOrders(filteredOrders);
            });
    };

    let ordersHtml = orders.map((orders: IOrder) => {
        
        return (
        <ul key={orders.id}>
            <li>Order id:{orders.id}</li>
            <li>Order created by:{orders.createdBy}</li>
            <li>Total price is:{orders.totalPrice}</li>
            <button type='button' onClick={()=>deleteOrder(orders.id)}>Delete order</button>
        </ul>
        );
    });

    return (
        <div>
        {ordersHtml}
        </div>
    );
};