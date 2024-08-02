import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
    {
        id: 'CARD',
        displayText: 'Card',
        isDisabled: true,
    },
    {
        id: 'NET BANKING',
        displayText: 'Net Banking',
        isDisabled: true,
    },
    {
        id: 'WALLET',
        displayText: 'Wallet',
        isDisabled: true,
    },
    {
        id: 'CASH ON DELIVERY',
        displayText: 'Cash on Delivery',
        isDisabled: false,
    },
]

const Payment = () => {
    const {cartList} = useContext(CartContext)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)

    const updatePaymentMethod = event => {
        const {id} = event.target 
        setPaymentMethod(id)
    }

    const onPlaceOrder = () => setIsOrderPlaced(true)
    const getTotalPrice = () => cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const renderPaymentMethodsInput = () => (
        <ul className='payment-method-inputs'>
            {paymentOptionsList.map(eachMethod => (
                <li key={eachMethod.id} className='payment-method-input-container'>
                    <input 
                    className='payment-method-input'
                    id={eachMethod.id}
                    typr="radio"
                    name="paymentMethod"
                    disabled={eachMethod.isDisabled}
                    onChange={updatePaymentMethod} />
                    <label className={`payment-method-label ${eachMethod.isDisabled ? 'disabled-label' : ''}`}
                    htmlFor={eachMethod.id}>{eachMethod.displayText}</label>
                </li>
            ))}
        </ul>
    )

    return (
        <div className='payments-container'>
            {isOrderPlaced ? (
                <p className='success-message'>Your booking has been placed successfully</p>
            ) : (
                <>
                <h1 className='payments-heading'>Payments Details</h1>
                <p className='payments-sub-heading'>Payment Method</p>
                {renderPaymentMethodsInput()}
                <div className='order-details'>
                    <p className='payments-sub-heading'>Booking details:</p>
                    <p>Quantity: {cartList.length}</p>
                    <p>Total Price: RS {getTotalPrice()}/-</p>
                </div>
                <button 
                disabled={paymentMethod === ''}
                type="button"
                className='confirm-order-button'
                onClick={onPlaceOrder}>Confirm Booking</button>
                </>
            )}
        </div>
    )
}

export default Payment