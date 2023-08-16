import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css'
import  'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'


function Home(){
    

    const foods=useSelector((state)=>state.foodSlice)
    const {allFoods}=foods

    const {search}=useSelector((state)=>state.isLogin)

    const HandleSearch = () =>{
        if (search){
            return allFoods.filter((value)=>
                value.food_name.toLowerCase().includes(search) || value.type.toLowerCase().includes(search))

        }
        else{
            return allFoods
        }
}

    return(<>
        
        <Header/>


        {/* food show */}
        <div className='container-fluid'>
        <div  className='row '>
        {allFoods && HandleSearch() && HandleSearch().map((datas,index)=>{
           return(
                   <div key={index} className=" card col-3 " style={{marginRight:"2%",marginLeft:'5%',marginTop:'2%'}}>
                       <div className='  card-body' >
                         <Link to={`/foods/${datas.id}`} ><img src={datas.image} className="card-img-top w-80 imgheighthome" alt="..."/></Link>
                         <div className="card-body p-font">
                            <h2 className="card-title text-center">{datas.food_name}</h2>
                            <h3 className=" text-center">{datas.type}</h3>
                            <h5 className="text-center" >{datas.cost}</h5>
                         </div>
                        </div>
                    </div>  
                 
        
                
             )
        })}
        </div>
        </div>
        <Footer/>
    </>)
    
}

export default Home