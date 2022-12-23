import React, { Component } from 'react'
import axios from 'axios';

class Users extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        axios.get('/users')
            .then((res) => {
                console.log(res.data)
                this.setState({users:res.data})
            })
    }
    render() {
        return (
            <div>
                {this.state.users.map((person, index) => (
                    <p>Hello, {person.name} with {person.id}!</p>
                ))}
            </div>
        )
    }
}

export default Users


