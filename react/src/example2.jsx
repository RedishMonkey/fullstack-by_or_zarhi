import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "ofra",
      age: 23,
    },
  ]);

  const [userIndex, setUserIndex] = useState(null);

  const [showUsers, setShowUsers] = useState(false);
  const showUsersBtn = showUsers ? "hide" : "show";

  const [noNameErr, setNoNameErr] = useState(false);
  const [noAgeErr, setNoAgeErr] = useState(false);


  function changeMode(userIndex)
  {
    setUserIndex(userIndex)
    alert
    setInEditMode(true)
  }

  function handleUser() {
    
    // checks if name and age were entered
    const name = document.getElementById("name");
    const age = document.getElementById("age");

    if (!name.value.trim()) {
      console.log(noAgeErr)
      setNoAgeErr(true);
      return;
    }
    if (!age.value.trim()) {
      setNoAgeErr(true);
      return;
    }


    // if(userIndex)
    // {
    //   user = users.filter(currUser => currUser.id=userIndex)
    //   alert(user)
    //   // users[userIndex].name = name.value
    //   // users[userIndex].age = age.value
    //   // setUsers(...users)
    //   setUserIndex(null)
    // }
    // else
    // {
      setUsers([
        ...users,
        {
          id: users.at(-1).id + 1,
          name: name.value,
          age: age.value,
        },
      ]);
    // }

    name.value = "";
    age.value = "";
    setNoNameErr(false)
    setNoAgeErr(false)
  }

  function editMode(user)
  {
    setUserIndex(user.id)
    const name = document.getElementById("name");
    const age = document.getElementById("age");

    name.value = user.name
    age.value = user.age
  }

  function handleRemoveUser(userId) {
    const newUsers = users.filter((user) => user.id !== userId);
    setUsers([...newUsers]);
  }

  return (
    <>
      <h1>App</h1>
      name: <input type="text" placeholder="nameeee" id="name"></input>
      <br />
      {noNameErr && <div>enter a name</div>}
      <br/>
      age: <input type="number" placeholder="ageeeee" id="age"></input>
      <br />
      {noAgeErr && <div>enter an age</div>}
      <br/>
      <div>
        <button onClick={() => handleUser()}>{userIndex? "edit" : "add user"}</button>
      </div>
      
      <button onClick={() => setShowUsers(!showUsers)}>{showUsersBtn}</button>
      {showUsers &&
        users.map((user) => (
          <div key={user.id}>
            <b>name:</b> {user.name} <br />
            <b>age:</b> {user.age} <br />
            <button onClick={() => editMode(user)}>
              edit user
            </button>
            <button onClick={() => handleRemoveUser(user.id)}>
              delete user
            </button>
            <br /> <br />
          </div>
        ))}
    </>
  );
}
