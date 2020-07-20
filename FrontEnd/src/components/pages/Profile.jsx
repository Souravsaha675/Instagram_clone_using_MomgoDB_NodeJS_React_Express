import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";

function Profile(){
    const[images,setimages]=useState([]);
    const {state,dispatch}=useContext(userContext)
    useEffect(()=>{
        fetch("/myposts",{
            headers:{
                "Authorization":"sourav "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result);
            setimages(result.myposts)
        })
    },[])
    return(
        <>
        {state?
            <div className="profile">
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                paddingBottom:"20px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img alt="" style={{width:"160px",height:"160px",borderRadius:"80px"}} src = "https://images.unsplash.com/photo-1542611436-4d894c88d240?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=948&q=80"></img>
                </div>
                <div style={{marginLeft:"15px"}}>
                    <h4 style={{fontFamily:"Courier New, Courier, monospace"}}>{state?state.name:"lodding"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"110%"}}>
                        <h6>{images.length} Posts </h6>
                        <h6>{state?state.followers.length:"0"} Followers </h6>
                        <h6>{state?state.following.length:"0"} Following</h6>
                    </div>
                </div>
            </div>
            <div className="profileposts">
                {
                    images.map(item=>{
                      return  <img key={item._id} alt="" className="postitems" src={item.photo}></img>
                    })
                }
              
            </div>
        </div>
        :
        <h2>lodding</h2>
        }
        
        </>
    )
}

export default Profile;