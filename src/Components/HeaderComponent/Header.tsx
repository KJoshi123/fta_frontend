import React from 'react';
import './Headers.css';

export interface HeaderProps{

};

const Header : React.FC<HeaderProps> = () =>{

    return(
        <>
            <h1 className='header_styles'>Exercise Tracker</h1>
        </>
    )
};
export default Header;