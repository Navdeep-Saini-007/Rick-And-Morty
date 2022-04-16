import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const SingleCharacter = () => {
  const [character, setCharacter] = useState("");

  const [firstTime, setFirstTime] = useState(true);

  // const [locationKeys, setLocationKeys] = useState([]);

  const history = useHistory();

  const id = localStorage.getItem("id");
  console.log(id);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", `https://rickandmortyapi.com/api/character/${id}`);
    xhr.addEventListener("load", function () {
      console.log(JSON.parse(xhr.responseText));
      setCharacter(JSON.parse(xhr.responseText));
    });
    xhr.send();
    return () => {
      setFirstTime(false);
    };
  }, [firstTime, id]);

  // useEffect(() => {
  //   return history.listen((location) => {
  //     if (history.action === "PUSH") {
  //       setLocationKeys([location.key]);
  //     }

  //     if (history.action === "POP") {
  //       if (locationKeys[1] === location.key) {
  //         setLocationKeys(([_, ...keys]) => keys);

  //         history.push("/character");
  //       } else {
  //         setLocationKeys((keys) => [location.key, ...keys]);

  //         // setBackbutton(true);
  //         history.push("/");
  //       }
  //     }
  //   });
  // }, [locationKeys, history]);

  function handleClick() {
    const nextPageString = localStorage.getItem("nextPage");
    console.log(nextPageString.charAt(nextPageString.length - 1));
    history.push("/");
  }

  return (
    <>
      <div className="page-container-character">
        <h1 className="heading">Character Details</h1>
        <div className="container">
          <div className="left-container">
            <img
              className="charImage"
              src={character.image}
              alt="characterImage"
            />
          </div>
          <div className="right-container">
            <h2>Name: {character.name}</h2>
            <h2>Status: {character.status}</h2>
            {/* <h2>Type: {character.type}</h2> */}
            <h2>Species: {character.species}</h2>
            <h2>Gender: {character.gender}</h2>
            {/* <h2>Origin: {character.origin.name}</h2> */}
          </div>
        </div>
        <button className="buttons" onClick={handleClick}>
          Back To Home
        </button>
      </div>
    </>
  );
};

export default SingleCharacter;
