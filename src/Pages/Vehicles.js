import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {useState,useEffect} from 'react';
import {getReq} from "../Services/Request.js";
import TableLoader from "../Components/TableLoader";
import BasicModal from "../Components/Modal";



const Vehicles = () => {
  const columns = [
    { id: 'vehicle_number', label: 'Vehicle Number', minWidth: 100 },
    { id: 'vehicle_type', label: 'Vehicle Type', minWidth: 100 },
    { id: 'stock', label: 'Stock', minWidth: 100 },
    { id: 'controls', label: 'Buttons', minWidth: 100 },
    
  ]
  const [rows,setRows] = useState([]);
  const [isLoaded,setLoaded] = useState(false);
  useEffect(()=> {
    async function getRows(){
      const result = await getReq("https://adityanjothir.pythonanywhere.com/viewsets/vehicle/");
      setRows(result);
      setLoaded(true);
    }
   getRows();
  },[]);

  return (
    <>
    <Sidebar>
    {isLoaded ? <Table rowsdata={rows} columnsdata={columns}/>: <TableLoader/>}
    </Sidebar>
    </>
  )
}

export default Vehicles