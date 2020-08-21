import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/userContext";
import AddItem from './AddItem'

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page center">
      {userData.user ? (
        <>
        <h1>Product</h1>
          <AddItem/>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
