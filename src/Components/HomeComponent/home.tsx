import React, {useState, useEffect } from 'react';
import Header from '../HeaderComponent/Header'
import ApiService from '../../Api/ApiService';
import { TextField, FormControl, Table, LinearProgress, Button, Container, InputLabel,Select,MenuItem, Box } from '@material-ui/core';

const Home : React.FC = () => {

    //@ts-ignore
    const forceUpdateSa: () => void = React.useState()[1].bind(null, {});
    const [loader, setLoader] = useState(false);
    const [showForm, setshowform] = useState(false);
    const [userId, setUserId] = useState(1);
    const [tableData, setTableData] = useState();
    const [measureType,setmeasureType] = useState("rep");

    const formToggle = () => {
        if(showForm){
            setshowform(false);
        }else{
            setshowform(true);
        }
    }

    const toggleMeasureType = (value : any) =>{
        setmeasureType(value);
    }

    const submitForm = () => {
        console.log("submit")
    }
    const formHtmlLoader = () => {

        return(
            <div>
                <br />
                <FormControl fullWidth>
                    <TextField id="name" label="name of the exercise" variant="outlined" />
                    <br/>

                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={measureType}
                        label="Select Measure Type"
                    >
                        <MenuItem value={"rep"}>Repetations</MenuItem>
                        <MenuItem value={"sec"}>Seconds</MenuItem>
                    </Select>
                    <br/>

                    <TextField id="count" label="Count" variant="outlined" />
                    <br/>

                    <Button variant="outlined" size="large" 
                     onClick={submitForm}>
                                Add Exercise
                     </Button>
                     <br/><br/>
                    <Button variant="contained" onClick={formToggle}>Close Form section</Button>
                </FormControl>
            </div>
        )
    }

    const fetchLatest = async ()  => {
        setLoader(true);
        const data = await ApiService.getList("getlist?userid="+userId);
        //createTableBody(data.data);
        setTableData(data.data);
        //console.log(tableData);
        setLoader(false);
        //console.log(data);
    }

    const createTableBody = (tableData : any) => {
        console.log(tableData);
        if(tableData){
            return (
                <tbody>
                {tableData.forEach((row:any) => {
                    //console.log(row)
                    return(
                        <tr id = {row._id}>
                            <td>{row._id}</td>
                            <td>{row.name}</td>
                            <td>{row.measureType}</td>
                            <td>{row.count}</td>
                            <td>{row.createdOn}</td>
                            {/*console.log(row._id);
                            console.log(row.name);
                            console.log(row.measureType);
                            console.log(row.count);
                            console.log(new Date(row.createdOn).getMonth());*/}
                        </tr>
                    )
                    forceUpdateSa();
                })}
                <tr>
                    <td colSpan={5}>
                        Data is present.
                    </td>
                </tr>  
                </tbody>
                
            )
        }
        else{
            return(
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            No Data available
                        </td>
                    </tr>    
                </tbody>
            )
        }
       
    }

    useEffect(() => {
        //fetchLatest();
    });

    return(
        <div>
            {loader?<LinearProgress color="secondary" />:(null)}
            <Header />
            <Container>
            <Button
                id = "opneForm"
                onClick={formToggle}
                className = "btn btn-primary"
                variant="contained"
            >
                Add exercise
            </Button>
            
            <Button
                id = "fetchDetails"
                onClick={fetchLatest}
                variant="contained"
            >
                Fetch List
            </Button>

            {showForm?formHtmlLoader():(null)}

            <br /><br/>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Exercise Name</th>
                        <th>Repetation Type</th>
                        <th>Count</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {createTableBody(tableData)}
                {/*
                    tableData?
                        tableData.forEach((value : any) => {

                        })
                        :
                        return(
                            <tbody>
                                <tr>
                                    <td colSpan={5}>
                                        No Data available
                                    </td>
                                </tr>    
                            </tbody>
                        )
                */}
            </Table>

        </Container>
        </div>
    )
};

export default Home;