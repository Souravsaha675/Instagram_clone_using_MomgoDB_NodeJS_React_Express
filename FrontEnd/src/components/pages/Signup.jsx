import React, { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";
import { Clouduri } from "../../CloudKey";

function Signup(){
   
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [image, setimage] = useState("");
    const [url, seturl] = useState(undefined);
    const history=useHistory()
    useEffect(()=>{
        if(url){
            UplodeFields()
        }
    },[url])
    function UplodeImage() {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "InstaBook")
        data.append("cloud_name", "sourav675")
        fetch(Clouduri, {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                seturl(data.url)
            })
            .catch(err => {
                console.log(err)
            })


    }

    function UplodeFields(){
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            M.toast({
                html: "Invalid Email or Add all Filds",
                classes: "red"
            })
            return
        }
        fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    pic:url
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: "red"
                    });
                } else {
                    M.toast({
                        html: data.massage,
                        classes: "green"
                    })
                    history.push('/login')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function PostData(){

        if(image){
            UplodeImage()
        } else{
            UplodeFields()
        }
   
    }

    

    return(
        <div className="mycard">
     <div className="card auth-card input-field">
         <h2>InstaBook</h2>
         <input type="text" value={name} onChange={e=>setname(e.target.value)} placeholder="Full Name"/>
         <input type="text" value={email} onChange={e=>setemail(e.target.value)} placeholder="Email"/>
         <input type="password" value={password} onChange={e=>setpassword(e.target.value)} placeholder="Password"/>
         <div className="file-field input-field">
                <div className="btn"> 
                    <span>Uplode Image</span>
                    <input type="file" onChange={e=>setimage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
         <button className="btn waves-effect waves-light" onClick={()=>PostData()}>
             SignUp
         </button>
         <h4>
             <Link to="/login">Already have an account?</Link>
         </h4>
     </div>
 </div>
    )
}

export default Signup;