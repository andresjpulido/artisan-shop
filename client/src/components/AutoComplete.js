import React from "react";
import "./AutoComplete.css";

const SearchBar = ({ results, keyword, updateField }) => {
  //renders our results using the SearchPreview component
  var updateText = (text, id) => {
    updateField("keyword", text, "id_customer", id, false);
    updateField("results", []);
  };

  var cancelSearch = () => {
    updateField("keyword", "", "id_customer", "");
  };

  var renderResults = results.map(({ email, firstName, lastName, age, id }, index) => {
    return (
      <SearchPreview
        key={index}
        updateText={updateText}
        index={index}
        email={email}
        firstName={firstName}
        lastName={lastName}
        age={age}
        id={id}
      />
    );
  });

  return (
    <div className="auto">
      <button
        onClick={() => cancelSearch()}
        className={`cancel-btn ${keyword.length > 0 ? "active" : "inactive"}`}
      >
        x
      </button>
      <input
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={e => updateField("keyword", e.target.value)}
      />

      {results.length > 0 ? (
        <div className="search-results">{renderResults}</div>
      ) : null}
    </div>
  );
};

//stateless component to render preview results
const SearchPreview = ({ age, firstName, lastName, email, index, updateText , id}) => {
  return (
    <div
      onClick={() => updateText(firstName +" "+lastName, id)}
      className={`search-preview ${index == 0 ? "start" : ""}`}
    >
      <div className="first">
        <p className="name">{firstName} {lastName}</p>
        <p className="sub-header">{email}</p>
      </div>
      {/* <div className="second">
        <p className="age">{age}</p>
        <p className="sub-header">age</p>
      </div> */}
    </div>
  );
};

export default SearchBar;