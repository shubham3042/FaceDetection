import React,{useState} from 'react';
import axios from 'axios';
const Regiser=({onRoute})=>
{
    const [fistname,setFirstname]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    return(   
        <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-2">
         <main className="pa4 black-80">
           <form className="measure ">
               <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
            <legend className="f1 fw6 ph0 mh0 btn">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"
                onChange={(e)=>setFirstname(e.target.value)}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div class="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
           
          </fieldset>
          <div className="">
            <input 
              onClick={(e)=>{
                e.preventDefault();
                console.log("hello")
                axios.post('http://localhost:3001/register',{
                  name:fistname,
                  password:password,
                  email:email
                }).then((res)=>{
                  console.log(res.data[0]);
                  onRoute('home')
                })
               
              }
              }     
             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Register"  />
          </div>
         
         </form>
        </main>
        </article>
       
   
      
    )
}
export default Regiser;