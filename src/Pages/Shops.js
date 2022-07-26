import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {useState,useEffect} from 'react';
import {getReq} from "../Services/Request.js";
import TableLoader from "../Components/TableLoader";
import ShopsModal from "../Components/ShopsModal";
import AddShopModal from "../Components/AddShopModal"

//  {
//   "id": 5,
//   "name": "Microsoft",
//   "shop_id": "Microsoft",
//   "contact_number": 1234567890,
//   "email": "microsoft@g.com",
//   "town": 1
// }

const Shops = () => {
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'shop_id', label: 'Shop ID', minWidth: 100 },
    { id: 'contact_number', label: 'Contact', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'town', label: 'Town', minWidth: 100 },
    { id: 'controls', label: 'Buttons', minWidth: 100 },    
  ]
  const [rows,setRows] = useState([]);
  const [open,setOpen] = useState(false);
  const [addOpen,setaddOpen] = useState(false);
  const [currentrow,setcurrentRow] = useState({});
  const [updated,setUpdated] = useState(false);
  
  const searchcolumn = "shop_id";
  const attr = rows.map((rows)=>{return rows.shop_id})

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

  
  const url = "https://adityanjothir.pythonanywhere.com/viewsets/shop/";
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
    {addOpen == 1 ? <AddShopModal open={addOpen} handleaddClose={handleaddClose} handleUpdate = {handleUpdate}/>: <></>}
    {open == 1 ? <ShopsModal open={open} handleClose={handleClose} currentrow={currentrow} handleUpdate = {handleUpdate}/>: <></>}
    {isLoaded ? <Table rowsdata={rows} columnsdata={columns} url={url} editClick={editClick} addClick={addClick} handleUpdate = {handleUpdate} attr={attr} searchcolumn={searchcolumn}/> : <TableLoader/>}
    </Sidebar>
    </>
  )
}

export default Shops