import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
    <CartContext.Consumer>
        {value => {
            const {
                removeCartItem,
                incrementCartItemQuantity,
                decrementCartItemQuantity,
            } = value
            const {cartItemDetails} = props
            const {id, title, quantity, price, imageUrl} = cartItemDetails
            const onRemoveCartItem = () => {
                removeCartItem(id)
            }
            const onIncrementCartItemQty = () => {
                incrementCartItemQuantity(id)
            }
            const onDecrementCartItemQty = () => {
                decrementCartItemQuantity(id)
            }

            return (
                <li className='cart-item'>
                    <img className='cart-product-image' src={imageUrl} alt={title} />
                    <div className='cart-item-details-container'>
                        <div className='cart-product-title-container'>
                            <p className='cart-product-title'>{title}</p>
                        </div>
                        <div className='cart-quantity-container'>
                            <button
                            type="button"
                            className='quantity-controller-button'
                            onClick={onDecrementCartItemQty}
                            data-testid="minus"
                            >
                                <BsDashSquare color="#52606D" size={12} />
                            </button>
                            <p className='cart-quantity'>{quantity}</p>
                            <button
                            type="button"
                            className='quantity-controller-button'
                            onClick={onIncrementCartItemQty}
                            data-testid="plus">
                                <BsPlusSquare color="#52606D" size={12} />
                            </button>
                        </div>
                        <div className='total-price-remove-container'>
                            <p className='cart-total-price'>Rs {price * quantity}/-</p>
                            <button
                            className='remove-button'
                            type="button"
                            onClick={onRemoveCartItem}>Remove</button>
                        </div>
                    </div>
                    <button 
                    className='delete-button'
                    type="button"
                    onClick={onRemoveCartItem}
                    data-testid="remove">
                        <AiFillCloseCircle color="#616E7C" size={20} />
                    </button>
                </li>
            )
        }}
    </CartContext.Consumer>
)

export default CartItem