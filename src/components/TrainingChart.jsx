import React from "react";
import {BarChart, Bar, CartesianGrid, XAxis, YAxis,} from "recharts";
import { useEffect, useState } from "react";
import { fetchTrainings } from "../trainingapi";
import _, { groupBy } from "lodash";

function TrainingChart() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const generateChartData = () => {
        const groupByActivity = _.groupBy(trainings, 'activity');
        const activityDuration = _.mapValues(groupByActivity, group => _.sumBy(group, 'duration'));

        return Object.keys(activityDuration).map(activity => ({
            name: activity,
            duration: activityDuration[activity]
        }))
    }

    const data = generateChartData();
 
    return (
        <BarChart width={1300} height={600} data={data}>
            <Bar dataKey="duration" fill="darkblue" />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis label={{value: 'Duration (min)', angle: -90, position: 'insideLeft'}} />
        </BarChart>
    );

}

export default TrainingChart;