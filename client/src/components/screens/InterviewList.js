import React, { useEffect, useState } from 'react';
import M from "materialize-css";
import EditPage from './EditPage';
import { Link, useHistory } from 'react-router-dom';

const InterviewList = ()=>{
    let [data,setData]=useState([]);
    useEffect(()=>{
        fetch("/allMeetings")
        .then(res=>res.json())
        .then(data=>{
            setData(data.meetings);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const history=useHistory();
    function calTime(stime){
        let hr=parseInt(stime/100);
        let min=stime%100+"";
        let time=hr+":"+(min.length==1?"0":"")+min;
        return time;
    }

    return (
        <div>
            <h3>InterviewList</h3>
            <div style={{"padding":"10px","display":"flex","justifyContent":"space-evenly","margin":"5px"}}>
                <div className="s4">title</div>
                <div className="s4">email1</div>
                <div className="s4">email2</div>
                <div className="s4">date</div>
                <div className="s4">startTime</div>
                <div className="s4">endTime</div>
            </div>
            {
            data.map(item => {
                return (
                    <div onClick={()=>{history.push("/edit/"+item._id)}} key={item._id} style={{"padding":"10px","display":"flex","justifyContent":"space-evenly","margin":"5px","backgroundColor":"lightgray"}}>
                        <div className="s4">{item.title}</div>
                        <div className="s4">{item.user1.email}</div>
                        <div className="s4">{item.user2.email}</div>
                        <div className="s4">{item.date}</div>
                        <div className="s4">{calTime(item.startTime)}</div>
                        <div className="s4">{calTime(item.endTime)}</div>
                    </div>
                )
            })

            }
            
        </div>
        
    )
}

export default InterviewList;