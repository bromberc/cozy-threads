import images from '../Images/Images'

const products = [
    {id: 1, image: images.whiteDress, title: "White + Yellow Summer Dress", description: "Our High Quality Floral Summer Dress is made from hemp and cotton sourced through eco-friendly methods", price: 37.99},
    {id: 2, image: images.navyDress, title: "Casual Navy Day Dress", description: "Our High Quality Casual Navy Day Dress is made from bamboo fibers and linen sourced through eco-friendly methods", price: 29.99},
    {id: 3, image: images.jeanDress, title: "Denim Sleeveless Dress", description: "Our High Quality Denim Sleeveless Dress is made from denim sourced through eco-friendly methods", price: 34.99},
    {id: 4, image: images.blackAndWhiteDress, title: "Black + White Sleeveless Dress", description: "Our High Quality Sleeveless Dress is made from bamboo fibers and cotton sourced through eco-friendly methods", price: 27.99},
    {id: 5, image: images.greenShirt, title: "Short-Sleeve Shirt", description: "Our High Quality Sleeveless Dress is made from bamboo fibers and cotton sourced through eco-friendly methods", price: 17.99},
    {id: 6, image: images.pinkShirt, title: "Long-Sleeve Shirt", description: "Our High Quality Long Sleeve Crew Neck is made from bamboo fibers and cotton sourced through eco-friendly methods", price: 20.99},
    {id: 7, image: images.blackPants, title: "Full-Length Pants", description: "Our High Quality full-length pants are made from bamboo fibers and cotton sourced through eco-friendly methods", price: 24.99},
    {id: 8, image: images.blueHat, title: "Baseball Cap", description: "Our High Quality baseball cap is made from 100% cotton sourced through eco-friendly methods", price: 15.99},
    {id: 9, image: images.blackTankTop, title: "Tank Top", description: "Our High Quality Scoop Neck Tank Top is made from bamboo fibers sourced through eco-friendly methods", price: 10.99},
]

function ProductFeed({addToCart}) {
    return (
        <div id="home" className="page">
            <h2>Our Products</h2>
            <div id="productGrid" className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product">
                        <div className="product-image">
                            <img src={product.image} alt={product.title} /> 
                        </div>
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            {/* <div className='description-on-hover'> */}
                            <p>{product.description}</p>
                            {/* </div> */}
                            <p className="price">Price: ${product.price}</p>
                            <button onClick={() => addToCart(product)}>Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFeed;