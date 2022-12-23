import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown,Container } from 'semantic-ui-react'

function Post() {
    const [inputFields, setInputFields] = useState([
        { first: '' },
    ]);

    const [inputField, setInputField] = useState([
        { second: '' },
    ]);

    const [types] = useState([{text:'Web Development',key:'Web Development',value:'web'},{text:'App Development',key:'App Development',value:'app'},{text:'Data Science',key:'Data Science',value:'data'}]);
    const [type, setType] = useState('');
    const [last, setLast] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [duration,setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const obj={title:title,last:last,desc:desc,type:type,duration:duration,compulsary:inputFields,optional:inputField};
        axios.post('/test',obj)
            .then((res) => {
                console.log('Success')
                window.location='/'
            })
    };

    const ChangeDuration = (event) => {
        setDuration(event.target.value);
    }

    const ChangeDropdown = (e, data) => {
        setType(data.value);
    }
    const ChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const ChangeLast = (event) => {
        setLast(event.target.value)
    }
    const ChangeDesc = (event) => {
        setDesc(event.target.value)
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleChange = (index, event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { first: '' }])
    }
    const Add = () => {
        setInputField([...inputField, { second: '' }])
    }

    const handleRemoveFields = (index) => {
        const values  = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const Remove = (index) => {
        const values  = [...inputField];
        values.splice(index, 1);
        setInputField(values);
    }

    return (
        <div class="ui grid">
            <div class="two wide column"></div>
            <div class="nine wide column">
                <div class="ui form recruit">
                    <form onSubmit={handleSubmit}>
                        <div class="two fields">
                            <div class="field">
                                <label>Position</label>
                                <input placeholder="Position" type="text" name='title' onChange={ChangeTitle} value={title} id='title' name='title' />
                            </div>
                            <div class="field right">
                                <label>Last Date</label>
                                <input placeholder="Last Date for applying" type="text" onChange={ChangeLast} value={last} id='last' name='last' />
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                <label>Description</label>
                                <textarea placeholder="Description" type="text" onChange={ChangeDesc} value={desc} id='desc' name='desc' />
                            </div>
                            <div className='field'>
                                <div id='drop' className='field'>
                                    <label>Type</label>
                                    <Dropdown placeholder='Internship Type' search selection options={types} onChange={ChangeDropdown} id='drop' value={type} name='type' />
                                </div>
                                <br />
                                <div style={{position:"relative",top:"54px"}}>
                                    <b><label style={{fontSize:"13px"}}>Duration</label></b>
                                    <input placeholder="Duration(In months)" type="text" onChange={ChangeDuration} value={duration} id='duration' name='duration' />
                                </div>
                            </div>
                        </div>
                        
                        <div class="two fields">
                            <div class="field">
                                <label>Manadatory Requirements</label>
                                { inputFields.map((inputField, index) => (
                                <div key={index}>
                                    <input
                                    type="text" 
                                    name="first"
                                    label="First Name"
                                    variant="filled"
                                    placeholder='Manadatory Requirement'
                                    value={inputField.first}
                                    onChange={event => handleChangeInput(index, event)}
                                    />
                                    <a
                                    href='#'
                                    onClick={() => handleRemoveFields(index)}
                                    >
                                    <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-8px"}}></i>
                                    </a>
                                    
                                </div>
                                )) }
                                <a
                                href='#'
                                onClick={() => handleAddFields()}
                                style={{position:"relative",top:"-18.5px",right:"-395px"}}
                                >
                                <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div class="field right">
                                <label>Optional Requirements</label>
                                { inputField.map((inputfield, index) => (
                                <div key={index}>
                                    <input
                                    type="text" 
                                    name="second"
                                    label="First Name"
                                    placeholder='Optional Requirement'
                                    variant="filled"
                                    value={inputfield.second}
                                    onChange={event => handleChange(index, event)}
                                    />
                                    <a
                                    href='#'
                                    onClick={() => Remove(index)}
                                    >
                                    <i class="fa fa-lg fa-minus" aria-hidden="true" style={{position:"relative",right:"-8px"}}></i>
                                    </a>
                                    
                                </div>
                                )) }
                                <a
                                href='#'
                                onClick={() => Add()}
                                style={{position:"relative",top:"-18.5px",right:"-395px"}}
                                >
                                <i class="fa fa-lg fa-plus" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <button class="ui primary button">Submit</button>
                    </form>
                </div>
            </div>
            <div class="one wide column"></div>
        </div>
    );
}

export default Post;
