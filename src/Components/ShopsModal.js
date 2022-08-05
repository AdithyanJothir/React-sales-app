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

import { getReq,putReq } from '../Services/Request';
const town_url = "http://adityanjothir.pythonanywhere.com/viewsets/town/";
const ShopsModal = (props) => {
    const [itemId,setItemId] = useState("");
    const [name, setName] = useState("");
    const [shopId, setShopId] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [town, setTown] = useState("");
    const [townlist, setTownlist] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openmodal,setOpenmodal] = useState(false);

    
    const handleSave = async () => {
        setLoading(true);
        const payload = {
            name: name,
            shop_id: shopId,
            contact_number: contact,
            email: email,
            town: town
        }
        const put_url = `http://adityanjothir.pythonanywhere.com/viewsets/shop/${itemId}/`;
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
        async function getTowns() {
            const res = await getReq(town_url);
            setTownlist(res);
            console.log(res);
        }
        getTowns();
        setItemId(props.currentrow.id);
        setName(props.currentrow.name);
        setShopId(props.currentrow.shop_id);
        setContact(props.currentrow.contact_number);
        setEmail(props.currentrow.email);
        setTown(props.currentrow.town);

    }, []);
    return (
        <div>
            <BasicModal open={props.open} handleClose={props.handleClose}>
                <FormControl >
                    <TextField
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}

                    />
                    <TextField
                        sx={{ mt: 2 }}
                        id="shop_id"
                        label="Shop ID"
                        value={shopId}
                        onChange={(e) => {
                            setShopId(e.target.value)
                        }}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        id="contact_number"
                        label="Contact Number"
                        value={contact}
                        onChange={(e) => {
                            setContact(e.target.value)
                        }}
                    />

                    <TextField
                        sx={{ mt: 2 }}
                        id="email_number"
                        label="Email"

                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />

                    <Select


                        sx={{ mt: 2 }}
                        id="town"
                        value={town}
                        onChange={(e) => {
                            setTown(e.target.value)
                        }}
                    >
                        {townlist.map((townlist) => {
                            return (<MenuItem value={townlist.id}>{townlist.name}</MenuItem>);
                        })}


                    </Select>
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

export default ShopsModal