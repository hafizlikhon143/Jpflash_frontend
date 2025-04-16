import React, { Component } from 'react';
import "../css/img_card.css";


class ImgCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return <>
        <div className="img_card me-4">
            <div className="img_card_img_cont">
                <img src={this.props.imgSrc} alt="Card Img" className='img_card_img' />
            </div>
            <div className="card_info  bg-light text-dark p-3">
                <div className="img_card_header fs-6 fw-bolder">{this.props.title}</div>
                <div className="img_card_desc fs-7">{this.props.desc}</div>
            </div>
        </div>
        </>;
    }
}

export default ImgCard;