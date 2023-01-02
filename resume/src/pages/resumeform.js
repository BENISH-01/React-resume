import React,{useContext, useState,useEffect} from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import UserContext from '../context'
import axios from 'axios'
import { Link } from 'react-router-dom'



function Resumeform(){
    const[Skills,setSkills]=useState('')
    const[Language,setLanguage]=useState('')
    const[Intrest,setIntrest]=useState('')
    const [Education,setEducation]=useState({})
    const[Project,setProject]=useState({})
    const[Experience,setExperience]=useState({})
    const [Certification,setCertification]=useState({})
    const[Hobbies,setHobbies]=useState('')


    const[details,setdetails]=useState()
    

    const value=useContext(UserContext)
     const{Resume,setResume,currentUser}=value

     const user=localStorage.getItem('user')

     useEffect(()=>{
      Get_resume()
     },[Resume])
//  get all resume
     let Get_resume=async()=>{
      let {data}=await axios.get(`http://karka.academy/api/action.php?request=get_user_react_resume&user=${currentUser  ? (currentUser.name):(user)}`)
      setdetails(data.data)
    }
//  post resume
    const post=async()=>{
      let full_res={
        request:'create_react_resume',
        user:`${currentUser ? (currentUser.name):(user) }`,
        resume:Resume
      }
       const response=await axios.post('http://karka.academy/api/action.php',JSON.stringify(full_res))
       console.log(response)
       Get_resume()
      }
  console.log(Resume)
  
  // delete resume
  const Delete_Resume=async(index)=>{
        
        const {data}=await axios.get(`http://karka.academy/api/action.php?request=delete_react_user_resume&user=${currentUser  ? (currentUser.name):(user)}&id=${index}`)
        console.log(data)
        Get_resume()
  }

    const updateresume=(key,value)=>{
         let update;
         update={...Resume,[key]:value}
        setResume(update)
        console.log(Resume)
     }
  
    //  education
     const updateeducation=(key,value)=>{
       
       setEducation({...Education,[key]:value})
     }
     const Addeducation=()=>{
      const full_education=[...Resume.education,Education]
      setResume({...Resume,education:full_education})
      setEducation({...Education,course:'',institute:'',year:'',percentage:''})
    }
   
    //  skills
     const Newskill=()=>{
        let skill_list=[...Resume.skills,Skills]
        setResume({...Resume,skills:skill_list})
        setSkills('')
    }
    // languages
    const Newlang=()=>{
      let lang_list=[...Resume.languages,Language]
      setResume({...Resume,languages:lang_list})
      setLanguage('')
  }
   
       // hobbies
       const Newhobby=()=>{
        let hobby_list=[...Resume.hobbies,Hobbies]
        setResume({...Resume,hobbies:hobby_list})
        setHobbies('')
      }
      // intrest
  
      const Newintrest=()=>{
        let intrest_list=[...Resume.intrest,Intrest]
        setResume({...Resume,intrest:intrest_list})
        setIntrest('')
      }
    
   

    // project

    const updateproject=(key,value)=>{
      setProject({...Project,[key]:value})
    }
    const Addproject=()=>{
      const new_project=[...Resume.project,Project]
      setResume({...Resume,project:new_project})
      setProject({...Project,title:'',abstract:''})
    }
   


    // experience
    const update_experience=((key,value)=>{
      setExperience({...Experience,[key]:value})
    })

    const Addexperience=()=>{
        const new_exp=[...Resume.experience,Experience]
        setResume({...Resume,experience:new_exp})
        setExperience({...Experience,org:'',working_year:'',contact_information:'',role:''})
         }
   
    // certification
    const update_certification=((key,value)=>{
       setCertification({...Certification,[key]:value})
    })
    const Add_certification=()=>{
      const new_certification=[...Resume.certification,Certification]
      setResume({...Resume,certification:new_certification})
      setCertification({...Certification,course:'',duration:'',institute:''})
    }
    
// personal
const update_personal=((key,value)=>{
  const new_res=({...Resume.personal_details,[key]:value})
  setResume({...Resume,personal_details:new_res})
})








// delete skills,education,hobbies,experience,project
const Delete_items=(index,datas)=>{
       const deleted_items=Resume[datas].filter((value,position)=>index!==position)
       setResume({...Resume,[datas]:deleted_items})
}
    
     
    return(<div className='container'>
        <h2 className='text-center'>Fill The Details</h2>
        <label>NAME:</label><input placeholder='Enter your name' className='form-control' onChange={(e)=>updateresume('name',e.target.value)}/><br/>
         <label>Email:</label> <input placeholder='Enter your email' className='form-control'  onChange={(e)=>updateresume('email',e.target.value)}/><br/>
         <label>PHONE</label> <input placeholder='Enter your phone' className='form-control'  onChange={(e)=>updateresume('phone',e.target.value)}/><br/>
         <label className="label_font ">ROLE:</label><input  className='form-control' onChange={(e)=>updateresume('role',e.target.value)}/><br/>
         <label className="label_font ">OBJECTIVE:</label><input  className='form-control' onChange={(e)=>updateresume('objective',e.target.value)}/><br/>

           {/* personaldetails */}
       <label>AGE:</label><input className='form-control' onChange={(e)=>update_personal('age',e.target.value)} />
         <label>MARTIAL_STATUS:</label><input onChange={(e)=>update_personal('martial_status',e.target.value)} className='form-control' />
         <label >GENDER:</label><input onChange={(e)=>update_personal('gender',e.target.value)} className='form-control'/>
         <label >FATHER'S NAME:</label><input onChange={(e)=>update_personal('father_name',e.target.value)} className='form-control' />
         <label >ADDRESS:</label><input  className='form-control' onChange={(e)=>update_personal('address',e.target.value)}/>

         {/* intrest */}

         <div className='row'>
          <div className='col-10'>
          <label >INTREST:</label><input className='form-control' value={Intrest} onChange={(e)=>setIntrest(e.target.value)}/>

          </div>
          <div className='col-2 mt-4'><button className='btn btn-primary' type='button' onClick={Newintrest}>+</button></div>
         </div>         
         {Resume.intrest && Resume.intrest.map((data,index)=>{ 
                return(< >
                       
                      <div key={index}>
                      <table className='table'>
                          <tbody >
                         
                          <tr >
                            <td>
                                {index+1}
                            </td>
                            <td className='col-8'>
                                {data}
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>Delete_items(index,'intrest')} >Remove</button>
                            </td>
                          </tr>
                          </tbody>
                       </table>
                      </div>
                </>)
               })}

         {/* languages */}

         
         <div className='row'>
          <div className='col-10'>
          <label >LANGUAGE:</label><input className='form-control' value={Language} onChange={(e)=>setLanguage(e.target.value)}/>

          </div>
          <div className='col-2 mt-4'><button className='btn btn-primary' type='button' onClick={Newlang}>+</button></div>
         </div>         
         {Resume.languages && Resume.languages.map((data,index)=>{ 
                return(< >
                       
                      <div key={index}>
                      <table className='table'>
                          <tbody >
                         
                          <tr >
                            <td>
                                {index+1}
                            </td>
                            <td className='col-8'>
                                {data}
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>Delete_items(index,'languages')} >Remove</button>
                            </td>
                          </tr>
                          </tbody>
                       </table>
                      </div>
                </>)
               })}

         {/* skills */}
         
         <div className='row'>
          <div className='col-10'>
            <label>SKILLS:</label> <input value={Skills} className='form-control col-8' onChange={(e)=>setSkills(e.target.value)}/>

          </div>
          <div className='col-2 mt-4'><button className='btn btn-primary' type='button' onClick={Newskill}>+</button></div>
         </div>
                    

               {Resume.skills && Resume.skills.map((data,index)=>{ 
                return(< >
                       
                      <div key={index}>
                      <table className='table'>
                          <tbody >
                         
                          <tr >
                            <td>
                                {index+1}
                            </td>
                            <td className='col-8'>
                                {data}
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>Delete_items(index,'skills')} >Remove</button>
                            </td>
                          </tr>
                          </tbody>
                       </table>
                      </div>
                </>)
               })}

           {/* hobbies */}

       <div className='row'>
          <div className='col-10'>
            <label>HOBBIES:</label> <input value={Hobbies} className='form-control col-8' onChange={(e)=>setHobbies(e.target.value)}/>

          </div>
          <div className='col-2 mt-4'><button className='btn btn-primary' type='button' onClick={Newhobby}>+</button></div>
        </div>
        
        {Resume.hobbies && Resume.hobbies.map((data,index)=>{ 
                return(< >
                       
                      <div key={index}>
                      <table className='table'>
                          <tbody >
                         
                          <tr >
                            <td>
                                {index+1}
                            </td>
                            <td className='col-8'>
                                {data}
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>Delete_items(index,'hobbies')} >Remove</button>
                            </td>
                          </tr>
                          </tbody>
                       </table>
                      </div>
                </>)
               })}       

               {/* education */}
               <label>EDUCATION:</label>
    <table className="table">
           <thead>
             <tr>
               
               <th scope="col">Course</th>
               <th scope="col">Year</th>
               <th scope="col">Institute</th>
               <th scope="col">Percentage</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               
               <td><input value={Education.course} onChange={(e)=>{updateeducation('course',e.target.value)}}/></td>
               <td><input value={Education.year} onChange={(e)=>{updateeducation('year',e.target.value)}} /></td>
               <td><input value={Education.institute}  onChange={(e)=>{updateeducation('institute',e.target.value)}}/></td>
               <td><input value={Education.percentage} onChange={(e)=>{updateeducation('percentage',e.target.value)}}/></td>
               <td><button className='btn btn-primary' onClick={Addeducation}>+</button></td>
             </tr>
            </tbody>
    </table>
      {Resume.education && Resume.education.map((data,index)=>{
       return(<div key={index}>
          <table className='table'>
         <tbody >
        
         <tr >
           <td>
               {index+1}
           </td>
           <td className='col-2'>
               {data.course}
           </td>
           <td className='col-2'>
               {data.year}
           </td>
           <td className='col-2'>
               {data.institute}
           </td>
           <td className='col-2'>
               {data.percentage}
           </td>
           <td>
               <button className='btn btn-danger' onClick={()=>Delete_items(index,'education')} >Remove</button>
           </td>
         </tr>
         </tbody>
      </table>
       </div>)

     
      
           
      })}
    {/* project */}
    <label >PROJECTS:</label>
        <table className="table">
         <thead>
           <tr>
            
             <th scope="col">Title</th>
             <th scope="col">Abstract</th>
            
           </tr>
         </thead>
         <tbody>
           <tr>
             
             <td><input type="text" value={Project.title} onChange={(e)=>{updateproject('title',e.target.value)}}/></td>
             <td><textarea type="text" value={Project.abstract} onChange={(e)=>{updateproject('abstract',e.target.value)}}></textarea></td>
             <td><button className='btn btn-primary' type='button' onClick={Addproject}>+</button></td>
            
           </tr>
           </tbody>
           </table>

           {Resume.project && Resume.project.map((value,index)=>{

             return(
              <div key={index}>
                <table className='table'>
                    <tbody >
                  
                    <tr >
                      <td>
                          {index+1}
                      </td>
                      <td className='col-4'>
                          {value.title}
                      </td>
                      <td className='col-4'>
                          {value.abstract}
                      </td>
                      <td>
                          <button className='btn btn-danger' onClick={()=>Delete_items(index,'project')} >Remove</button>
                      </td>
                    </tr>
                    </tbody>
                </table>
                </div>
             )

           })}

           {/* experience */}
           <label>EXPERIENCE:</label>
           <table className="table">
           <thead>
             <tr>
              
               <th scope="col">Organization</th>
               <th scope="col">Role</th>
               <th scope="col">Working_year</th>
               <th scope="col">Contact_information</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               
               <td><input value={Experience.org} onChange={(e)=>{update_experience('org',e.target.value)}} /></td>
               <td><input value={Experience.role}  onChange={(e)=>{update_experience('role',e.target.value)}} /></td>
               <td><input value={Experience.working_year}  onChange={(e)=>{update_experience('working_year',e.target.value)}} /></td>
               <td><input value={Experience.contact_information}  onChange={(e)=>{update_experience('contact_information',e.target.value)}}/></td>
               <td><button className='btn btn-primary ' onClick={Addexperience}>+</button></td>
             </tr>
          
           
           </tbody>
         </table><br/><br/>

         {Resume.experience && Resume.experience.map((data,index)=>{
          return(<div key={index}>
               <table className='table'>
                    <tbody >
                  
                    <tr >
                      <td>
                          {index+1}
                      </td>
                      <td className='col-4'>
                          {data.org}
                      </td>
                      <td className='col-4'>
                          {data.role}
                      </td>
                      <td className='col-4'>
                          {data.working_year}
                      </td>
                      <td className='col-4'>
                          {data.contact_information}
                      </td>
                      <td>
                          <button className='btn btn-danger' onClick={()=>Delete_items(index,'experience')} >Remove</button>
                      </td>
                    </tr>
                    </tbody>
                </table>

          </div>)
         })}
     {/* certification */}
     <label className="label_font">CERTIFICATION:</label><br/><br/>
        <table className="table">
           <thead>
             <tr>
              
               <th scope="col">course</th>
               <th scope="col">Institute</th>
               <th scope="col">Duration</th>
               
             </tr>
           </thead>
           <tbody>
               <tr>
                  
                   <td><input value={Certification.course} type="text" onChange={(e)=>update_certification('course',e.target.value)}/></td>
                   <td><input value={Certification.institute} onChange={(e)=>update_certification('institute',e.target.value)}/></td>
                   <td><input  value={Certification.duration} onChange={(e)=>update_certification('duration',e.target.value)}/></td>
                   <td><button onClick={Add_certification} className='btn btn-primary'>+</button></td>
                   
                   
               </tr>
               
              
           </tbody>
        </table><br/><br/>
        {Resume.certification && Resume.certification.map((data,index)=>{
       return(<div key={index}>
          <table className='table'>
         <tbody >
        
         <tr >
           <td>
               {index+1}
           </td>
           <td className='col-2'>
               {data.course}
           </td>
           <td className='col-2'>
               {data.institute}
           </td>
           
           <td className='col-2'>
               {data.duration}
           </td>
           <td>
               <button className='btn btn-danger' onClick={()=>Delete_items(index,'certification')} >Remove</button>
           </td>
         </tr>
         </tbody>
      </table>
       </div>)})}
       <button className='btn btn-primary mt-1 col-12' type='button' onClick={post}> Submit Resume</button>
      
       <div className='text-center mt-4'><h3>All Resumes</h3></div>
      {details && details.map((detail,index)=>{
        
        return(<div key={index} className='mt-4'>
                  <table className='table'>
                          <tbody >
                         
                            <tr >
                              <td>
                                  {index+1}
                              </td>
                              <td className='col-8'>
                                  {JSON.parse(detail.data).name}
                              </td>
                              <td>
                                  <button className='btn btn-danger' type='button' onClick={()=>Delete_Resume(detail.id)} >Delete</button>
                              </td>
                              <td>
                                  <Link to={`/View/${detail.id}`} >  <button className='btn btn-success'>View</button> </Link>
                              </td>
                            </tr>
                          </tbody>
                       </table>
          
        </div>)
      })}
    </div>)

    
    
      
}

export default Resumeform