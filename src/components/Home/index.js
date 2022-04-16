import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";

function Home() {
  const [array, setArray] = useState([]);

  const [firstTime, setFirstTime] = useState(true);

  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");

  const [previousPage, setPreviousPage] = useState(null);

  const [nextPage, setNextPage] = useState(null);

  const [singleCharacter, setSingleCharacter] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [firstTwentyCharacters, setFirstTwentyCharacters] = useState([]);

  const [currPage, setCurrPage] = useState("");

  const [nextOrPrevious, setNextOrPrevious] = useState(false);

  const [startingPage, setStartingPage] = useState(false);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    let urlEnding;
    if (localStorage.getItem("nextPage")) {
      urlEnding = localStorage.getItem("nextPage");
      urlEnding = urlEnding.charAt(urlEnding.length - 1);
      console.log(urlEnding);
    }
    if (startingPage) {
      xhr.open("get", url);
    } else if (urlEnding && !nextOrPrevious) {
      const end = urlEnding - 1;
      xhr.open("get", `https://rickandmortyapi.com/api/character?page=${end}`);
    } else {
      xhr.open("get", url);
    }
    xhr.addEventListener("load", function () {
      const data = JSON.parse(xhr.responseText);
      const response = data.results;
      setArray([...response]);
      setFirstTwentyCharacters([...response]);
      setPreviousPage(data.info.prev);
      setNextPage(data.info.next);
      const LastCharacterId = response[19].id;
      console.log(LastCharacterId);
      const current = LastCharacterId / 20;
      const last = data.info.pages;
      setCurrPage(`${current}/${last}`);
      console.log(data);
      console.log(data.results);
      console.log(previousPage);
      console.log(nextPage);
    });
    xhr.send();
    console.log("running");
    return () => {
      setFirstTime(false);
    };
  }, [firstTime, previousPage, nextPage, url, nextOrPrevious, startingPage]);

  useEffect(() => {
    console.log(inputValue);
    let temp = [];
    firstTwentyCharacters.forEach(function (object) {
      if (object.name.includes(inputValue)) {
        temp.push(object);
      }
    });
    setArray([...temp]);
    if (inputValue === "") {
      console.log("here");
      console.log(firstTwentyCharacters);
      setArray([...firstTwentyCharacters]);
    }
    return () => {};
  }, [inputValue, firstTwentyCharacters]);

  function previousFunction() {
    if (previousPage) {
      setUrl(previousPage);
      setNextOrPrevious(true);
    }
  }

  function nextFunction() {
    if (nextPage) {
      setUrl(nextPage);
      setNextOrPrevious(true);
    }
  }

  function specificCharacter(event) {
    localStorage.setItem("id", event.target.id);
    localStorage.setItem("nextPage", nextPage);
    setSingleCharacter(true);
    console.log(singleCharacter);
    setFirstTime(true);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function resetToFirstPage() {
    setStartingPage(true);
    setUrl("https://rickandmortyapi.com/api/character");
  }

  return (
    <>
      <div className="page-container">
        <div className="header">
          <button onClick={resetToFirstPage} className="home-button">
            Rick And Morty
          </button>
          <input
            className="search"
            onChange={handleChange}
            value={inputValue}
            type="text"
            placeholder="Search Character"
          />
        </div>
        <div className="body">
          {array.length ? (
            array.map(function (object, index) {
              return (
                <div
                  id={object.id}
                  key={index}
                  onClick={specificCharacter}
                  className="image-container"
                >
                  <img
                    onClick={specificCharacter}
                    id={object.id}
                    className="image"
                    src={object.image}
                    alt="img"
                  />
                  <h3
                    onClick={specificCharacter}
                    id={object.id}
                    className="name"
                  >
                    {object.name}
                  </h3>
                </div>
              );
            })
          ) : (
            <h1>No Match Found!!!</h1>
          )}
        </div>
        <footer className="footer">
          <div className="button-container">
            <button onClick={previousFunction} className="buttons">
              Previous
            </button>
            <h2>{currPage}</h2>
            <button onClick={nextFunction} className="buttons">
              Next
            </button>
          </div>
        </footer>
      </div>
      {singleCharacter ? <Redirect to="/character" /> : null}
    </>
  );
}

export default Home;
