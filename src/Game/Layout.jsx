import React from 'react';
import Body from './Body/Body';
import Header from './Header';
import Help from './Help';
import Credits from './Credits';
import Hint from './Hint';
import Divider from './Divider';
import './main.scss';

const Layout = () => {
    return (
        <div className="container">
            <Header />
            <Hint />

            <Body />

            <Help />
            <Divider />
            <Credits />
        </div>
    );
};

export default Layout;
