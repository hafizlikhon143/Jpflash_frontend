import React, { Component } from 'react';
import flashCardImg from '../img/icons/flash_card.svg';
import study_img from '../img/icons/book_study.svg';
import file_test from '../img/icons/file_test.svg';
import word_match from '../img/icons/word_match.svg';
import "../css/study.css";
import Study_flash_card from './study_flash_card';
import { Link } from 'react-router-dom';
import withParams from './withParams';

class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props.params);
        return <>
        <div id="study_container" className="container">
            <div className="header fw-bold fs-2 text-light">Memorize Vocabulary</div>
            {this.props.lesson === "study_matarial"?<div className="metarial_title fs-7 text-light fw-bold py-3">Study Metarials</div>:<div className="metarial_title fs-7 text-light fw-bold py-3">Lesson {this.props.lesson}</div>}
            <div className="inner_container">
                <div className="flash_card_container">
                    <Study_flash_card lesson={this.props.params.lessonData}/>
                </div>
                <div className="option_container">
                    <div className="options">
                        <img src={flashCardImg} alt="" className="img_option" />
                        <div className="option_title">Flash Card</div>
                    </div>
                    <div className="options">
                        <img src={study_img} alt="" className="img_option" />
                        <div className="option_title">Study</div>
                    </div>
                    <div className="options">
                        <img src={file_test} alt="" className="img_option" />
                        <div className="option_title">Test</div>
                    </div>
                    <Link to={"/matching"} className="options">
                        <img src={word_match} alt="" className="img_option" />
                        <div className="option_title">Match</div>
                    </Link>
                </div>
            </div>

        </div>
        </>;
    }
}

export default withParams(Study);