import React, { Component } from 'react';
import '../css/flash_card_wm.css';

class FlashCardWM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
        this.myElement = React.createRef();
    }
    componentDidMount(){
        if(this.props.id !== undefined){
            let check_study_metarial = fetch("http://127.0.0.1:8000/api-auth/study_dlt/"+this.props.id+"/", {
                method: "GET",
                headers: {
                    'Content-type': 'aplication/json'
                }
            })
            .then(res=>{return res.json()})
            .then(response=>{
                try {
                    let tar_el = this.myElement.current.querySelector(".flash_card_check");
                    if(response.length !== 0){
                        tar_el.checked = true;
                    }else{
                        tar_el.checked = false;
                    }
                } catch (error) {
                  console.log(error);
                }
            })
        }
        
    }
    
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            if(this.props.id !== undefined){
                this.setState({id: this.props.id});
            }
        }
    }
    
    handleCheck = e=>{
        let tar_el = e.currentTarget;
        tar_el =tar_el.querySelector(".flash_card_check");
        var elem_item = e.currentTarget.dataset.id;
        var updateOnChecked = fetch("http://127.0.0.1:8000/api-auth/study_dlt/"+elem_item+"/", {
            method: "PUT",
            headers: {
                'Content-type': 'aplication/json'
            }
        }).then(res=>{return res.json()})
        .then(
            response=>{
                if(response !== 'exist'){
                    tar_el.checked = true;
                    this.props.update_data({status: response.id});
                }
            }
        )
    }
    render() {
        return <>
        <div className="flash_card_with_meaning p-3 my-3" style={this.props.style} onClick={this.handleCheck} data-id={this.props.id} ref={this.myElement}>
            <input type="checkbox" name="dd_to_choice" className="flash_card_check" />
            <div className="flash_card_header text-center fs-1 fw-bolder">{this.props.header}</div>
            <div className="flash_card_meaning text-center">{this.props.meaning}</div>
            <div className="flash_card_kanji text-center fw-bold fs-4">{this.props.kanji}</div>
        </div>
        </>;
    }
}

export default FlashCardWM;