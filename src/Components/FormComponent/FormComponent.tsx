import React, { useState } from 'react';
import { exerciseObject } from '../../Types/Types';
import './formStyles.css';
import moment from 'moment';
import ApiService from '../../Api/ApiService';
const DATE_FORMAT = "YYYY-MM-DD";


interface props{
    obj: exerciseObject,
    setObj : React.Dispatch<React.SetStateAction<exerciseObject>>
}

const FormComponent : React.FC<props> = ({obj, setObj}) =>{

    const userId = '1';
    const [name,setName] = useState<string>("");
    const [measureType,setMeasureType] = useState<string>("");
    const [count,setCount] = useState<string>("");
    const [createdOn,setCreatedOn] = useState<string>("");

    const setObjectValue = (event:any) => {
        event.preventDefault();
        obj.count = count;
        obj.createdBy = userId;
        obj.name = name;
        obj.measureType = measureType;
        obj.userid = userId;
        obj.createdOn = createdOn;
        console.log(obj);
        setObj(obj);
        ApiService.postData(obj);
    }

    return(
        <form className='exe__form' onSubmit={setObjectValue}>
            <input 
                type="text" 
                placeholder='add execise'
                value={name}
                onChange={(e)=> setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='count'
                value={count}
                onChange={(e)=> setCount(e.target.value)}
            />
            <input 
                type="date" 
                placeholder='date'
                //value={moment(new Date()).format(DATE_FORMAT)}
                onChange={(e)=> setCreatedOn(e.target.value)}
            />
           <select onChange={(e) => setMeasureType(e.target.value)}>
                <option value="rep">Repetations</option>
                <option value="sec">Seconds</option>
            </select>
            <button type='submit'>ADD</button>
        </form>
    )
}

export default FormComponent;