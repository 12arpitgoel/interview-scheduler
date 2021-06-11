import React from 'react';
import { useParams } from 'react-router';
import Details from './Details';
// import M from "materialize-css";

const EditPage = ()=>{
    const {meetingId}=useParams();
    return (
        <div>
            <Details func="edit" meetingId={meetingId}></Details>
        </div>
    )
}

export default EditPage;