import React, { useEffect, useState } from 'react';
import { exerciseObject } from '../../Types/Types';
import './formStyles.css';
import ApiService from '../../Api/ApiService';
import moment from 'moment'
const DATE_FORMAT = "YYYY-MM-DD";



interface props{
    obj: exerciseObject,
    setObj : React.Dispatch<React.SetStateAction<exerciseObject>>
}

const FormComponent : React.FC<props> = ({obj, setObj}) =>{

    const userId = '1';
    const [name,setName] = useState<string>("");
    const [measureType,setMeasureType] = useState<string>("rep");
    const [count,setCount] = useState<string>("");
    const [createdOn,setCreatedOn] = useState<string>(moment(new Date()).format(DATE_FORMAT));

    const setObjectValue = async (event:any) => {
        event.preventDefault();
        const newObject : exerciseObject = {
            count : count,
            createdBy: userId,
            name : name,
            measureType: measureType,
            userid : userId,
            createdOn :  createdOn,
        };
        console.log(newObject);
        await ApiService.postData(newObject);
        setObj(newObject);
    }

    return(
            <form onSubmit={setObjectValue} className='form_exe'>
            <input 
                type="text" 
                placeholder='Add Execise'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className = 'input text'
            />
            <input 
                type="text" 
                placeholder='Count'
                value={count}
                onChange={(e)=> setCount(e.target.value)}
                className = 'input type'
            />
            <input 
                type="date" 
                placeholder='date'
                //value={moment(new Date()).format(DATE_FORMAT)}
                defaultValue={moment(new Date()).format(DATE_FORMAT)}
                onChange={(e)=> setCreatedOn(e.target.value)}
                className = 'input'
            />
           <select 
                onChange={(e) => setMeasureType(e.target.value)}
                className = 'input text'>
                <option value="rep">Repetations</option>
                <option value="sec">Seconds</option>
            </select>
            <button 
                type='submit'
                className = 'input button'>
                ADD
            </button>
        </form>       
    )
}

export default FormComponent;