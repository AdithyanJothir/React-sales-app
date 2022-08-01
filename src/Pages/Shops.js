import React from 'react'
import Sidebar from '../Components/Sidebar';
import Table from '../Components/Table';
import {useState,useEffect} from 'react';
import {getReq} from "../Services/Request.js";
import TableLoader from "../Components/TableLoader";
import BasicModal from "../Components/Modal";

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
  const [isLoaded,setLoaded] = useState(false);
  useEffect(()=> {
    async function getRows(){
      const result = await getReq("https://adityanjothir.pythonanywhere.com/viewsets/shop/");
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

export default Shops