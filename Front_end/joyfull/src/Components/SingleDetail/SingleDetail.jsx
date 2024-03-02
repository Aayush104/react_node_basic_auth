import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate  } from 'react-router-dom'
import axios from 'axios';
import Footer from '../Footer/Footer';
import InnerNav from '../InnerNav/InnerNav';
import './SingleDetail.css'


const SingleDetail = () => {

  const navigateTo = useNavigate()

    const {id} = useParams();

    const [detail,setDetail] = useState(null)
  
    useEffect(()=>{
  
      const fetchData = async ()=>{
  
        try {
          const response = await axios.get(`http://localhost:5000/Detail/${id}`);
        setDetail(response.data)
        } catch (error) {
          console.log(error);
        }
        
  
      }
  
      fetchData();
    }, [id])


    const handleDelete = async (id)=>{
      try{
       const response =  await axios.delete(`http://localhost:5000/Delete/${id}`)
    
       if(response && response.data == 'successfully deleted'){
        navigateTo('/Mypost')

        setTimeout(()=>{
   
            window.alert("Your Post has been successfully deleted")
        

        },500)
       }
       

      }catch(error){
        console.log(error)

      }

    }
    return (
      <div className='w-single'>
      <InnerNav />
  <div>
    
  </div>
  
  {detail && detail[0] && (
    <div className='m-single'>
    <img src={detail[0].PetPhoto}></img>
  
  <div>
  <div className='detail_contain'>
  
  <p>Meet {detail[0].PetName}</p>
  </div>
  <div className='right'>
  <div className='detail_span'> 
  <p>Gender: <span>{detail[0].PetGender}</span></p>
  <p>Health: <span>{detail[0].Health}</span></p>
  <p>Age: <span>{detail[0].Age}</span></p>
  
  
  </div>
  <div className='detail_span'> 
  
  <p>Breed: <span>{detail[0].Breed}</span></p>
  <p>Size: <span>{detail[0].Petsize}</span></p>
  <p> Owner: <span>{detail[0].user.UserName}</span></p>
  
  
  
  </div>
      </div>
      
    
      <div className='desrciption'>  
      <span>{detail[0].PetLikings}</span>
      <button className='Applybtm'>Apply Today</button>
      </div>
      </div>
  
  </div>
       )}
  
  {detail && detail[0] &&(
  <>
  <div className='About_pets'>
  <h2> About {detail[0].PetName}</h2>
  <p>{detail[0].AboutPet}</p>
  </div>
  
  </>
  )}
  
  <div className='d-btns'>

  {detail && detail[0] && (
    <NavLink to={`/Edit/${detail[0].ID}`}>
  <button className='edit_btn'>Edit</button>
  </NavLink>

  )}
 
  <button className='delete_btn' onClick={() => handleDelete(detail[0].ID)}>Delete</button>




  </div>
 
       <Footer />
      </div>
    )
  }
  

export default SingleDetail
