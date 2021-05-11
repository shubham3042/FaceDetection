import React, { Component } from 'react';
import Nav from './componet/Nav';
import 'tachyons';
import './componet/nav.css';
import Logo from './componet/Logos/Logo';
import Serchbar from './componet/Serchbar/Serchbar';
import Facerecornization from './componet/Facerecornization/Facerecornization';
import Rank from './componet/Rank/Rank';
import Signin from './componet/Signin/Signin';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Register from './componet/Register/Register'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
const para={
  
    particles: {
      number:
      {
        value:50,
         density:{
          enable:true,
          value_area:800
        }
      }
      
    }
}
const app = new Clarifai.App({
  apiKey: '52915c8fae5443318440a2f8e324f7f7'
 });


class App extends Component {
  constructor()
  {
    super();
    this.state={
      input:'',
      imgurl:'',
      boxes:[],
      router:'signin',
      isSigin:false,
      userdata:null,
      totalface:0,
      displayalert:false
    }
  }
  oninputchange=(event)=>
  {
      this.setState({input:event.target.value})
  }
  caluclateface=(data)=>
  {
    console.log(data);
   
   
 const image=document.getElementById('inputimg');
    const width=Number(image.width);
    const height=Number(image.height);
    let arr = [];
    let objBox = [];
    data.outputs[0].data.regions.forEach(region =>{
      arr.push(region.region_info.bounding_box);
    })

    arr.forEach(box => {
      var obj = {}
      obj.leftcol = box.left_col * width
      obj.toprow = box.top_row * height
      obj.rightcol = width-(box.right_col*width)
      obj.bottomrow = height-(box.bottom_row*height)
      objBox.push(obj);
    })
    
   return objBox;
  }
  displayface=(data)=>
  {
     if(data.length>10)
    {
      this.setState({displayalert:true})
    }
    this.setState({totalface:data.length})
    this.setState({boxes:data})
  }
  onRouteChange=(rout,data)=>
  {
    if(rout==='signin')
    {
      this.setState({isSigin:false})
      
    }
     else if(rout==='home')
    {
      this.setState({userdata:data})
      this.setState({isSigin:true})
    }  
       this.setState({router:rout});
  }
  onclick=()=>
  {
    console.log(this.state.userdata)
    this.setState({imgurl:this.state.input})
    this.setState({totalface:0})
    axios.post('http://localhost:3001/image',{
      input:this.state.input,
      id:this.state.userdata.u_id
    }).then(res=>{
      var obj=this.state.userdata
      obj['entries']=parseInt( obj['entries'])+1
      this.setState({userdata:obj})
      this.displayface(this.caluclateface(res.data))
    })
    // app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(response=>
    //     this.displayface(this.caluclateface(response)))
    // .catch(err=>console.log(err)); 
  }
  


render()
{
  return (
    <div className="App">
      <Particles 
       params={para}
           className="particle" />
      <Nav onRoute={this.onRouteChange} isSignin={this.state.isSigin}/>
     { (this.state.router==='home')?
     <div>
     <Logo />
     <Rank usedata={this.state.userdata}/>
     <Serchbar oninputchange={this.oninputchange} onclick={this.onclick} />
     <Facerecornization boxes={this.state.boxes} imgid={this.state.imgurl} />
     {
       this.state.displayalert ?
        <SweetAlert
              warning
              confirmBtnText="Okk"
              confirmBtnBsStyle="danger"
              title="Please Maintain Social Distance"
              onConfirm={()=>this.setState({displayalert:false})}
              focusCancelBtn
            >
      </SweetAlert>
      :null
    }
     </div>:
     (this.state.router==='signin')?
        <Signin onRoute={this.onRouteChange}/>
        :<Register onRoute={this.onRouteChange} />
        
     }
    </div>
  );
}
}
export default App;
