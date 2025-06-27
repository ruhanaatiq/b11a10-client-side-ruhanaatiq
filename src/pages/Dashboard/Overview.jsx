import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/api";
import UserVsTotalPieChart from "./UserVsTotalPieChart"; // ✅ Don't forget to import

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [myRecipes, setMyRecipes] = useState(0);

  useEffect(() => {
    api.get('/recipes').then(res => setTotal(res.data.length));
    api.get(`/my-recipes?email=${user?.email}`).then(res => setMyRecipes(res.data.length));
  }, [user]);

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-400 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Recipes</h3>
          <p className="text-2xl">{total}</p>
        </div>
        <div className="p-6 bg-green-400 rounded-xl shadow">
          <h3 className="text-lg font-semibold">My Recipes</h3>
          <p className="text-2xl">{myRecipes}</p>
        </div>
        <div className="p-6 bg-yellow-400 rounded-xl shadow">
          <h3 className="text-lg font-semibold">User</h3>
          <p className="text-lg">{user?.email}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <UserVsTotalPieChart />
      </div>
    </div>
  );
};

export default Overview;
