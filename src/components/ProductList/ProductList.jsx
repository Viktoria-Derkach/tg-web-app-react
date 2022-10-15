import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'CHICKEN PEPPERONI', price: 500, description: 'A classic American taste! Relish the delectable flavor of Chicken Pepperoni, topped with extra cheese'},
    {id: '2', title: 'CHICKEN FIESTA', price: 120, description: 'Grilled Chicken Rashers I Peri-Peri Chicken I Onion I Capsicum'},
    {id: '3', title: 'KEEMA DO PYAZA', price: 500, description: 'Delicious minced chicken keema topped with crunchy onions on your favourite cheesy pizza'},
    {id: '4', title: 'INDI CHICKEN TIKKA', price: 122, description: 'The wholesome flavour of tandoori masala with Chicken tikka I onion I red paprika I mint mayo'},
    {id: '5', title: 'CHICKEN DOMINATOR', price: 500, description: 'Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers'},
    {id: '6', title: 'MARGHERITA', price: 600, description: 'A hugely popular margherita, with a deliciously tangy single cheese topping'},
    {id: '7', title: 'PEPPY PANEER', price: 550, description: 'Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!'},
    {id: '8', title: 'CHEESE N CORN', price: 120, description: 'Cheese I Golden Corn | Cheese n Corn Pizza'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://stalwart-hamster-dcbff4.netlify.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Buy ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
