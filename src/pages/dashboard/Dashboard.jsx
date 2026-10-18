import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome {user?.name}</h2>
    </>
  );
}

export default Dashboard;
