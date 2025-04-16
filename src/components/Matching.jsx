import React, { Component, createContext} from 'react'
import "../css/matching.css";
import { Link } from 'react-router-dom';
import { ResultContext, ResultProvider } from './ResultProvider';

// This is the intro page for the matching game
class Matching_intro extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lesson_numbers: ""
         };
        
    }
    componentDidMount(){
        let fetchLessonNumbers = fetch("http://127.0.0.1:8000/api-auth/lesson_get/",{     //This will fetch the lesson numbers from the database
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            return res.json();
        })
        .then(response=>{
            this.setState({lesson_numbers: response})
        })
    }
    handleChangeState = ()=>{
        let lesson = document.querySelector("#matching_lesson_value").value;
        let w_count = document.querySelector("#word_count_value").value;
        this.props.gameStateChange("start",{
            lesson: lesson,
            count: w_count
        });
    }
    render() {
        
        return <>
            <div className="matching_intro_cont">
            <Link to={"/"} className="matching_intro_back_btn round_button"></Link>
                <div className='matching_intro_header prime_header'>Let Play Matching</div>
                <div className="matching_intro_desc prime_desc">
                    This is a simple matching game that will test you japanese screen. You can play this game on study metarial or specific lesson.
                </div>
                <div className="matching_intro_settings">
                    <div className="matching_intro_option">
                        <div className="matching_intro_lable">Study From:</div>
                        <div className="matching_intro_value">
                            <select name="matching_lesson_value" id="matching_lesson_value">
                                <option value="study_metarial">Study Metarial</option>
                                {this.state.lesson_numbers ? this.state.lesson_numbers.map((lesson, index)=>{
                                    if(index !== 0){
                                        return <option key={index} value={lesson.l_number}>Lesson {lesson.l_number}</option>
                                    }
                                }):""}
                            </select>
                        </div>
                    </div>
                    <div className="matching_intro_option">
                        <div className="matching_intro_lable">Word Count:</div>
                        <div className="matching_intro_value">
                            <input type="number" name="word_count_value" id="word_count_value" defaultValue={10}/>
                        </div>
                    </div>
                </div>
                <button className='matching_intro_btn rounded_button' onClick={this.handleChangeState}>Start Game</button>        
            </div>
        </>;
    }
}
// card for the matching game
class ResultPannel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static contextType = ResultContext;
    render() {
        const {right, wrong} = this.context;
        return <div className="score_pannel">
            <div className="score_right">Right: {right}</div>
            <div className="score_wrong">Wrong: {wrong}</div>
        </div>;
    }
}
class Matching_flash_card extends Component {
    static contextType = ResultContext;
    constructor(props) {
        super(props);
        this.state = { 
            strike_count: 0
         };
        this.cardRef = React.createRef();
    }
    componentDidMount(){
        const {updateLesson, updateMaxCount} = this.context;
        const dataToSend = {Total: this.context.right, Wrong: this.context.wrong}
        updateMaxCount(this.props.max_count);
        updateLesson(this.props.lesson)
        if(this.context.status === 'win'){
            this.context.navigate("/end-result", {state: dataToSend});
        }
    }
    handleNavigate = ()=>{
        const dataToSend = {Total: this.context.right, Wrong: this.context.wrong}
        if(this.context.status==='win' && this.context.right === this.context.max_count -1){
            this.context.navigate("/end-result", {state: dataToSend})
        }
    }
    handleOnClick = ()=>{
        const { updateRight, updateWrong, updateMaxCount, updateLesson} = this.context;
        updateMaxCount(this.props.max_count);
        try{
            if(this.cardRef.current.className === "matching_flash_card selected"){
                this.cardRef.current.classList.remove("selected");
            }
            else{
                this.cardRef.current.classList.add("selected");
            }
            // check if more then 1 cards are selected
            let selected_cards = Array.from(document.getElementsByClassName("selected"));
            if(selected_cards.length > 1){
                selected_cards.forEach(card=>{
                    // check if the selected cards are the same
                    if(selected_cards[0].dataset.id === selected_cards[1].dataset.id){
                        selected_cards.forEach(card=>{
                            card.classList.remove("selected");
                            card.classList.add("card_right");
                            updateRight();
                            setTimeout(()=>{
                                const dataToSend = {Total: this.context.right, Wrong: this.context.wrong}
                                card.classList.remove("card_right");
                                card.classList.add("card_hidden");
                                this.handleNavigate();
                                if(this.context.status === 'win'){
                                    this.context.navigate("/end-result", {state: dataToSend});
                                }
                            }, 500);
                        });
                    }else{
                        selected_cards.forEach(card=>{
                            card.classList.remove("selected");
                            card.classList.add("card_wrong");
                            updateWrong();
                            setTimeout(()=>{card.classList.remove("card_wrong")}, 500);
                        });
                    }
                    // card.classList.remove("selected");
                });
            }
        }catch(e){}
    }
    render() {
        
        return <>
        <div className="matching_flash_card" ref={this.cardRef} data-id={this.props.uid} onClick={this.handleOnClick}>
            <div className="flash_card_head" data-value={this.props.value}>{this.props.head}</div>
            <br />
            <div className="flash_card_head">{this.props.kanji}</div>
        </div>
        </>;
    }
}
// This is the main game page for the matching game
class Matching_game extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            matching_set: "",
            right: 0,
        };
    }
    shuffleArray = (array) => { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }
    componentDidMount(){
        
        let url;
        if(this.props.gameSetting.lesson === "study_metarial"){
            url = "http://127.0.0.1:8000/api-auth/study_metarials/2/";
        }
        else{
            url = "http://127.0.0.1:8000/api-auth/lesson_get/"+this.props.gameSetting.lesson+"";
        }
        let fetchMetarialData = fetch(url,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            return res.json();
        })
        .then(response=>{
            if(this.props.gameSetting.lesson === "study_metarial"){
                for(var i=0;i<response.vocabularies.length;i++){
                    if(response.vocabularies[i].id === 2156){
                        console.log("found yeah");
                        response.vocabularies.splice(i, 1);
                    }
                }
                this.setState({matching_set: response.vocabularies.slice(0, this.props.gameSetting.count)});
            }
            else{
                this.setState({matching_set: response.slice(0, this.props.gameSetting.count)});
            };
        })
    }
    async componentDidUpdate(prevProps, prevState){
        if(prevState.matching_set !== this.state.matching_set){
            try{
                let flash_cards = Array.from(document.getElementsByClassName("matching_flash_card"));
                let scrumble = this.shuffleArray(flash_cards);
                document.querySelector(".matching_game_set").innerHTML = "";
                scrumble.forEach(card => {
                    document.querySelector(".matching_game_set").appendChild(card);
                });
            }catch(e){}
        }
    }
    generateMatchingSet = ()=>{
        var matching_set = this.shuffleArray(this.state.matching_set);
        
        try{
            if(matching_set){
                // generate the matching set equal to the word count
                var matching_set = matching_set.slice(0, this.props.gameSetting.count);
                var matching_sets = matching_set.map((set, index)=>{
                    if(set.Vocabulary !== null && set.Meaning !== null){
                        return <Matching_flash_card key={index} head={set.Vocabulary} value={set.Meaning} kanji={set.Kanji} uid={set.id} max_count={this.props.gameSetting.count} lesson={this.props.gameSetting.lesson} />
                    }
                });
                return matching_sets;
            }
        }catch(e){}
    }
    generateMatchingSet2 = ()=>{
        var matching_set = this.shuffleArray(this.state.matching_set);
        
        try{
            if(matching_set){
                // generate the matching set equal to the word count
                var matching_set = matching_set.slice(0, this.props.gameSetting.count);
                var matching_sets = matching_set.map((set, index)=>{
                    if(set.Vocabulary !== null && set.Meaning !== null){
                        return <Matching_flash_card key={index} head={set.Meaning} value={set.Vocabulary} uid={set.id} lesson={this.props.gameSetting.lesson} max_count={this.props.gameSetting.count}/>
                    }
                });
                return matching_sets;
            }
        }catch(e){}
    }
    render() {
        return <>
            <div className="matching_game_cont">
                <ResultPannel/>
                <div className="matching_game_header prime_header">Matching Game</div>
                <div className="matching_game_desc prime_desc">
                    Match the tile with the correct meaning
                </div>
                <div className="matching_game_set">
                  {this.generateMatchingSet()}
                    {this.generateMatchingSet2()}  
                </div>
            </div>
        </>;
    }
}

class Matching extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gameState: "stop",
            gameSettings: {
                lesson: 'study_metarial', //By default it will be study_metarial but it will change depending on lesson maybe
                rounds: "1",
                count: '10', // Minimum word count for the matching event
            }
        };
    }
    handleChangeState = (data, settings)=>{
        this.setState({gameState: data})
        if(settings.lesson !== "study_metarial"){
            this.setState({gameSettings: settings})
        }else{
            fetch('http://127.0.0.1:8000/api-auth/study_metarials/',{method: 'GET'})
            .then(res=>{return res.json()})
            .then(response=>{
                this.setState({gameSettings: {
                    lesson: settings.lesson,
                    rounds: settings.rounds,
                    count: response[0].vocabularies.length < settings.count?response[0].vocabularies.length-1: Number(settings.count)
                }})
            });
        }
        
    }
    render() {
        return <>
        {(()=>{
            if(this.state.gameState === "stop"){
                return <Matching_intro gameState={this.state.gameState} gameStateChange={this.handleChangeState}/>;
            }
            else if(this.state.gameState === "start"){
                return <>
                <Matching_game gameSetting={this.state.gameSettings}/>
                </>;
            }
            else{
                return <h1>Game Over</h1>
            }
        })()}
        
        </>;
    }
}

export default Matching;