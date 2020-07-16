import React, { useContext } from "react";
import{Link, useHistory} from "react-router-dom";
import { userContext } from "../App";
function Navbar(){
  const history=useHistory();
  const{state,dispatch}=useContext(userContext);
  function renderItems(){
    if(state){
      return[
         <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li>
          <button className="btn waves-effect waves-light red darken-3"
           onClick={()=>{
             localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/login");
           }}>
             Logout
         </button>
        </li>
      ]
    } else{
      return[
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
    return (
          <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/login"} className="brand-logo left">InstaBook</Link>
      <ul id="nav-mobile" className="right">
        {renderItems()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;