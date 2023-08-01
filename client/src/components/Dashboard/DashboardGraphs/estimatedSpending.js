import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { getSpendingPredictionsAsync } from "../../../redux/thunks/dashboardThunk";

/**
 * Component for displaying estimated spendings
 * @param {object} props
 */
export default function App(props) {
    const dispatch = useDispatch();

    const styles = {
        summary: {
            "fontSize": 20,
            "width": "-webkit-fill-available",
            "margin": "5px 15px 5px 15px",
            'font-family': '"Roboto","Helvetica","Arial","sans-serif"',
            'font-weight': '500',
            'font-size': '1.25rem'
        },
        value: {
            "fontSize": 15,
            "margin": "5px 15px 5px 0px"
        },
    };

    let predictions = useSelector((state) => state.dashboard.predictedSpendings);

    let categoriesPrinted = predictions.categories.map(category => {
        return <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap", width: "-webkit-fill-available" }}>
                <p style={styles.value}>{category.name} : </p>
                <p style={styles.value}>${category.prediction.toFixed(2)}</p>
        </div>
    });

    useEffect(() => {
        dispatch(getSpendingPredictionsAsync());
    }, [dispatch]);


    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card variant={'outlined'} style={{  height: "328px", padding: "0px", margin: "0px" }}>
                <CardContent width={"90%"} style={styles.summary}>
                    <p style={{ padding: "0px", margin: "0px" }}>Estimated spending this month</p>
                    <p style={{ padding: "0px", margin: "5px 0" }}>$ {predictions.total.toFixed(2)}</p>
                    <p style={{ padding: "0px", margin: "0px" }}>Estimated Spending per category</p>
                    {categoriesPrinted}
                </CardContent>
            </Card>
        </Grid>
    );
}
