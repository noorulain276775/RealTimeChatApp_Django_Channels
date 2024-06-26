import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ContactList(props) {
    const userProfileUrl = `/contact/${props.id}`
  return (
    <Link to={userProfileUrl}>
      <ListItem>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={props.email}
        ></ListItemText>
      </ListItem>
    </Link>
  );
}
