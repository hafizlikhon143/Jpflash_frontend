import React, { Component } from 'react'
import TextCard from './text_card';
import "../css/popular.css";
import Cookies from 'js-cookie';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lesson_list: []
         };
    }
    getSortedByFrequency = (arr) => {
        // Step 1: Count the frequency of each number
        const frequency = {};
        arr.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        
        // Step 2: Convert the frequency object to an array of [number, frequency] pairs
        const frequencyArray = Object.entries(frequency);
        
        // Step 3: Sort the array by frequency in descending order
        frequencyArray.sort((a, b) => b[1] - a[1]);
    
        // Step 4: Extract the sorted numbers
        const sortedNumbers = frequencyArray.map(([num]) => Number(num));
    
        return sortedNumbers;
    }
    getPopuplar = ()=>{
        try{
            let popularData = JSON.parse(Cookies.get("popular"));
            const sortedNumbers = this.getSortedByFrequency(popularData);
            this.setState({lesson_list: sortedNumbers});
        }
        catch(e){
            
        }
    }
    componentDidMount(){
        this.getPopuplar();
    }

    render() {
        return <>
        <div id="Popular_container" className='container mb-5'>
            <div className="Popular_text fw-bold text-light fs-3 pt-5 pb-2">Popular Lessons</div>
            <div className="card_container">
                {this.state.lesson_list.length > 0?this.state.lesson_list.map((data, index)=>{
                    if(0 < index < 3){
                        return <TextCard header={"Lesson "+data} key={index}/>
                    }
                }):"No Popular Lesson"
                }
            </div>
        </div>
        </>;
    }
}

export default Popular;