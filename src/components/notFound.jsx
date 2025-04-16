import React, { Component } from 'react';
import notFoundIcon from '../img/icons/404.svg';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return <>
        <div className="container d-grid">
            <div className='m-auto d-grid'>
                <div className="not_found_text fs-1 fw-bolder m-auto">
                    Page  Not Found
                </div>
                <img src={notFoundIcon} className='m-auto' style={{width:"350px"}}alt="notimg" />
            </div>

        </div>
        </>;
    }
}

export default NotFound;