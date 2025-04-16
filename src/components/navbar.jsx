// Child
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate, useParams} from 'react-router-dom';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handelSearchSubmit = e=>{
        e.preventDefault();
        var search_data = document.querySelector("#navbar_search_input").value;
        const fetchData = fetch(`http://127.0.0.1:8000/api-auth/kanjivoc_get/${search_data}`, {method:"GET"});
        fetchData.then(res=>{return res.json()}).then(
            res=>{
                this.setState({data: res})
                console.log(this.props)
                this.props.sendData(res);
            }
        )
        this.props.navigate(`search/${search_data}`);
    }
    handle_nav_active = e=>{
        const navbar = document.querySelector(".navbar_menu");
        navbar.classList.add('navbar_active');
    }
    handle_nav_deactive = e=>{
        const navbar = document.querySelector(".navbar_menu");
        navbar.classList.remove('navbar_active');
    }
    render() {
        return <>
        <div id='navbar' className='text-light'>
            <div className="inner_navbar container">
                <div className="navbar_header fs-3 fw-bold m-auto ms-0">
                    <i className="bi bi-justify nav_on_toggle_btn" onClick={this.handle_nav_active}></i>
                    <span>
                        <Link to={"/"} style={{textDecoration: "none", color: "inherit"}}>JPFlash</Link>
                    </span>
                </div>
                <div className="navbar_menu">
                    <div className="inner_menu_cont">
                        <Link to={'/'} className="navbar_item text-light" style={{textDecoration: "none", color: "inherit"}}>Home</Link>
                        <div className="navbar_item">Library</div>
                        <div className="nav_toggle_btn d-none" onClick={this.handle_nav_deactive}>
                            <i className="bi bi-x-lg text-light"></i>
                        </div>
                    </div>
                </div>
                <form action="" className='navbar_search' onSubmit={this.handelSearchSubmit}>
                    <input type="text" name="navbar_search_input" id="navbar_search_input" className="navbar_search_input" placeholder='N5~N1 search any lesson and any vocabolary'/>
                    <button id='navbar_search_btn' type="submit"><i className="bi bi-search"></i></button>
                </form>
                <div className="account_action d-flex align-items-right">
                    <Link to="/" className="btn m-auto me-0">Sign Up</Link>
                </div>
            </div>
        </div>
        </>;
    }
}

export default function NavbarWrapper({sendData}){
    const navigate = useNavigate();
    const params = useParams();
    return <Navbar navigate={navigate} params={params} sendData={sendData}/>;
};