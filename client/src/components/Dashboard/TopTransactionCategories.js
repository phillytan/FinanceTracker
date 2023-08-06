import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTopCategoriesAsync } from '../../redux/thunks/transactionThunk';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Container, Typography, MenuItem, Select
} from '@mui/material/';

const TopTransactionCategories = () => {

    const topCategories = useSelector((state) => state.transactions.topCategories);
    const dispatch = useDispatch();

    const [timeRange, setTimeRange] = useState("week");

    useEffect(() => {
        let startDate, endDate;
        switch (timeRange) {
            case "week":
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                endDate = new Date();
                break;
            case "month":
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 1);
                endDate = new Date();
                break;
            case "3months":
                startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 3);
                endDate = new Date();
                break;
            case "year":
                startDate = new Date();
                startDate.setFullYear(startDate.getFullYear() - 1);
                endDate = new Date();
                break;
            case "all":
                startDate = new Date(0);
                endDate = new Date();
                break;
            default:
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7); // default to 7 days
                endDate = new Date();
                break;
        }
        dispatch(getTopCategoriesAsync({ startDate, endDate }));
    }, [timeRange])

    // useEffect(() => {
    //     dispatch(getTopCategoriesAsync())
    // }, []);

    console.log(topCategories);
    return (
        <Container>
            <br />
            <Typography variant="h5" align="center">Top Spending Categories</Typography>
            <Select value={timeRange} onChange={(event) => setTimeRange(event.target.value)}>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="3months">Past 3 Months</MenuItem>
                <MenuItem value="year">Past Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
            </Select>
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