import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, logout, openModal}) => {
    if (currentUser) {
        return (
            <div className='navbar-div'>
                <Link to='/'><div className='stereo-icon-div'>
                    <h1 className='stereo-icon'>(((Stereo)))</h1>
                </div></Link>
                <div className='navbar-buttons'>
                    <button className='sign-out-button' onClick={() => logout()}>Sign out</button>
                    <Link to={`/users/${currentUser.id}`}> my profile</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='navbar-div'>
                <Link to='/'><div className='stereo-icon-div'>
                    <h1 className='stereo-icon'>(((Stereo)))</h1>
                </div></Link>
                <div className='navbar-buttons'>
                    <button className='sign-in-button' onClick={()=> openModal('login')}>Sign in</button>
                    <button className='create-account-button' onClick={() => openModal('signup')}>Create account</button>
                </div>
            </div>

        )
    }
}

export default Navbar;