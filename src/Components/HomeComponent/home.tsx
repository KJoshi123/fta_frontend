import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs'

import Header from '../HeaderComponent/Header'
const Home : React.FC = () => {

    const [loader, setLoader] = useState(true);
    const [showForm, setshowform] = useState(false);

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

    return(
        <div>
            <Header />
            <Container>
                <Tabs>
                    <Button
                        id = "opneForm"
                        onClick={formToggle}
                        className = "btn btn-primary"
                    >
                        Press Me
                    </Button>
                </Tabs>
                {showForm?formHtmlLoader():(null)}
            </Container>
        </div>
    )
};

export default Home;