import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown,Container } from 'semantic-ui-react'
import axios from 'axios';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            types:[],
            type:'',
            internships:[],
            show:0,
            currentPage:1
        }
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({types:[{text:'Web Development',key:'Web Development',value:'web'},{text:'App Development',key:'App Development',value:'app'},{text:'Data Science',key:'Data Science',value:'data'}],show:0,internships:[],currentPage:1})
    }

    handleChange(e, data){
        this.setState({ type: data.value });
    }
    
    paginate = (number) => {
        this.setState({currentPage:number})
    }

    click = () => {
        axios.get('/fetch/'+this.state.type)
            .then((res) => {
                this.setState({internships:res.data,show:1,currentPage:1})
            })
    }

    render(){
        const per=6;
        const indexofLast=this.state.currentPage*per;
        const indexOfFirst=indexofLast-per;
        const current=this.state.internships.slice(indexOfFirst,indexofLast);
        const pageNumbers=[];
        for(let i=1;i<=Math.ceil(this.state.internships.length/per);i++){
            pageNumbers.push(i);
        }
        return(
            <div className="ui grid">
                <div className="two wide column"></div>
                <div className="ten wide column bar">
                    <Dropdown placeholder='Choose from your Interests' search selection options={this.state.types} onChange={this.handleChange} id='type' value={this.state.type} name='type' />
                    {this.state.type.length==0 &&
                        <button className='searchbtn'><i className="fa fa-search" aria-hidden="true"></i></button>
                    }
                    {this.state.type.length>0 &&
                        <button className='searchbtn' onClick={this.click}><i className="fa fa-search" aria-hidden="true"></i></button>
                    }
                    <br />
                    {this.state.show==1 && 
                        <div className='ui container'>
                            <br />
                            {current.map((internship, index) => (
                                <div>
                                    <div className="ui card cardd" style={{maxWidth:"90%",minWidth:"90%"}}>
                                        <div>
                                            <div className="ui items">
                                                <div className="item">
                                                    <div className="ui medium image">
                                                        <img src="data:image/jpeg;base64,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" />
                                                    </div>
                                                    <div style={{padding:"2.5rem",paddingTop:"1rem"}}>
                                                        <a className="header" style={{color:"rgba(30,32,33,0.65)",fontSize:"25px",fontWeight:"1000px"}}>{internship.title}</a>
                                                        <div className="meta">
                                                            <b><span className="cinema" style={{position:"relative",top:"5px"}}>{internship.user}</span></b>
                                                        </div>
                                                        <div className="meta">
                                                            <span className="cinema" style={{position:"relative",top:"12px",fontWeight:"500px"}}>Duration: {internship.duration} months</span>
                                                        </div>
                                    
                                                        <div className="extra" style={{position:"relative",top:"65px"}}>
                                                            <a href={'/view/'+internship.id.toString()}><div className="ui label">View Details</div></a>
                                                            <a href={'/apply/'+internship.id.toString()}><div className="ui label">Apply Now</div></a>
                                                        </div>
                                                        <div className="extra" style={{position:"relative",top:"60px"}}>
                                                            <b><i><div style={{color:"rgba(20,24,23,0.6)"}}>Applications close on {internship.last}</div></i></b>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            ))}
                            <br />
                            <div>
                                {pageNumbers.map(number => (
                                    <span key={number} style={{position:"relative",right:"10px"}}>
                                        <a href='#'  className='ui button' onClick={() => this.paginate(number)} style={{color:"white",backgroundColor:"rgba(0,123,250,0.7)"}}>{number}</a>
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <div className="two wide column"></div>
            </div>
            
        )
    }
}