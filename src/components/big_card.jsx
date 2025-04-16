import React, { Component } from 'react'
import '../css/big_card.css';
import MyContext from './MyContext';
import Search from './search';
import { Link } from 'react-router-dom';



class WordCage extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    fash_card_uncheck = ()=>{
        let flash_card = document.querySelectorAll(".flash_cards > div")
        try{
            let i;
            for(i=0;i<flash_card.length;i++){
                if(Number(flash_card[i].dataset.id) === this.props.uid){
                    flash_card[i].querySelector(".flash_card_check").checked = false;
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }
    handelDlt = async ()=>{
        try{
            if(window.confirm("Do You Want To Remove The Word")===true){
                const fetchDlt = fetch(`http://127.0.0.1:8000/api-auth/study_dlt/${this.props.uid}/`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}}).then(res=>{return res.json()})
                .then(response=>{
                    if(response.msg === "Success"){
                        fetch(`http://127.0.0.1:8000/api-auth/study_metarials/2/`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
                        .then(res=>{return res.json()})
                        .then(response=>{
                            this.props.sendRes(response);
                            this.fash_card_uncheck();
                        })
                    }
                })

            }
        }
        catch(error){
            console.log("Code 404");
        }
    }
    btn_dlt = {
        height: '20px',
        padding: '0px 10px 0px 10px',
        lineHeight: '1',
        margin: 'auto'
    }

    render() {
        return <>
            <div className="word_cage" data-id={this.props.uid} key={this.key}>
                <div className="fs-4 fw-bold jp_word">{this.props.jp_word}&emsp;<div className="btn btn-outline-light" style={this.btn_dlt} key={this.key} onClick={this.handelDlt}>-</div></div>
                <div className="en_word" style={{fontSize: "12px"}}>{this.props.en_word}</div>
                <div className="fw-bold kanji_word">{this.props.kanji}</div>
                <br />
            </div>
            </>;
        }
    }
    
    class BigCard extends Component {
        state={
            vocabularies: []
        }
        componentDidMount(){
            const study_data = fetch('http://127.0.0.1:8000/api-auth/study_metarials/',{method: 'GET'})
            .then(res=>{return res.json()})
            .then(response=>{
                this.setState({vocabularies: response[0].vocabularies})
            });
        }
        componentDidUpdate(prevProps, prevState){
            try{
                if(prevProps !== this.props){
                    const study_data = fetch('http://127.0.0.1:8000/api-auth/study_metarials/',{method: 'GET'})
                    .then(res=>{return res.json()})
                    .then(response=>{
                        this.setState({vocabularies: response[0].vocabularies})
                    });
                }
            }
            catch(error){
                console.warn(error);
            }
        }
        handelResponse = (res)=>{
            this.setState({vocabularies: res.vocabularies})
            
        }
        renderStudyMetarial(){
            const vocabularies = this.state.vocabularies;
            let vocab_list = []
            try{
                vocabularies.map(
                    vocab=>{
                        if(vocab.l_number!== 0){
                            vocab_list.push(
                                <WordCage sendRes={this.handelResponse} key={vocab.id} uid={vocab.id} en_word={vocab.Meaning} jp_word={vocab.Vocabulary} kanji={vocab.Kanji}/>
                            )
                        }
                }
                )
                return vocab_list;
            }
            catch(error){
                console.log(error);
            }
        }
        render() {
            return <>
            <div id="big_card" className='mx-2 my-1'>
                <div className="card_header d-flex mt-4 mx-5">
                    <div className="fs-2 text-light card_text_header my-auto d-grid align-items-center">Flash Cards</div>
                    <div className="card_btn m-auto">
                        <Link to={"/study/study_matarial"} className="btn btn-light mx-auto ms-2">Study</Link>
                        <Link to={"/matching"} className="btn btn-light mx-auto ms-2">Matching</Link>
                    </div>
                </div>
                <div className="card_content mx-5 mb-4">
                <MyContext.Provider
                value={{
                    data: this.state.vocabularies
                }}
                >
                    {this.renderStudyMetarial()}
                </MyContext.Provider>
                </div>
            </div>
            </>;
        }
    }
    
    export default BigCard;