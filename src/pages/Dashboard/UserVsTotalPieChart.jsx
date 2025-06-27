// src/pages/Dashboard/UserVsTotalPieChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/api";

const COLORS = ["#00C49F", "#FF8042"];

const UserVsTotalPieChart = () => {
  const { user } = useContext(AuthContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [totalRes, userRes] = await Promise.all([
        api.get("/recipes"),
        api.get(`/my-recipes?email=${user?.email}`)
      ]);

      const total = totalRes.data.length;
      const mine = userRes.data.length;
      const others = total - mine;

      setChartData([
        { name: "My Recipes", value: mine },
        { name: "Others", value: others }
      ]);
    };

    if (user?.email) fetchData();
  }, [user]);

  return (
    <div className="w-full md:w-1/2 mx-auto items-center">
      <h2 className="text-lg font-bold mb-2 text-center text-blue-950">My Recipes vs Others</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserVsTotalPieChart;
