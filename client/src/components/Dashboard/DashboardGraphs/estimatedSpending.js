import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import {useSelector, useDispatch } from "react-redux";
import { getSpendingPredictionsAsync } from "../../../redux/thunks/dashboardThunk";
import DashboardService from "../../../redux/services/dashboardService.js"


/**
 * Component for displaying estimated spendings
 * @param {object} props
 */

let real = await DashboardService.getSpendingPredictions;



export default function App(props) {
    const dispatch = useDispatch();

    let predictions = useSelector((state) => state.dashboard.predictedSpendings);

    let categoriesPrinted = predictions.categories.map(category => {
        return <p>{category.name} : ${category.prediction}</p>
    });
    

    

    useEffect(() => {
        dispatch(getSpendingPredictionsAsync());
      }, [dispatch]);

    

    return (
        <Grid item xs={4}  >
            <Card variant={'outlined'}>
                <CardContent width={"100%"}>
                    <h5>Estimated spending this month</h5>
                        <p>$ {predictions.total}</p>
                    <h5>Estimated Spending per category</h5>
                    {categoriesPrinted}
-
                </CardContent>
            </Card>
        </Grid>
    );
}
