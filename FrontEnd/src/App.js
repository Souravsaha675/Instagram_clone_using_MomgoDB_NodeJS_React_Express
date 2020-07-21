import React, { createContext, useReducer, useEffect, useContext } from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
import CreatePost from './components/pages/CreatePost';
import { reducer, initialState } from './Reducers/userReducer';
import UserProfile from './components/pages/UserProfile';
import Subuserposts from './components/pages/Subuserpost';


export const userContext=createContext()

function Routing(){
  const history=useHistory();
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})

    } else{
      history.push("/login")
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/createpost">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/followingposts">
        <Subuserposts/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]= useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
   <BrowserRouter>
    <Navbar/>
    <Routing/>
   </BrowserRouter>
   </userContext.Provider>
  );
}

export default App;
