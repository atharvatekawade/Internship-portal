import React from 'react'

export default function Landing() {
    return (
        <div className='ui container'>
            <p style={{fontSize:"48px",marginLeft:"20%",position:"relative",top:"-20px"}}><span style={{color:"gray",fontWeight:"lighter"}}>Get Ahead.</span> Grab a Internship!<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTuQEyU4C0MnCL9TYNcb8NBeIKPs3StoJeXWg&usqp=CAU' width="15%" height="18%" style={{position:"relative",top:"45px",backgroundColor:"white"}} /></p>
            <br />
            <br />
            <br />
            <div className="ui grid">
                <div className="one wide column"></div>
                <div className="two wide column">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJfa758-9Zet25uR43OnWUDxPh_5ivrKWg4g&usqp=CAU' height="220px" width="180px" style={{borderRadius:"5px"}} />
                </div>
                <div className="five wide column" style={{marginLeft:"3.1%",fontSize:"18px",color:"rgba(24,28,26,0.7)"}}>
                    <i><p>I wasn’t very confident about this since it was all new to me but when one of my friends suggested that I checked out Internshala and looked for work-from-home and part-time internships, I jumped at the opportunity.</p></i>
                    <br />
                    <i style={{marginLeft:"3.4"}}>-John Doe</i>
                </div>
                <div className="two wide column">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJfa758-9Zet25uR43OnWUDxPh_5ivrKWg4g&usqp=CAU' height="220px" width="180px" style={{borderRadius:"5px"}} />
                </div>
                <div className="five wide column" style={{marginLeft:"3.1%",fontSize:"18px",color:"rgba(24,28,26,0.7)"}}>
                    <i><p>I wasn’t very confident about this since it was all new to me but when one of my friends suggested that I checked out Internshala and looked for work-from-home and part-time internships, I jumped at the opportunity.</p></i>
                    <br />
                    <i style={{marginLeft:"3.4"}}>-John Doe</i>
                </div>
                <div className="one wide column"></div>
            </div>
        </div>
    )
}
