import {Component} from 'react';
import Loader from 'react-loader-spinner';
import Cookies from 'js-cookie';
import FiltersGroup from '../FiltersGroup';
import ProductCard from '../ProductCard';
import ProductsHeader from '../ProductsHeader';

import './index.css';

const categoryOptions = [
    {
        name: 'Duplex',
        categoryId: '1',
    },
    {
        name: 'Individual',
        categoryId: '2',
    },
    {
        name: 'Appartment',
        categoryId: '3',
    },
    {
        name: 'Villa',
        categoryId: '4',
    },
];

const sortbyOptions = [
    {
        optionId: 'PRICE_HIGH',
        displayText: 'Price (High-Low)',
    },
    {
        optionId: 'PRICE_LOW',
        displayText: 'Price (Low-High)',
    },
];

const ratingsList = [
    {
        ratingId: '4',
        imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
        ratingId: '3',
        imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
        ratingId: '2',
        imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
        ratingId: '1',
        imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
];

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inprogress: 'IN_PROGRESS',
};

class AllProductsSection extends Component {
    state = {
        productsList: [],
        apistatus: apiStatusConstants.initial,
        activeOptionId: sortbyOptions[0].optionId,
        activeCategoryId: '',
        searchInput: '',
        activeRatingId: '',
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        this.setState({
            apistatus: apiStatusConstants.inprogress,
        });
        const jwtToken = Cookies.get('jwt_token');

        const {
            activeOptionId,
            activeCategoryId,
            searchInput,
            activeRatingId,
        } = this.state;

        const url = 'https://us-real-estate.p.rapidapi.com/v2/for-rent?city=Detroit&state_code=MI&location=48278&limit=10&offset=0&sort=lowest_price&price_min=1000&price_max=3000&beds_min=1&beds_max=5&baths_min=1&baths_max=5&property_type=apartment&expand_search_radius=25&include_nearby_areas_slug_id=Union-City_NJ%2CHoward-Beach_NY&home_size_min=500&home_size_max=3000&in_unit_features=central_air&community_ammenities=garage_1_or_more&cats_ok=true&dogs_ok=true';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '2b580e3b61msh8efd0d01c6cf40ep1ec6d0jsn95e64476f5e3',
                'x-rapidapi-host': 'us-real-estate.p.rapidapi.com',
            },
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const fetchedData = await response.json();
                console.log(fetchedData);
                const updatedData = fetchedData.products.map(product => ({
                    title: product.title,
                    price: product.price,
                    id: product.id,
                    imageUrl: product.image_url,
                    rating: product.rating,
                }));
                this.setState({
                    productsList: updatedData,
                    apistatus: apiStatusConstants.success,
                });
            } else {
                this.setState({
                    apistatus: apiStatusConstants.failure,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({
                apistatus: apiStatusConstants.failure,
            });
        }
    };

    renderLoadingView = () => (
        <div className='products-loader-container'>
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    );

    renderFailureView = () => (
        <div className='products-error-view-container'>
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                alt="all-products-error"
                className='products-failure-img'
            />
            <h1 className='products-failure-heading-text'>Oops! Something Went Wrong</h1>
            <p className='products-failure-description'>
                We are having some trouble processing your request. Please try again.
            </p>
        </div>
    );

    changeSortby = activeOptionId => {
        this.setState({activeOptionId}, this.getProducts);
    };

    renderProductsListView = () => {
        const {productsList, activeOptionId} = this.state;
        const shouldShowProductsList = productsList.length > 0;
        return shouldShowProductsList ? (
            <div className='all-products-container'>
                <ProductsHeader 
                    activeOptionId={activeOptionId}
                    sortbyOptions={sortbyOptions}
                    changeSortby={this.changeSortby}
                />
                <ul className='products-list'>
                    {productsList.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className='no-products-view'>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className='no-products-img'
                    alt="no products"
                />
                <h1 className='no-products-heading'>No Products Found</h1>
                <p className='no-products-description'>
                    We could not find any products. Try other filters.
                </p>
            </div>
        );
    };

    renderAllProducts = () => {
        const {apistatus} = this.state;
        switch (apistatus) {
            case apiStatusConstants.success:
                return this.renderProductsListView();
            case apiStatusConstants.failure:
                return this.renderFailureView();
            case apiStatusConstants.inprogress:
                return this.renderLoadingView();
            default:
                return null;
        }
    };

    clearFilters = () => {
        this.setState(
            {
                searchInput: '',
                activeCategoryId: '',
                activeRatingId: '',
            },
            this.getProducts,
        );
    };

    changeRating = activeRatingId => {
        this.setState({activeRatingId}, this.getProducts);
    };

    changeCategory = activeCategoryId => {
        this.setState({activeCategoryId}, this.getProducts);
    };

    enterSearchInput = () => {
        this.getProducts();
    };

    changeSearchInput = searchInput => {
        this.setState({searchInput});
    };

    render() {
        const {activeCategoryId, searchInput, activeRatingId} = this.state;

        return (
            <div className='all-products-section'>
                <FiltersGroup 
                    searchInput={searchInput}
                    categoryOptions={categoryOptions}
                    ratingsList={ratingsList}
                    changeSearchInput={this.changeSearchInput}
                    enterSearchInput={this.enterSearchInput}
                    activeCategoryId={activeCategoryId}
                    activeRatingId={activeRatingId}
                    changeRating={this.changeRating}
                    changeCategory={this.changeCategory}
                    clearFilters={this.clearFilters}
                />
                {this.renderAllProducts()}
            </div>
        );
    }
}

export default AllProductsSection;
