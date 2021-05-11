import React,{useState}from 'react';
import axios from 'axios';
const Signin=({onRoute})=>
{
  const [useremail,setUsermail]=useState('');
  const [userpass,setUserpass]=useState('');
  const emaila=(e)=>{
    setUsermail(e.target.value);
  }
  const funpassword=(e)=>{
    setUserpass(e.target.value);
  }
  const submit=(e)=>
  {
    e.preventDefault();
    
    axios.post('http://localhost:3001/signup',
    {
      email:useremail,
      pass:userpass
    }).then((data)=>{
    console.log(data);
       if(data.data.auth){
        console.log(data.data);
        onRoute('home',data.data)
      }
  })
   }
    return(
       
        <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-2">
         <main className="pa4 black-80">
           <form className="measure ">
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onChange={emaila} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div class="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={funpassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
           
          </fieldset>
          <div className="">
            <input onClick={submit}
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Sign in"  />
          </div>
          <div className="lh-copy mt3">
            <p  className="f6 link dim black db" onClick={()=>onRoute('register')}>Register</p>        
          </div>
         </form>
        </main>
        </article>
       
   
      
    )
}
export default Signin;