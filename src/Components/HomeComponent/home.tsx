import React, {useState, useEffect } from 'react';
import Header from '../HeaderComponent/Header'
import ApiService from '../../Api/ApiService';
import { Table, LinearProgress, Button, TableBody, TableCell, 
            TableContainer,TableHead, TableRow, Paper, Grid } from '@material-ui/core';
import moment from 'moment';
import { DATE_FORMAT } from '../../Constants/commonConstants';
import './home.css';
import FormComponent from '../FormComponent/FormComponent';
import {exerciseObject} from '../../Types/Types';

const Home : React.FC = () => {

    const [loader, setLoader] = useState(false);
    const [showForm, setshowform] = useState(false);
    const [userId, setUserId] = useState(1);
    const [tableData, setTableData] = useState<any>([]);
    const [obj, setObj] = useState<exerciseObject>(
        {
            name : "",
            createdOn : "",
            measureType : "",
            count : "",
            createdBy: "",
            userid : ""
        });
    const formToggle = () => {
        if(showForm){
            setshowform(false);
        }else{
            setshowform(true);
        }
    }

    const handleSubmit = (event: any) =>{
        console.log("in submit")
        event.preventDefault();
        console.log(event);
    }

    const fetchLatest = async ()  => {
        setLoader(true);
        const data = await ApiService.getList("getlist?userid="+userId);
        if(data?.statuscode===200)
            createTableBody(data.data);
        setLoader(false);
    }

    const createTableRow = (id:String, name:String, measureType:String, count:number, createdOn:any) =>{
        return({id, name, measureType,count,createdOn});
    }
    const createTableBody = (tableData : any) => {
        var rowData : Array<any>=[];
        tableData.forEach((element :any) =>{
            
            rowData.push(createTableRow(element._id,element.name,element.measureType,element.count,element.createdOn))
        });
        setTableData(rowData)
    }
       

    useEffect(() => {
        fetchLatest();
        formToggle();
    },[obj]);

    return(
        <div className="background">
            {loader?<LinearProgress color="secondary" />:(null)}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '20vh' }}
            >
                 <Header />
                <Grid 
                    id="top-row" 
                    container 
                    style={{minHeight: '5vh'}}
                >
                    <Grid item xs={6}>
                        <Paper >
                            <Button
                                id = "opneForm"
                                onClick={formToggle}
                                className = "btn btn-primary"
                                variant="contained"
                            >
                                Add exercise
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper >
                            <Button
                                id = "fetchDetails"
                                onClick={fetchLatest}
                                variant="contained"
                            >
                                Fetch List
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>

                {showForm?<FormComponent obj={obj} setObj={setObj}/>:(null)}

                <br /><br/>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">  
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Measure Type</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">Created On</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData?.map((row:any,index:number) => (
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {index+1}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.measureType}</TableCell>
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell align="right">{moment(row.createdOn).format(DATE_FORMAT)}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                    </Table>
                </TableContainer>
        </Grid>
        </div>
    )
};

export default Home;