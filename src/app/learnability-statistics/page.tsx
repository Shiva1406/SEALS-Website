"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ScatterChart as DotPlot } from "recharts";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const LearnabilityStatistics = () => {
    const [chartType, setChartType] = useState("pie");
    const [metric, setMetric] = useState("duration");

    // Example data (replace with API data)
    const videoStats = [
        { title: "Video A", duration: 300, score: 85 },
        { title: "Video B", duration: 600, score: 90 },
        { title: "Video C", duration: 150, score: 75 },
    ];

    // Transform data for charts
    const chartData = videoStats.map((video) => ({
        name: video.title,
        value: metric === "duration" ? video.duration : video.score,
    }));

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Learnability Statistics</h2>

            {/* Dropdowns for selecting metric and chart type */}
            <FormControl className="mr-4">
                <InputLabel>Metric</InputLabel>
                <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
                    <MenuItem value="duration">Video Duration</MenuItem>
                    <MenuItem value="score">Learnability Score</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>Chart Type</InputLabel>
                <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <MenuItem value="pie">Pie Chart</MenuItem>
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="dot">Dot Plot</MenuItem>
                </Select>
            </FormControl>

            {/* Render selected chart */}
            <div className="mt-6">
                {chartType === "pie" && (
                    <PieChart width={400} height={400}>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
                        <Tooltip />
                    </PieChart>
                )}
                {chartType === "bar" && (
                    <BarChart width={500} height={300} data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                )}
                {chartType === "dot" && (
                    <DotPlot width={500} height={300} data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </DotPlot>
                )}
            </div>
        </div>
    );
};

export default LearnabilityStatistics;
