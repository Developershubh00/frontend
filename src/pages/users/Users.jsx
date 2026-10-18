import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUsers } from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await getUsers();

      console.log("API Response:", res);

      // Backend Response:
      // {
      //   success: true,
      //   statusCode: 200,
      //   message: "...",
      //   data: {
      //     users: [...],
      //     pagination: {...}
      //   }
      // }

      setUsers(res.data.users || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Users</h1>

        <button onClick={fetchUsers}>Refresh</button>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : users.length === 0 ? (
        <h2>No users found.</h2>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
