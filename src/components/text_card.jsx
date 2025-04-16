import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/text_card.css";
import Cookies from 'js-cookie';


class TextCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    add2history = ()=>{
        let history = Cookies.get("history");
        if(history === undefined){
            history = [];
        }else{
            history = JSON.parse(history);
        }
        try{
            if(history.indexOf(this.props.header.split(" ")[1]) === -1){
                history.push(this.props.header.split(" ")[1]);
            }else{
                let numIndex = history.indexOf(this.props.header.split(" ")[1]);
                history.splice(numIndex, 1);
                history.push(this.props.header.split(" ")[1]);
            }
            Cookies.set("history", JSON.stringify(history), {expires: 1});
        }
        catch(error){
            
        }
        this.add2Popular();
    }
    
    add2Popular = ()=>{
        let popular = Cookies.get("popular");
        if(popular === undefined){
            popular = [];
        }else{
            popular = JSON.parse(popular);
        }
        try{
            popular.push(this.props.header.split(" ")[1]);
            Cookies.set("popular", JSON.stringify(popular), {expires: 1});
        }
        catch(error){
            
        }
    }  

    render() {
        try{
            var number_of_lession = this.props.header.split(" ")[1];
        }
        catch(error){
            var number_of_lession = 1;
        }
        return <>
        <Link to={"/study/"+number_of_lession} className="text_card text-light px-3 " onClick={this.add2history}>
            <div className="text_card_header fs-5 fw-bolder py-2">{this.props.header === undefined ? 'Lesson 1' : this.props.header}</div>
            <div className="text_card_count text-dark mb-5">{this.props.count === undefined ? '58 items' : `${this.props.count} items`}</div>
            <div className="text_card_title mt-3 mb-3">Language LvL <span className='special_txt px-2'>N4</span></div>
        </Link>
        </>;
    }
}

export default TextCard;