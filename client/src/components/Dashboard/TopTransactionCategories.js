import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopCategoriesAsync } from '../../redux/thunks/transactionThunk';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Container, Typography, MenuItem, Select } from '@mui/material/';

const TopTransactionCategories = () => {

    const topCategories = useSelector((state) => state.transactions.topCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopCategoriesAsync())
    }, []);

    console.log(topCategories);
    return (
        <Container>
            <br />
            <Typography variant="h5" align="center">Top Spending Categories</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Total Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topCategories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell align="center">{category._id}</TableCell>
                                <TableCell align="center">{category.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
}

export default TopTransactionCategories;