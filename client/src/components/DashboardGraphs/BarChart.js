import * as React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Grid from '@mui/material/Grid';

/**
 * Component for displaying a bar chart
 * @param {object} props
 * @param {() => void} props.exampleprop1 callback description here
 * @param {string} props.title title of the chart
 * @param {list} props.data data that the chart will display

 */
export default function DashboardBarChart(props) {

    return (
        <Grid item xs={6}>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h6'} align={'center'}>{props.title}</Typography>
                    <ResponsiveContainer width={"100%"} height={256}>
                        <BarChart title="Chart Name" width={150} height={40} data={props.data}>
                            <XAxis dataKey={'index'} />
                            <YAxis type={'number'} />
                            <Bar dataKey="uv" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Grid>
    );
}