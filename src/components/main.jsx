
// parent
import React, { Component } from 'react'
import Navbar from './navbar';
import { Route, Routes} from 'react-router-dom';
import "../css/style.css";
import Search from './search';
import Home from './home';
import NotFound from './notFound';
import NavbarWrapper from './navbar';
import Study from './study';
import Matching from './Matching';
import ResultProviderWrapper from './ResultProviderWrapper';
import GameOver from './GameOnver';
import UserControl from './UserControl';
import Attributions from './attribution';

class Main extends Component {
    state={
        nav_data : null
    }
    handleDataTransfer = (data)=>{
    this.setState({nav_data: data})
    }
    render() {
        return <>
        <ResultProviderWrapper>
        <NavbarWrapper sendData={this.handleDataTransfer}/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search/:searchData' element={<Search data={this.state.nav_data}/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/study/:lessonData' element={<Study lesson="study_matarial"/>}/>
        <Route path='/matching' element={<Matching/>}/>
        <Route path='/end-result' element={<GameOver/>}/>
        <Route path='/user/:controlType' element={<UserControl/>}/>
        <Route path='resources/attributions' element={<Attributions/>}/>
        </Routes>
        </ResultProviderWrapper>
        </>;
    }
}

export default Main;