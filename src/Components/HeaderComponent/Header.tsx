import React from 'react';
import { LinearProgress } from '@material-ui/core';

export interface HeaderProps{

};

const Header : React.FC<HeaderProps> = () =>{

    return(
        <>
            <LinearProgress color="secondary" />
            <h1>Exercise tracker</h1>
        </>
    )
};
export default Header;