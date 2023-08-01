import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

/**
 * Component for displaying a bar chart
 * @param {object} props
 * @param {string} props.title title of the chart
 * @param {list} props.data data that the chart will display
 */
export default function App(props) {
    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h6'} align={'center'}>{props.title}</Typography>
                    <ResponsiveContainer width={"100%"} height={256}>
                        <PieChart width={150} height={40}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={props.data}
                                cx={180}
                                cy={125}
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Grid>
    );
}
