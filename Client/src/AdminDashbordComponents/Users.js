import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import "./Users.css";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
function Users() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subOffers, setSubOffers] = useState([]);
  const search = useSelector((state) => state.search.text);
  // show me the length of search
  console.log(search.length);
  const handleDeleteUser = (u) => {
    const newUsers = users.filter((user) => user.Phone !== u.Phone);
    console.log(u);
    setUsers(newUsers);
    const data = new FormData();
    data.append("action", "deleteUser");
    data.append("id", u.id);

    axios
      .post("http://localhost/Server/api.php", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
          alert("User deleted successfully");
        } else {
          alert("An error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again later.");
      });
  };
  useEffect(() => {
    // Function to fetch data when component mounts
    async function fetchData() {
      const data = new FormData();
      data.append("action", "getAllUsers");
      try {
        const response = await axios.post(
          "http://localhost/Server/api.php",
          data
        );
        console.log(response);
        if (response.status === 200) {
          console.log("New ride registered successfully");
          const responseData = response.data;
          if (responseData === "[]null") {
            setUsers([]);
          } else {
            console.log(responseData);
            setUsers(responseData);
          }
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    }

    fetchData();
  }, [refreshKey]);

  useEffect(() => {
    setSubOffers(users.slice((currentPage - 1) * 9, currentPage * 9));
  }, [currentPage, users]);
  useEffect(() => {
    if(search.length === 0) {
      console.log("in");
      console.log();
      setSubOffers(users);
      setCurrentPage(1);
    }
    if (search) {
      const filteredUsers = users.filter((user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase())
      );
      setSubOffers(filteredUsers);
      setCurrentPage(1);
    }
  }, [search]);
  return (
    <div className="users flex-col">
      <table className="tab-admin ">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastame</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(subOffers) &&
            subOffers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td onClick={() => handleDeleteUser(user)}>
                  <RiDeleteBin5Line />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        defaultCurrent={1}
        total={50}
        onChange={(page) => setCurrentPage(page)}
        className="pag-admin"
      />
    </div>
  );
}

export default Users;
