import React from 'react'
import { useState, useEffect } from 'react';
import BasicModal from './Modal';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



// {
//     "id": 1,
//     "vehicle_number": "KL1000000",
//     "vehicle_type": "Tyota Innova",
//     "stock": 1
// }



import { getReq,putReq } from '../Services/Request';
const town_url = "http://adityanjothir.pythonanywhere.com/viewsets/town/";



const VehicleModal = (props) => {
    const [itemId,setItemId] = useState("");
    const [number,setNumber] = useState("");
    const [type, setType] = useState("");
    const [stock, setStock] = useState("");
    const [loading,setLoading] = useState(false);
    const [openmodal,setOpenmodal] = useState(false);

    

    
    const handleSave = async () => {
        setLoading(true);
        const payload = {
            vehicle_number: number,
            vehicle_type: type,
            stock: stock
        }
        const put_url = `http://adityanjothir.pythonanywhere.com/viewsets/vehicle/${itemId}/`;
        let resstatus = await putReq(put_url,payload);
        if (resstatus == 200) {
            props.handleClose();
            props.handleUpdate();
            setLoading(false);
        }
        else {
            setLoading(false);
        }
    }

    useEffect(() => {
        setItemId(props.currentrow.id);
        setNumber(props.currentrow.vehicle_number);
        setType(props.currentrow.vehicle_type);
        setStock(props.currentrow.stock);
    }, []);
    return (
        <div>
            <BasicModal open={props.open} handleClose={props.handleClose}>
                <FormControl >
                    <TextField
                        id="vehicle_number"
                        label="Vehicle Number"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value)
                        }}

                    />
                    <TextField
                        sx={{ mt: 2 }}
                        id="vehicle_type"
                        label="Vehicle Type"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value)
                        }}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        id="stock"
                        label="Stock"
                        value={stock}
                        onChange={(e) => {
                            setStock(e.target.value)
                        }}
                    />
                    <LoadingButton
                        sx={{ mt: 2 }}
                        loading={loading}
                        onClick={handleSave}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        Save
                    </LoadingButton>
                </FormControl>
            </BasicModal>
        </div>
    )
}

export default VehicleModal;