import React, { Component } from 'react'
import Recent from './recent';
import Features from './features';
import Popular from './popular';
import ImgCard from './img_card';
import flashImg from '../img/flash_card.jpg';
import matchImg from '../img/matching.jpg';
import checkImg from '../img/man-checking-giant-check-list/checklist.jpg';
import studyImg from '../img/college-background-with-mortarboard/study.jpg';
import Cookies from 'js-cookie';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            l_count: []
         };
    }
    componentDidMount(){
        try{            
            let history = Cookies.get("history");
            let historyData = JSON.parse(history).reverse();
            let l_count = [];
            historyData.map(async (data)=>{
                let count = await this.fetchLessonsLength(data);
                l_count.push(count);
                this.setState({l_count});
            })
        }catch(error){

        }
   }
   fetchLessonsLength = async (pk)=>{
       let response = await fetch("http://127.0.0.1:8000/api-auth/lesson_get/"+pk, {method: 'GET', headers: {'Content-Type': 'application/json'}});
       let data = await response.json();
       try {                    
           return data.length;
       } catch (error) {
           console.log(error);
       }
       response.catch(error=>{
           console.log(error);
       })
   }
    render() {
        return <>
        <h6 style={{textAlign: "center", paddingTop: "60px"}} className='container'>Search Some Lesson or Japanese or English Word to Get Started</h6>
            <Recent l_count={this.state.l_count}/>
            <Features
            header_name="Features"
            comps={[
            <ImgCard 
            key={1}
            imgSrc={flashImg}
            title="Study with Flash Card"
            desc="Find Flash card on any lesson of Minna no Nihongo Book"
            />, 
            <ImgCard
            key={2}
            imgSrc={matchImg}
            title="Test your Skill with Matching Game"
            desc="After learning Kanji properly you can test you skill with Word matching game"
            />,
            <ImgCard
            key={3}
            imgSrc={checkImg}
            title="Take Mulitiple Choice Question"
            desc="Take a serious test on any lesson so you can prepare  for the lesson"
            />, 
            <ImgCard
            key={4}
            imgSrc={studyImg}
            title="Study Any Lession You Like"
            desc="Study any level japanese vocabolary by flash card and Multiple Choice Questions"
            />,
        ]}
            />
            <Popular/>
        </>;
    }
}

export default Home;