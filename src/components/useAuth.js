import React, { useState, useEffect, useContext, createContext } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";

const authContext = React.createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = React.useState(false);

  const login = async (username, password) => {
    const hashedPassword = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    ); // hash created previously created upon sign up

    console.log(
      JSON.stringify({
        username: username,
        hashedpassword: hashedPassword
      })
    );

    return await axios
      .post(
        "/login",
        JSON.stringify({
          username: username,
          hashedpassword: hashedPassword
        }),
        {
          method: "POST",
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data["result"]);

        if (res.data.result === "success") {
          setAuthed(true);
          let name = res.data["first_name"];
          let full_name = name.concat(" ", res.data["last_name"]);
          setUser(full_name);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        //setAuthed(true);
        return err;
      });
  };

  const logout = () => {
    return axios
      .get("/logout", {
        method: "GET"
      })
      .then((res) => {
        setUser("null");
        setAuthed(false);
        console.log("logging out");
      })
      .catch((err) => {
        console.log(err);
        console.log("logout error");
      });
  };

  useEffect(() => {}, []);

  return {
    authed,
    user,
    login,
    logout
  };
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}
