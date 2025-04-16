import React, { Component } from 'react';
import "../css/features.css";


class Features extends Component {
    state={
        
    }
    handleBtnVisibale = event=>{
        var hovered_elm = event.target;
        console.log(hovered_elm);
    }
    handelScrollLeft=e=>{
        var p_elem = e.target.parentNode.parentNode.children[1];
        var anim_count = 0;
        var anim_scrol = setInterval(()=>{
            p_elem.scrollLeft = p_elem.scrollLeft - anim_count;
            if(anim_count>25){
                clearInterval(anim_scrol);
            }
            else{
                anim_count = anim_count + 1;
            }
        },0.01)
    }
    handelScrollRight=e=>{
        var p_elem = e.target.parentNode.parentNode.children[1];
        var anim_count = 0;
        var anim_scrol = setInterval(()=>{
            p_elem.scrollLeft = p_elem.scrollLeft + anim_count;
            if(anim_count>25){
                clearInterval(anim_scrol);
            }
            else{
                anim_count = anim_count + 1;
            }
        },0.01)

    }
    render() {
        return <>
        <div className="features_container container">
            <div className="features_header fw-bold text-light fs-3 pt-5 pb-2" >
                {this.props.header_name}
            </div>
            <div className="container py-2 px-0">                
                <div className="features_card_container">
                    {this.props.comps}
                </div>
            </div>
            <button className='features_btn left_btn' onClick={this.handelScrollLeft}><i className="bi bi-chevron-compact-left"></i></button>
            <button className='features_btn right_btn' onClick={this.handelScrollRight}><i className="bi bi-chevron-compact-right"></i></button>
        </div>
        </>;
    }
}

export default Features;