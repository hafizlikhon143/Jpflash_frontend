import React, { Component } from 'react';
import withRouter from './withRouter';
import TextCard from './text_card';
import BigCard from './big_card';
import '../css/search.css';
import FlashCardWM from './flash_card_wm';



class Search extends Component {
    state={
        data: "",
        fetchData: this.props.params.searchData,
        updatedId: "",
        study_metarial: ""
    }
    componentDidMount(){
        setTimeout(() => {
            if(this.state.data === ""){
                this.props.navigate('/');
            }else{
                this.setState({data: this.props.data});
            }
        }, 1000);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({data: this.props.data});
        }
    }
    update_search_afterDel = (val)=>{
        console.log(val);
        if(val.res === "yes"){
            console.log("nerd") ;
            this.setState({study_metarial: val.val})
        }
        else{
            console.log("you looser");
        }
    }
    update_big_card = (card)=>{
        if(card.status){
            this.setState({updatedId: card.status})
            this.forceUpdate();
        }

    }

    renderDataJp(){
        const data = this.props.data;
        try{
            return data[0].map(element => (<FlashCardWM header={element.Vocabulary} meaning={element.Meaning} kanji={element.Kanji} id={element.id}  update_data={this.update_big_card}/>))
        }
        catch(error){
            return "";
        }
    }
    renderDataJpKanji(){
        const data = this.props.data;
        try{
            return data[3].map(element => (<FlashCardWM header={element.Vocabulary} meaning={element.Meaning} kanji={element.Kanji} id={element.id}  update_data={this.update_big_card}/>))
        }
        catch(error){
            return "";
        }
    }
    renderDataEn(){
        const data = this.props.data;
        try{
            return data[2][0].map(element => (<FlashCardWM header={element.Vocabulary} meaning={element.Meaning} kanji={element.Kanji} id={element.id}  update_data={this.update_big_card} />))
        }
        catch(error){
            
            return 0;
        }
    }
    renderDataLesson(){
        const data = this.props.data;
        try{
            console.log(data[1][0].l_number);
            return <TextCard header={`Lesson ${data[1][0].l_number}`} count={data[1].length}/>
        }
        catch(error){
            
            return 0;
        }
    }
    handelPreview(){
        var previewCont = document.querySelector('#big_card');
        previewCont.classList.toggle('active_card');

    }
    render() {
        return <>
        <div className="container" id="searchCont" style={this.props.style}>
            <div id='preview_btn' onClick={this.handelPreview} className="btn btn-outline-light bg-dark fw-bolder">Preview</div>
            <div className='mt-3'>
                <div className="d-flex">
                    <div id='preview_box' className="search_section overflow-y-scroll w-100 pe-3">
                        <div className="fs-4 fw-bold text-light">Japanese to English</div>
                        <div className="flash_cards" >
                            {/* {   
                            } */
                           this.renderDataJp()
                            }
                            {
                           this.renderDataJpKanji()
                            }
                        </div>
                        <div className="fs-4 fw-bold text-light">English to Japanese</div>
                        <div className="flash_cards">
                            {this.renderDataEn()}
                        </div>
                        <div className="fs-4 fw-bold text-light">Lessons</div>
                        <div className="flash_cards">
                            {this.renderDataLesson()}
                        </div>
                    </div>
                    <BigCard update_card={this.state.updatedId}/>
                </div>
            </div>
        </div>
        </>;
    }
}

export default withRouter(Search);