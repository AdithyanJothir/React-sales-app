import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {useState,useEffect} from 'react';
import {getReq} from "../Services/Request.js";
import TableLoader from "../Components/TableLoader";
import BasicModal from "../Components/Modal";
import VehicleModal from "../Components/VehicleModal"
import AddVehicleModal from "../Components/AddVehicleModal"


const Vehicles = () => {
  const columns = [
    { id: 'vehicle_number', label: 'Vehicle Number', minWidth: 100 },
    { id: 'vehicle_type', label: 'Vehicle Type', minWidth: 100 },
    { id: 'stock', label: 'Stock', minWidth: 100 },
    { id: 'controls', label: 'Buttons', minWidth: 100 },
    
  ]
  const [addOpen,setaddOpen] = useState(false);
  const [currentrow,setcurrentRow] = useState({});
  const [updated,setUpdated] = useState(false);
  const [open,setOpen] = useState(false);
  const [rows,setRows] = useState([]);
  const [isLoaded,setLoaded] = useState(false);
  const url = "https://adityanjothir.pythonanywhere.com/viewsets/vehicle/";

  const searchcolumn = "vehicle_number";
  const attr = rows.map((rows)=>{return rows.vehicle_number})

  async function addClick(){
    setaddOpen(true);
  }
  const handleaddClose = () => {
    setaddOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleUpdate = () => {
    setUpdated(!updated);
  }
  async function editClick(currow){
    setOpen(true);
    setcurrentRow(currow);
  }
  
  
  useEffect(()=> {
    async function getRows(){
      setLoaded(false);
      const result = await getReq(url);
      setRows(result);
      setLoaded(true);
    }
   getRows();
  },[updated]);

  return (
    <>
     <Sidebar>
    {addOpen == 1 ? <AddVehicleModal open={addOpen} handleaddClose={handleaddClose} handleUpdate = {handleUpdate}/>: <></>}
    {open == 1 ? <VehicleModal open={open} handleClose={handleClose} currentrow={currentrow} handleUpdate = {handleUpdate}/>: <></>}
    {isLoaded ? <Table rowsdata={rows} columnsdata={columns} url={url} editClick={editClick} addClick={addClick} handleUpdate = {handleUpdate} attr={attr} searchcolumn={searchcolumn} /> : <TableLoader/>}
    </Sidebar>
    </>
  )
}

export default Vehicles


