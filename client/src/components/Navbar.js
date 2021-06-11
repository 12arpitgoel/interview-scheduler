import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return (  
        <nav>
            <div className="nav-wrapper" style={{padding:"0 20px"}}>
                <Link to="/" className="brand-logo left">Logo</Link>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><Link to="/">InterviewList</Link></li>
                    <li><Link to="/create">Creation</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;