import React, { useState, useContext } from "react";
import{Link, useHistory} from "react-router-dom"
import M from "materialize-css";
import { userContext } from "../../App";


function Login(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const history =useHistory();
    const{state,dispatch}= useContext(userContext);

    function PostData(){
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            M.toast({
                html: "Invalid Email or Add all Filds",
                classes: "red"
            })
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
          
            if(data.error){
                
                M.toast({html:data.error,classes:"red"})
            } else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signin successfull",classes:"green"})
                history.push("/")
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
 <div className="mycard">
     <div className="card auth-card input-field">
         <h2>InstaBook</h2>
         <input type="text" value={email} onChange={e=>setemail(e.target.value)} placeholder="Email"/>
         <input type="password" value={password} onChange={e=>setpassword(e.target.value)} placeholder="Password"/>
         <button className="btn waves-effect waves-light" onClick={()=>PostData()}>
             Login
         </button>
         <h4>
             <Link to="/signup">Don't have an account?</Link>
         </h4>
     </div>
 </div>
)
}

export default Login;