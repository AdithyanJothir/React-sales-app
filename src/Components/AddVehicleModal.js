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

import { getReq,putReq,postReq } from '../Services/Request';

const AddVehicleModal = (props) => {
    const [itemId,setItemId] = useState("");
    const [type, setType] = useState("");
    const [number,setNumber] = useState("");
    const [stock, setStock] = useState("");
    const [loading,setLoading] = useState(false);
    const [openmodal,setOpenmodal] = useState(false);

    
    const handleAdd = async () => {
        setLoading(true);
        const payload = {
            vehicle_number: number,
            vehicle_type: type,
            stock: stock
        }

        const post_url = `http://adityanjothir.pythonanywhere.com/viewsets/vehicle/`;
        let resstatus = await postReq(post_url,payload);
        if (resstatus === 201) {
            console.log("Works here");
            props.handleaddClose();
            props.handleUpdate();
            setLoading(false);
        }
        else {
            setLoading(false);
        }
    }

    useEffect(() => {
        
    }, []);

    
    return (
        <div>
            <BasicModal open={props.open} handleClose={props.handleaddClose}>
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
                        onClick={handleAdd}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                    >
                        Add
                    </LoadingButton>
                </FormControl>
            </BasicModal>
        </div>
    )
}

export default AddVehicleModal;