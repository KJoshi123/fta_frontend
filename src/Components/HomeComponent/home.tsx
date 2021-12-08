import React, {useState, useEffect } from 'react';
import Header from '../HeaderComponent/Header'
import ApiService from '../../Api/ApiService';
import { TextField, FormControl, Table, LinearProgress, Button, Container, InputLabel,Select,MenuItem,
TableBody, TableCell, TableContainer,TableHead, TableRow, Paper, Grid } from '@material-ui/core';
import { listeners } from 'process';

const Home : React.FC = () => {

    //@ts-ignore
    const forceUpdateSa: () => void = React.useState()[1].bind(null, {});
    const [loader, setLoader] = useState(false);
    const [showForm, setshowform] = useState(false);
    const [userId, setUserId] = useState(1);
    const [measureType,setmeasureType] = useState("rep");
    const [tableData, setTableData] = useState<any>([]);

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
        //fetchLatest();
    });

    return(
        <div>
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

                {showForm?formHtmlLoader():(null)}

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
                            {tableData?.map((row:any) => (
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.measureType}</TableCell>
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell align="right">{row.createdOn}</TableCell>
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