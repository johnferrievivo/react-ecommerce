import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const currentProduct = getProductById(id);

        if (!currentProduct) {
            navigate('/');
            return;
        }

        setProduct(currentProduct);
    }, [id]);

    if (!product) {
        return <h1>Loading...</h1>;
    }

    const productInCart = cartItems.find((item) => item.id === product.id);
    const productQuantity = productInCart ? `(${productInCart.quantity})` : '';

    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.image} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-detail-price">${product.price}</p>
                        <p className="product-detail-description">
                            {product.description}
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(product.id)}
                        >
                            Add to Cart {productQuantity}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
