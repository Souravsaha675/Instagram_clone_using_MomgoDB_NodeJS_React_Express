import React, { useState, useEffect, useContext } from "react";
import {userContext} from "../../App"
import { Link } from "react-router-dom";
function Home(){
    const[data,setdata]=useState([]);
    const {state,dispatch} = useContext(userContext);
    useEffect(()=>{
        fetch("/allposts",{
            headers:{
                "Authorization":"sourav "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            //console.log(result);
            setdata(result.posts);
        })
    },[])


    function likePost(id){
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"sourav "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
            }).then(res=>res.json())
            .then(result=>{
                //console.log(result);
                //console.log(data);
                const newData=data.map(item=>{
                    if(item._id===result._id){
                        return result
                    } else{
                        return item
                    }
                })
                setdata(newData)
            }).catch(err=>{
                console.log(err);
            })
        
    }

     function unlikePost(id) {
         fetch("/unlike", {
                 method: "put",
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": "sourav " + localStorage.getItem("jwt")
                 },
                 body: JSON.stringify({
                     postId: id
                 })
             }).then(res => res.json())
             .then(result => {
                 //console.log(result);
                 //console.log(data);
                 const newData = data.map(item => {
                     if (item._id === result._id) {
                         return result
                     } else {
                         return item
                     }
                 })
                 setdata(newData)
             }).catch(err => {
                 console.log(err);
             })

    }


    function makecomments(text,postId){
        fetch("/comments",{
            method:"put",
            headers:{
             "Content-Type": "application/json",
             "Authorization": "sourav " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })
            setdata(newData)
        }).catch(err=>{
            console.log(err);
        })
    }


    function deletePost(postId){
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Authorization": "sourav "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.filter(item=>{
                return item._id !== result._id
            })
            setdata(newData)
        })
    }

    function deleteComment(postId,commentId){
        fetch(`/deletecomment/${postId}/${commentId}`,{
            method:"delete",
            headers:{
                "Authorization": "sourav " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result);
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item
                }
            })
            setdata(newData)
            
        }).catch(err=>console.log(err))
    }

    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card">
                            <h5 key={item._id}><span style={{paddingLeft:"5px"}}><Link to={item.postedBy._id !== state._id ?`/profile/${item.postedBy._id}`:"/profile"}>{item.postedBy.name}</Link></span>{item.postedBy._id===state._id && <i className="material-icons" style={{float:"right", padding:"5px",paddingRight:"5px"}} onClick={()=>deletePost(item._id)}>delete</i>}</h5> 
                            <div className="card-image">
                                <img alt="" src={item.photo}></img>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red",paddingLeft:"2.5px",paddingRight:"2.5px"}} >favorite</i>
                                {
                                    item.likes.includes(state._id)
                                    ?<i className="material-icons" style={{paddingLeft:"2.5px",paddingRight:"2.5px"}} onClick={()=>unlikePost(item._id)}>thumb_down</i>
                                    :<i className="material-icons" style={{paddingLeft:"2.5px",paddingRight:"2.5px"}} onClick={()=>likePost(item._id)}>thumb_up</i>
                                    
                                }
                                <h6>{item.likes.length} Likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(comment=>{
                                        return (
                                            <h6 key={comment._id}><span style={{fontWeight:"800"}}>{comment.postedBy.name}</span>  {comment.text} {
                                                comment.postedBy._id===state._id && <i style={{cursor:"pointer"}} onClick={()=>deleteComment(item._id, comment._id)} className="material-icons right">delete</i>
                                            }</h6>
                                        )
                                    })
                                }
                                <form onSubmit={e=>{
                                    e.preventDefault();
                                    makecomments(e.target[0].value,item._id)
                                }}>
                                     <input type="text" placeholder="add a comment" />
                                </form>
                               
                            </div>
                        </div>
                    )
                })
            }
           
        </div>
    )
}

export default Home;