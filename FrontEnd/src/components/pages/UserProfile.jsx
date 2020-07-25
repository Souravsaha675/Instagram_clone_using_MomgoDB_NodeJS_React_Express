import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import { useParams } from "react-router-dom";

function UserProfile(){
    const[userProfile,setuserProfile]=useState(null);
    const {state,dispatch}=useContext(userContext)
    const{userid}=useParams()
    const [showfollow, setfollow] = useState(state?!state.following.includes(userid):true);
    //console.log(userid);
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"sourav "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result);
            setuserProfile(result)
        })
    },[])
    
    function follow(){
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "sourav " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setuserProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setfollow(false)
        })
    }

    function Unfollow() {
        fetch("/unfollow", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "sourav " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    unfollowId: userid
                })
            }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({
                    type: "UPDATE",
                    payload: {
                        following: data.following,
                        followers: data.followers
                    }
                })
                localStorage.setItem("user", JSON.stringify(data))
                setuserProfile((prevState) => {
                    const newFollower=prevState.user.followers.filter(item=>item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setfollow(true);
            })
    }

    return(
        <>
        {userProfile ?

         <div className="profile">
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                paddingBottom:"20px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img alt="" style={{width:"160px",height:"160px",borderRadius:"80px"}} src = {userProfile.user.profileImg}></img>
                </div>
                <div style={{marginLeft:"15px"}}>
                    <h4 style={{fontFamily:"Courier New, Courier, monospace"}}>{userProfile.user.name}</h4>
                    <h4 style={{fontFamily:"Courier New, Courier, monospace"}}>{userProfile.user.email}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"110%"}}>
                        <h6>{userProfile.posts.length} Posts </h6>
                        <h6>{userProfile.user.followers.length} Followers </h6>
                        <h6>{userProfile.user.following.length} Following</h6>
                    </div>
                    {
                        showfollow ?
                        <button className="btn waves-effect waves-light" onClick={()=>follow()}>
                            Follow
                        </button>
                        :
                        <button className="btn waves-effect waves-light" onClick={()=>Unfollow()}>
                            UnFollow
                        </button>
                    }
                    
                </div>
            </div>
            <div className="profileposts">
                {
                    userProfile.posts.map(item=>{
                      return  <img key={item._id} alt="" className="postitems" src={item.photo}></img>
                    })
                }
              
            </div>
        </div> 
        
        :<h2>lodding</h2>}
       
        </>
    )
}

export default UserProfile;