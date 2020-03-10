import React from 'react';
import { Link } from 'react-router-dom';

const TestContainer = () => {
    return(
        <div>
            <Link to='/songs'>Songs Index</Link>
            <br/>
            <Link to='/upload'>Upload Song</Link>
            <br/>
        </div>
    )
}

export default TestContainer;