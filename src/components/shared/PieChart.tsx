"use client";
import React, { useRef, useEffect } from 'react';

type PieSlice = {
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  data: PieSlice[];
};

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      drawChart();
    };

    const drawChart = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const total = data.reduce((sum, item) => sum + item.value, 0);
      let startAngle = 0;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2.5;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      data.forEach((slice) => {
        const sliceAngle = (slice.value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = slice.color;
        ctx.fill();

        // Outline
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        const midAngle = startAngle + sliceAngle / 2;
        const textX = cx + Math.cos(midAngle) * (radius * 0.7);
        const textY = cy + Math.sin(midAngle) * (radius * 0.7);
        const percentage = ((slice.value / total) * 100).toFixed(0) + "%";

        ctx.fillStyle = "#000";
        ctx.fillText(percentage, textX, textY);

        // Outer label
        const outerX = cx + Math.cos(midAngle) * (radius * 1.3);
        const outerY = cy + Math.sin(midAngle) * (radius * 1.3);
        ctx.fillText(slice.label, outerX, outerY);

        startAngle = endAngle;
      });
    };

    resizeCanvas(); // Initial draw

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [data]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default PieChart;
