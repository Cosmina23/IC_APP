import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar } from '@mui/material';
import '../Css/Clasament.css'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#733AB3',
      color: theme.palette.common.white,
      textAlign: 'center',
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const Clasament = ({ selectedMaterie }) => {

    const materie = selectedMaterie;
    const [clasament, setClasament] = useState([]);
    const userIdFromLocalStorage = localStorage.getItem('userId');

    useEffect(() => {
        const fetchClasament = async () => {
        try {
            const response = await axios.get('http://localhost:5269/getClasament', {
            params: { course: materie }
            });
            setClasament(response.data);
        } catch (error) {
            console.error('Error fetching clasament:');
        }
    };

    fetchClasament();
  }, [materie]);

    return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Clasament {materie}</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="denumiri-coloane">
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Nume</StyledTableCell>
              <StyledTableCell align="right">Prenume</StyledTableCell>
              <StyledTableCell align="right">Scor total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clasament.map((row) => (
              <StyledTableRow key={row.userId}
              className={row.userId === parseInt(userIdFromLocalStorage) ? 'highlight-row' : ''}>
                 <StyledTableCell component="th" scope="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar src={`http://localhost:5269/Images/${row.avatarPath}`} alt={`${row.nume} ${row.prenume}`} 
                          sx={{ width: 60, height: 60 }}/>
                </StyledTableCell>
                <StyledTableCell align="right">{row.nume}</StyledTableCell>
                <StyledTableCell align="right">{row.prenume}</StyledTableCell>
                <StyledTableCell align="right">{row.totalScore}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}

export default Clasament;
