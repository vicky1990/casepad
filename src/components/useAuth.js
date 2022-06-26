import React, { useState, useEffect, useContext, createContext } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";

const authContext = React.createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = React.useState(false);

  const login = (username, password) => {
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

    axios
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
          let name = res.data["first_name"];
          let full_name = name.concat(" ", res.data["last_name"]);
          setUser(full_name);

          return new Promise((res) => {
            setAuthed(false);
            res();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return new Promise((err) => {
      err();
    });
  };

  const logout = () => {
    return new Promise((res) => {
      setUser("null");
      setAuthed(false);
      res();
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
