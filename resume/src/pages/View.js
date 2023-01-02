import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate, Navigate} from 'react-router-dom'
import UserContext from '../context'
import '../App.css'
import  'bootstrap/dist/css/bootstrap.min.css'


function ViewResume(){

    
    const navigate=useNavigate()
    const params=useParams()

    const value=useContext(UserContext)
    
    const[Viewresume,setViewresume]=useState('')

    const user=localStorage.getItem('user')
    const local_check=localStorage.getItem('login')
    

   const {currentUser}=value
   
  //  view
useEffect(()=>{
  if(!value.isLogin && local_check==false){
    navigate('/')
  }
   View(params.id)
},[params.id])


   const View=async()=>{
    const {data}=await axios.get(`http://karka.academy/api/action.php?request=get_react_resume_by_id&user=${currentUser ? (currentUser.name):(user)}&id=${params.id}`)
    console.log(data)
    let detail=data.data
    let full_detail=JSON.parse(detail.data)
    setViewresume({...full_detail})
   
}
console.log(Viewresume)
   

    return(<div className='container main-res'>

    {Viewresume &&
    
       <div className="container head ">
  
       <div className="row row_1 bg-dark text-white ">
         <div className="col-6 my mt-5" id="main_details">
           <p><label className="lab">NAME</label><span className="headlab" id="nameT">{Viewresume.name}</span></p>
           <p><label className="lab">E-mail</label><span  className="headlab" id="emailT">{Viewresume.email}</span></p>
           <p><label className="lab">PHONE</label><span className="headlab"  id="phoneT">{Viewresume.phone}</span></p>
           <p><label className="lab">ROLE</label><span className="headlab" id="roleT">{Viewresume.role}</span></p>
           
          </div>
         <div className="col-6 ">
           
             <div className="card bg-dark  mt-5" id="objective">
                 
                 <div className="card-body">
                   <h5 className="card-title"><p><label className="lab">Objective</label></p></h5>
                   <p className="card-text ml-3 obj" id="objT">{Viewresume.objective}</p>
                 </div>
             </div>
             
           
         </div>
       </div>
      
        
   
   
       {/* <!-- education --> */}
       <h2 className="mt-4 bg-primary text-white text-center">Education</h2>
       
      {Viewresume && Viewresume.education.map((item,index)=>{

         return(<>
            <div key={index}>
                
                 <div className='row'>
                                      <div className='col-6'>
                                         <div className='row'>
                                           <div className='col-5'><h4>Course:</h4></div>
                                           <div className='col-7'><h4>{item.course}</h4></div>
                                          </div>
                                   
                                      </div>
                                      <div className='col-6'>
                                         <div className='row'>
                                             <div className='col-5'><h4>Year:</h4></div>
                                            <div className='col-7'><h4>{item.year}</h4></div>
                                       </div>
                                      </div>
                                   </div>
                                   <div className='row'>
                                      <div className='col-6'>
                                         <div className='row'>
                                           <div className='col-5'><h4>Institute:</h4></div>
                                           <div className='col-7'><h4>{item.institute}</h4></div>
                                          </div>
                                   
                                      </div>
                                      <div className='col-6'>
                                         <div className='row'>
                                             <div className='col-5'><h4>Percentage:</h4></div>
                                            <div className='col-7'><h4>{item.percentage}</h4></div>
                                       </div>
                                      </div>
                                   </div>
                                   
                                    
            </div>
            <hr/>
     </>)
          
      })}
   
            {/* <!-- skills --> */}
           <div className="row row_2">
             <div className="col-4 margint">
                   <div className="card labwidth ">
                       
                     <div className="card-body " id="skill_place">
                       <h2 className="card-title bg-primary text-center text-white">Skills</h2>
                            {Viewresume && Viewresume.skills.map((item,index)=>{
                                return(<div key={index}>
                                    <h4>{index+1}.{item}</h4>
                                </div>)
                            })}
                     </div>
                     
                   </div>
                   {/* languages */}

                   <div className="card labwidth margint">
        
                     <div className="card-body" id="lang_place">
                       <h2 className="card-title bg-primary text-white">Languages known</h2>
                       {Viewresume && Viewresume.languages.map((item,index)=>{
                                return(<div key={index}>
                                    <h4>{index+1}.{item}</h4>
                                </div>)
                            })}
                       
                       
                     </div>
                   </div>
                    
                
                   
                   <div className="card labwidth margint">
                   
                     <div className="card-body" id="intrest_place">
                       <h2 className="card-title bg-primary text-center text-white">Intrest</h2>
                       {Viewresume && Viewresume.intrest.map((item,index)=>{
                                return(<div key={index}>
                                    <h4>{index+1}.{item}</h4>
                                </div>)
                            })}
                       
                     </div>
                   </div>

                   {/* <!-- hobbies --> */}
                    <div className="card labwidth margint">
                   
                     <div className="card-body" id="hob_place">
                       <h2 className="card-title bg-primary text-center text-white">Hobbies</h2>
                           {Viewresume && Viewresume.hobbies.map((item,index)=>{
                              return(<>
                              <div key={index}>
                              <h4>{index+1}.{item}</h4>
                              </div></>)
                           })}
                       
                     </div>
                   </div>
                 
             </div>       
   
                   <div className="col-8">
                         {/* <!-- personal --> */}
                        <div className="card labwidth">
                   
                          <div className="card-body" id="personal_place">
                              <h2 className="card-title text-center bg-primary text-center text-white">Personal_details</h2>
                              <h4>Age:{Viewresume.personal_details.age}</h4>
                              <h4>Gender:{Viewresume.personal_details.gender}</h4>
                              <h4>Address:{Viewresume.personal_details.address}</h4>
                              <h4>Martial_status:{Viewresume.personal_details.martial_status}</h4>
                              <h4>Father's Name:{Viewresume.personal_details.father_name}</h4>
                          </div>
                           
                        </div>
                            
   
                         
                             
                             {/* <!-- certification --> */}
                        <div className="card labwidth">
                   
                               <div className="card-body " id="cer_place">
                                 <h2 className="card-title text-center bg-primary text-center text-white">Certifications</h2>
                                  {Viewresume && Viewresume.certification.map((item,index)=>{
                                    return(<div key={index}>
                                    <div className='row'>
                                        <div className='col-4'><h4>Course:</h4></div>
                                        <div className='col-8'><h4>{item.course}</h4></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-4'><h4>Institute:</h4></div>
                                        <div className='col-8'><h4>{item.institute}</h4></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-4'><h4>Duration:</h4></div>
                                        <div className='col-8'><h4>{item.duration}</h4></div>
                                    </div>
                                    <hr/>
                                    </div>)
                                  })}
                                 
                                 
                                 
                               </div>
                             </div>
                          
   
                             {/* <!-- project --> */}
                             <div className="card labwidth">
                   
                               <div className="card-body" id="project_place">
                                 <h2 className="card-title text-center bg-primary text-center text-white">Projects</h2>
                                 {Viewresume && Viewresume.project.map((item,index)=>{
                                    return(<div key={index}>
                                    <div className='row'>
                                        <div className='col-4'><h4>Title:</h4></div>
                                        <div className='col-8'><h4>{item.title}</h4></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-4'><h4>Abstract:</h4></div>
                                        <div className='col-8'><h4>{item.abstract}</h4></div>
                                    </div>
                                   
                                    <hr/>
                                    </div>)
                                  })}
                               </div>
                             </div>
                        </div>
   
             </div>
                 {/* <!-- experience --> */}
                 <div className="card labwidth">
                   
                   <div className="card-body" id="exp_place">
                     <h2 className="card-title text-center bg-primary text-white">Experience</h2>
                     {Viewresume && Viewresume.experience.map((item,index)=>{
                                    return(<div key={index}>
                                   <div className='row'>
                                      <div className='col-6'>
                                         <div className='row'>
                                           <div className='col-5'><h4>Organization</h4></div>
                                           <div className='col-7'><h4>{item.org}</h4></div>
                                          </div>
                                   
                                      </div>
                                      <div className='col-6'>
                                         <div className='row'>
                                             <div className='col-5'><h4>Role</h4></div>
                                            <div className='col-7'><h4>{item.role}</h4></div>
                                       </div>
                                      </div>
                                   </div>
                                   <div className='row'>
                                      <div className='col-6'>
                                         <div className='row'>
                                           <div className='col-5'><h4>Working_year</h4></div>
                                           <div className='col-7'><h4>{item.working_year}</h4></div>
                                          </div>
                                   
                                      </div>
                                      <div className='col-6'>
                                         <div className='row'>
                                             <div className='col-5'><h4>Contact_info</h4></div>
                                            <div className='col-7'><h4>{item.contact_information}</h4></div>
                                       </div>
                                      </div>
                                   </div>
                                   
                                    <hr/>
                                    </div>)
                                  })}
                   </div>
               </div>
      </div>

        

    } 
     
    </div>)
}

export default ViewResume;