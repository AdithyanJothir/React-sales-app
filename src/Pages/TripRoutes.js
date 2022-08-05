import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {useState,useEffect} from 'react';
import {getReq} from "../Services/Request.js";
import TableLoader from "../Components/TableLoader";
import ShopsModal from "../Components/ShopsModal";
import AddRouteModal from "../Components/AddRouteModal"



const Shops = () => {
  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'route_id', label: 'Route Id', minWidth: 100 },
    { id: 'towns', label: 'Towns', minWidth: 100 },
    { id: 'shops', label: 'Shops', minWidth: 100 },   
  ]
  const [rows,setRows] = useState([]);
  const [open,setOpen] = useState(false);
  const [addOpen,setaddOpen] = useState(false);
  const [currentrow,setcurrentRow] = useState({});
  const [updated,setUpdated] = useState(false);
  
  const searchcolumn = "route_id";
  const attr = rows.map((rows)=>{return rows.route_id})

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

  
  const url = "https://adityanjothir.pythonanywhere.com/viewsets/route/";
  const [isLoaded,setLoaded] = useState(false);
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
    {addOpen == 1 ? <AddRouteModal open={addOpen} handleaddClose={handleaddClose} handleUpdate = {handleUpdate}/>: <></>}
    {open == 1 ? <ShopsModal open={open} handleClose={handleClose} currentrow={currentrow} handleUpdate = {handleUpdate}/>: <></>}
    {isLoaded ? <Table rowsdata={rows} columnsdata={columns} url={url} editClick={editClick} addClick={addClick} handleUpdate = {handleUpdate} attr={attr} searchcolumn={searchcolumn}/> : <TableLoader/>}
    </Sidebar>
    </>
  )
}

export default Shops