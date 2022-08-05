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
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';


import { getReq,putReq,postReq } from '../Services/Request';
const town_url = "http://adityanjothir.pythonanywhere.com/viewsets/town/";
const shop_url = "http://adityanjothir.pythonanywhere.com/viewsets/shop/";

const AddRouteModal = (props) => {
    
    const [name, setName] = useState("");
    const [routeId, setrouteId] = useState("");
    const [town, setTown] = useState([]);
    const [townlist, setTownlist] = useState([]);
    const [shop, setShop] = useState([]);
    const [shoplist, setShoplist] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openmodal,setOpenmodal] = useState(false);
    
    const handleAdd = async () => {
        setLoading(true);
        
        const payload = {
            name: name,
            route_id: routeId,
            towns: town,
            shops: shop
        }

        console.log(payload);

        const post_url = `http://adityanjothir.pythonanywhere.com/viewsets/route/`;
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
        async function getTowns() {
            const res = await getReq(town_url);
            setTownlist(res);
            console.log(res);
        }
        getTowns();
    }, []);

    useEffect(() => {
        async function getShops() {
            const res = await getReq(shop_url);
            setShoplist(res);
            console.log(res);
        }
        getShops();
    }, []);



    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    
   
      
    
    function getStyles(townlist, town, theme) {
      return {
        fontWeight:
        town.indexOf(townlist) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    };
    
    
      const theme = useTheme();
    
      const handleTownChange = (event) => {
        const {
          target: { value },
        } = event;
        setTown(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const handleShopChange = (event) => {
        const {
          target: { value },
        } = event;
        setShop(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    


    
    return (
        <div>
            <BasicModal open={props.open} handleClose={props.handleaddClose}>
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
                        value={routeId}
                        onChange={(e) => {
                            setrouteId(e.target.value)
                        }}
                    />
                

        <Select
          sx={{mt:2}}
          id="demo-multiple-chip"
          multiple
          value={town}
          onChange={handleTownChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {townlist.map((towns) => (
            <MenuItem
              key={towns["id"]}
              value={towns.id}
              style={getStyles(towns, town, theme)}
            >
              {towns.name}
            </MenuItem>
          ))}
        </Select>



        <Select
          sx={{mt:2}}
          id="demo-multiple-chip"
          multiple
          value={shop}
          onChange={handleShopChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {shoplist.map((shops) => (
            <MenuItem
              key={shops["id"]}
              value={shops.id}
              style={getStyles(shops, shop, theme)}
            >
              {shops.name}
            </MenuItem>
          ))}
        </Select>



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

export default AddRouteModal;