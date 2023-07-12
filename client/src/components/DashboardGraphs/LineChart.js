import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import {Line, ResponsiveContainer, XAxis, LineChart } from 'recharts';
import Grid from '@mui/material/Grid';

/**
 * Component for displaying a bar chart
 * @param {object} props
 * @param {() => void} props.exampleprop1 callback description here
 * @param {string} props.title title of the chart
 * @param {list} props.data data that the chart will display
 * @param {list} props.dataKey y-value
 * https://recharts.org/en-US/examples/SimpleLineChart
 */
export default function DashboardLineChart(props) {

    return (
        <Grid item xs={4}>
        <Card variant={'outlined'}>
            <CardContent>
                <Typography variant={'h6'} align={'center'}>{props.title}</Typography>
                <ResponsiveContainer width={"100%"} height={256}>
                    <LineChart title="Chart Name" width={150} height={40} data={props.data}>
                        <XAxis dataKey={'uv'} />
                        <Line type="monotone" dataKey={props.dataKey} stroke="#8884d8"/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        </Grid>
    );
}