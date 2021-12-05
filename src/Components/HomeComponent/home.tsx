import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { exeModel } from '../../Models/ExerciseModel';
import {backendUrl} from '../../Constants/commonConstants';
import { LinearProgress } from '@material-ui/core';
import Header from '../HeaderComponent/Header'
import { useQuery } from 'react-query';


const Home : React.FC = () => {

    const [loader, setLoader] = useState(true);
    const [showForm, setshowform] = useState(false);
    const [userId, setUserId] = useState(1);

    const formToggle = () => {
        if(showForm){
            setshowform(false);
        }else{
            setshowform(true);
        }
    }
    const formHtmlLoader = () => {

        return(
            <div>
                <p>THis is a form section</p>
                <Button onClick={formToggle}>Close Form section</Button>
            </div>
        )
    }

    const fetchLatest = async ()  => {
        setLoader(true);
        const data = await (await fetch(backendUrl+"getlist?userid="+userId)).json();
        setLoader(false);
        console.log(data);
    }

    return(
        <div>
            {loader?<LinearProgress color="secondary" />:(null)}
            <Header />
            <Container>
                <Button
                    id = "opneForm"
                    onClick={formToggle}
                    className = "btn btn-primary"
                >
                    Press Mee
                </Button>
                <Button
                    id = "fetchDetails"
                    onClick={fetchLatest}
                >Fetch List</Button>
                {showForm?formHtmlLoader():(null)}
            </Container>
        </div>
    )
};

export default Home;