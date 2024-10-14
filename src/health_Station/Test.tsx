import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  id: number;
  label: string;
  value: number;
}

const PieChartComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // รับ token จาก localStorage

        const response = await axios.get(`http://localhost:9999/api/dashboard/dashboardCircleVillage`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ส่ง token ใน header
          },
        });

        console.log(response.data); // แสดงข้อมูลที่ได้รับจาก API ใน console

        // หาก API ส่งกลับข้อมูลเป็นอ็อบเจกต์ ต้องเข้าถึงข้อมูลในอาร์เรย์
        setData(response.data.villageAll); // สมมุติว่าอยู่ใน response.data.data
        setError(null);
      } catch (error) {
        console.error(error); // แสดงข้อผิดพลาดใน console เพื่อให้สะดวกต่อการ debug
        setError('Failed to fetch data'); // จัดการข้อผิดพลาด
      } finally {
        setLoading(false); // หยุดการโหลดไม่ว่าจะสำเร็จหรือไม่
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>; // แสดงข้อความ Loading ขณะรอข้อมูล
  if (error) return <p>{error}</p>; // แสดงข้อความข้อผิดพลาดหากเกิดข้อผิดพลาด

  // สีที่ใช้ในแต่ละส่วนของกราฟวงกลม
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#A28EF6', '#FF6384', '#36A2EB', '#FFCE56', 
    '#FFA07A', '#7B68EE', '#32CD32'
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          nameKey="label" // ใช้ label แทน name
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string) => [`${name}: ${value}`, 'Value']} 
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
