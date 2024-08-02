import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
    <>
    <Header />
    <div className='home-container'>
        <div className='home-content'>
            <h1 className='home-heading'>Houses That Get YOU Noticed</h1>
            <img src="https://github.com/KevinPatel04/Far-From-Home/blob/master/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png?raw=true"
            alt="Houses that get you noticed"
            className='home-mobile-img' />
            <p className='home-description'>
            Charming 3-bedroom house in a quiet neighborhood, featuring a spacious living area, modern kitchen, and a lovely backyard. Conveniently located near schools, parks, and shopping centers. Perfect for families or professionals seeking comfort and convenience.
            </p>
            <Link to="/products">
            <button type='button' className='shop-now-button'>Add Now</button>
            </Link>
        </div>
        <img src="https://github.com/KevinPatel04/Far-From-Home/blob/master/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png?raw=true"
        alt="Houses that get you noticed"
        className='home-desktop-img' />
    </div>
    </>
)

export default Home