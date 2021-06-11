import React, { useEffect, useState } from 'react';
import M from "materialize-css";

const Details = (props) => {

    var today = new Date().toISOString().split('T')[0];
    

    const [title,setTitle]=useState("");
    const [email1,setEmail1]=useState("");
    const [email2,setEmail2]=useState("");
    const [date,setDate]=useState("");
    const [startTime,setStartTime]=useState("");
    const [endTime,setEndTime]=useState("");

    function calTime(stime){
        let hr=parseInt(stime/100)+"";
        let min=stime%100+"";
        let time=(hr.length==1?"0":"")+hr+":"+(min.length==1?"0":"")+min;
        return time;
    }

    useEffect(()=>{
        if(props.func=="edit"){
            fetch("/meetingDetail/"+props.meetingId).then(res=>res.json())
            .then(data=>{
                data=data.meeting;
                let start=calTime(data.startTime);
                let end=calTime(data.endTime)
                setTitle(data.title);
                setEmail1(data.user1.email);
                setEmail2(data.user2.email);
                setDate(data.date);
                setStartTime(start);
                setEndTime(end);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[])
    

    function doWork(e){
        e.preventDefault();
        // console.log(title,date,start,end,email1,email2);

        // path for edit or create
        let path="/"+props.func;
        if(props.meetingId!==undefined){
            path+="/"+props.meetingId;
        }
        
        fetch(path,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title,date,startTime,endTime,email1,email2
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#d32f2f red darken-2"});
            }
            else{
                M.toast({html:"saved successfully",classes:"#43a047 green darken-1"});
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <h3>{props.func}</h3>
            <div className="row" style={{width:500,padding:"20px", border:"1px solid lightgray"}}>
                <form className="col s12" onSubmit={(e)=>{doWork(e)}}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Meeting Title" id="title" type="text" value={title} onChange={e=>setTitle(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="input-field col s6">
                        <input id="email1" type="email" placeholder="Email 1" value={email1} onChange={e=>setEmail1(e.target.value)} required/>
                    </div>
                    <div className="input-field col s6">
                        <input id="email2" type="email" placeholder="Email 2" value={email2} onChange={e=>setEmail2(e.target.value)} required/>
                    </div>
                    <input name="date" type="date" min={today} value={date} onChange={e=>setDate(e.target.value)} required></input>
                    <div className="input-field col s6">
                        <label>startTime</label>
                    </div>
                    <div className="input-field col s6">
                        <label>endTime</label>
                    </div>
                    <div className="input-field col s6">
                        <input type="time" name="start-time" value={startTime} onChange={e=>setStartTime(e.target.value)} required></input>
                    </div>
                    <div className="input-field col s6">
                        <input type="time" name="end-time" value={endTime} onChange={e=>setEndTime(e.target.value)} required></input>
                    </div>
                    <button >{props.func}</button>
                </form>
            </div>
        </div>
    )
}

export default Details;