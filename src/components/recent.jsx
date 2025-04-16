import React, { Component } from 'react'
import TextCard from './text_card';
import "../css/recent.css";
import Cookies from 'js-cookie';

class Recent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lesson_counts: []
        };
    }
    render() {
        const history = Cookies.get("history");
        if(history === undefined){
            return <>
            <div id="recent_container" className='container'>
            <div className="recent_text fw-bold text-light fs-3 pt-2 pb-2">Recent</div>
            <div className="card_container">
            No Recent History  
            </div>
            </div>
            </>
        }
        else{
            let historyData = JSON.parse(history);
            const jsonHistory = JSON.parse(history).reverse();
            return <>
            <div id="recent_container" className='container'>
                <div className="recent_text fw-bold text-light fs-3 pt-1 pb-2">Recent</div>
                <div className="card_container">
                {jsonHistory.map((data, index)=>{
                    if(index < 3){
                        return <TextCard header={"Lesson "+data} key={index} count={this.props.l_count[index]}/>
                    }
                })}
                </div>
            </div>
            </>;
            }

    }
}

export default Recent;