import { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const serverhost = "http://localhost:3000/"


function Home() {
  const navigate = useNavigate()
  const [data,setData] = useState({})

  useEffect(()=>{
    const getData = async()=>{
      try {
        const response = await axios.get(serverhost+"users",{withCredentials:true})
        setData(response.data)
      } catch (error) {
        console.error("Error al obtener data de usuarios",error);
        navigate("/login")
      }
    }
    getData()
  },[navigate])

  return (
    <>
      <NavBar />
      <div>Home</div>
    </>
  );
}

export default Home;
