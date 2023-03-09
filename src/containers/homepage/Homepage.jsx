import React from 'react';

import {Home } from '../../containers';
import {NavbarMain } from '../../components';

const Homepage = () => (
    <div className='homepage'>
        <div className="gradient__bg">
            <NavbarMain />
            <Home />
        </div>
    </div>
);

export default Homepage;
