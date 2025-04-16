import React, { Component, startTransition } from 'react';
import "../css/study_flash_card.css";
import arrowLeft from '../img/icons/arrow-left.svg';
import arrowRight from '../img/icons/arrow-right.svg';
import play from '../img/icons/play.svg';

class Study_flash_card extends Component {
    constructor(props) {
        super(props);
        this.loadData();
        this.state = { 
            data: "",
            card_counter: 0,
            card_state: 'stoped'
        };
    }
    async loadData(){
        if(this.props.lesson === "study_matarial"){
            var url = "http://127.0.0.1:8000/api-auth/study_metarials/2/";
        }else{
            url = "http://127.0.0.1:8000/api-auth/lesson_get/"+this.props.lesson;
        }
        let fetchStudy = fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
        .then(res=>{
            return res.json();
        })
        .then(response=>{
            if(this.props.lesson === "study_matarial"){
                for(var i=0;i<response.vocabularies.length;i++){
                    if(response.vocabularies[i].id === 2156){
                        response.vocabularies.splice(i, 1);
                    }
                }
                this.setState({data: response.vocabularies})
            }
            else{
                this.setState({data: response})
            }
        })
    }
    handle_play = (e)=>{
        if(this.state.card_state === "stoped"){
            e.target.classList.add("active_play")
            this.setState({card_state: "started"})
            var startTransition = setInterval(e=>{
                if(this.state.card_state !== "stoped"){
                    this.handle_nav_right();
                }
            },10000)
        }
        else{
            e.target.classList.remove('active_play');
            this.setState({card_state: "stoped"})
            clearInterval(startTransition)
        }
    }
    handle_nav_right = () =>{
        let st_card = document.querySelector('.flash_card_words');
        try{
            document.querySelector(".flash_card_words").classList.add("flip_card");
        }
        catch(error){

        }
        st_card.classList.add('flash_card_animate');
        if(this.state.card_counter < this.state.data.length - 1){
            this.setState({card_counter: this.state.card_counter + 1})
        }
        else{
            this.setState({card_counter: 0})
        }

        st_card.addEventListener('animationend', e=>{
            e.target.classList.remove('flash_card_animate');
        })
    }
    handle_nav_left= ()=>{
        let st_card = document.querySelector('.flash_card_words');
        st_card.classList.add('flash_card_animate_oposite');
        try{
            document.querySelector(".flash_card_words").classList.add("flip_card");
        }
        catch(error){

        }
        if(this.state.card_counter > 0){
            this.setState({card_counter: this.state.card_counter - 1})
        }
        else{
            this.setState({card_counter: this.state.data.length - 1})
        }
        st_card.addEventListener('animationend', e=>{
            e.target.classList.remove('flash_card_animate_oposite');
        })
    }
    handleFlip = () => {
        let front_card = document.querySelector(".flash_card_words");
        front_card.classList.toggle("flip_card");
    }
    render() {
        return (
            <>
                <div id="study_flash_card">
                    <div className="flash_card_words flip_card">
                        <div id='card_content_front' className="card_content_f d-grid" onClick={this.handleFlip}>
                            <span className='fs-3 fw-bolder m-auto'>{this.state.data !== ""?this.state.data[this.state.card_counter].Meaning: ""}</span>
                        </div>
                        <div id='card_content_back' className="card_content_f d-grid" onClick={this.handleFlip}>
                            <span className='m-auto d-grid'>
                                <span className='fs-3 fw-bolder m-auto'>{this.state.data !== ""?this.state.data[this.state.card_counter].Vocabulary: ""}</span>
                                <span className='fs-5 fw-bolder m-auto'>{this.state.data !== ""?this.state.data[this.state.card_counter].Kanji: ""}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flash_card_settings">
                        <div className="navigate_btns">
                            <div className="nav_flash_card flash_card_left" onClick={this.handle_nav_left}>
                                <img src={arrowLeft} alt="" className="flash_card_img" />
                            </div>
                            <div className="flash_card_counter_cont">
                                <span className="running_count">{this.state.card_counter + 1}</span>
                                <div className="total_count">/{this.state.data.length}</div>
                            </div>
                            <div className="nav_flash_card flash_card_right" onClick={this.handle_nav_right}>
                                <img src={arrowRight} alt="" className="flash_card_img" />
                            </div>
                            <div className="nav_play_btn" onClick={this.handle_play}>
                                <img src={play} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Study_flash_card;
