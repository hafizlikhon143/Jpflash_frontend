import React, { Component, createContext} from 'react'
import "../css/matching.css";
import withNavigation from './withNavigation';


const ResultContext = createContext();

class ResultProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            right: 0,
            wrong: 0,
            max_count: 0,
            status: "stoped",
            lesson: 0
         };
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.right !== this.state.right){
            this.updateStatus();
        }
    }
    restartState = ()=>{
        this.setState({
            right: 0,
            wrong: 0,
            status: "stoped",
            lesson: 0
        })
    }
    updateRight = ()=>{
        this.setState({right: this.state.right + 1});
    }
    updateWrong = ()=>{
        this.setState({wrong: this.state.wrong + 1});
    }
    updateMaxCount = (count)=>{
        this.setState({max_count: count});
    }
    updateStatus = ()=>{
        if(this.state.right - this.state.max_count === 0 && this.state.lesson === "study_metarial"){
            this.setState({status: "win"});
        }
        else if(this.state.right - this.state.max_count === 0){
            this.setState({status: "win"});
        }
    }
    updateLesson = (lesson)=>{
        this.setState({lesson: lesson})
    }
    render() {
        return (
            <ResultContext.Provider value={{
                right: this.state.right, 
                wrong: this.state.wrong,
                status: this.state.status,
                max_count: this.state.max_count,
                lesson: this.state.lesson,
                updateRight: this.updateRight,
                updateWrong: this.updateWrong,
                updateMaxCount: this.updateMaxCount,
                updateLesson: this.updateLesson,
                restartState: this.restartState,
                navigate: this.props.navigate,
                }}>
                {this.props.children}
                
            </ResultContext.Provider>
        );
    }
}

export { ResultContext, ResultProvider };