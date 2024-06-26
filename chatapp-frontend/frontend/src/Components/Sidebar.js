import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuthentication from "./utils/withAuthentication";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, List } from "@mui/material";
import ContactList from "./ContactList";

function Sidebar() {
  const baseUrl = "http://127.0.0.1:8000/";
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(true);

  const getAuthTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUserList = async () => {
      const authToken = getAuthTokenFromCookie();
      if (authToken) {
        try {
          const response = await axios.get(`${baseUrl}api/contact/`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUserList(response.data);
          setLoader(false);
        } catch (error) {
          console.error("Error while making API request: ", error);
        }
      }
    };

    fetchUserList();
  }, []);

  return (
    <div className="sidebar">
      {loader ? (
        <Box sx={{ width: "100%" }}>
          <CircularProgress />
        </Box>
      ) : userList.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {userList.map((user, index) => (
            <ContactList
              key={index}
              email={user.email}
              name={`${user.first_name} ${user.last_name}`}
              id={user.id}
            />
          ))}
        </List>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default withAuthentication(Sidebar);
