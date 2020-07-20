import React, { useState, useEffect } from  "react";
import{useHistory} from "react-router-dom"
import M from "materialize-css";
import { Clouduri } from "../../CloudKey";

function CreatePost(){
    const[title,settitle]=useState("");
    const[body,setbody]=useState("");
    const[image,setimage]=useState("");
    const[url,seturl]=useState("");
    const history=useHistory();
    useEffect(()=>{
        if(url){
            fetch("/createpost", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "sourav " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        title,
                        body,
                        images: url
                    })
                })
                .then(res => res.json())
                .then(data => {

                    if (data.error) {
                        M.toast({
                            html: data.error,
                            classes: "red"
                        })
                    } else {
                        M.toast({
                            html: "Created post successfull",
                            classes: "green"
                        })
                        history.push("/")
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },[url]);
  
    function postdata(){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","InstaBook")
        data.append("cloud_name","sourav675")
        fetch(Clouduri,{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            seturl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

        
    }

    return(
        <div className="card input-filed createpost">
            <input type="text" value={title} onChange={e=>settitle(e.target.value)} placeholder="Title"/>
            <input type="text" value={body} onChange={e=>setbody(e.target.value)} placeholder="Body"/>
            <div className="file-field input-field">
                <div className="btn"> 
                    <span>Uplode Image</span>
                    <input type="file" onChange={e=>setimage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue" onClick={()=>postdata()}>
                Submit Post
            </button>
        </div>
    )
} 

export default CreatePost;    