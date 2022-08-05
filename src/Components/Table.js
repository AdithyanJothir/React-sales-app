import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Deletebutton from './Deletebutton';
import Editbutton from './Editbutton';
import Searchbar from './Searchbar';
import Addbutton from './Addbutton';



export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = props.columnsdata;
  const rows = props.rowsdata;
  const [search,setSearch] = React.useState("");
  


  const searchTable = async(term) => {
    setSearch(term);

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <div className='flex space-x-5 justify-end items-center mb-10'>
    
    <Searchbar sx={{p:10}} rows={rows}  setSearch={searchTable} search={props.search} attr={props.attr}/>
    <Addbutton addClick={props.addClick} sx={{pt:10}}/>
    </div>
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      
      <TableContainer sx={{ maxHeight: 540 }} >
        <Table stickyHeader aria-label="sticky table" className="space-x-[10rem]">
          <TableHead >

            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  className='ml-10'
                  align={column.align}
                  style={{ minWidth: column.minWidth  }}
                  sx = {{fontSize : '1rem', backgroundColor: '#93b334'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                if(search == ""){
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      return (
                        
                        <TableCell align={column.align}>
                        
                          {column.format && typeof value === 'number' || column.id !="controls" ? value : <><Editbutton row = {row} editClick={props.editClick}/> <Deletebutton id={row["id"]} url={props.url} handleUpdate = {props.handleUpdate}/> </>}

                        </TableCell>
                      );
                      
                      
                    })}
                  
                  </TableRow>
                );
              }
              else if(row[props.searchcolumn].includes(search)){
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      return (
                        
                        <TableCell align={column.align}>
                        
                          {column.format && typeof value === 'number' || column.id !="controls" ? value : <><Editbutton row = {row} editClick={props.editClick}/> <Deletebutton id={row["id"]} url={props.url} handleUpdate = {props.handleUpdate}/> </>}

                        </TableCell>
                      );
                      
                      
                    })}
                  
                  </TableRow>
                );

              }
            }
            
              )
              }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
