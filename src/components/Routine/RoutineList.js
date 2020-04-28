import React, { useState, useEffect } from "react";
import deburr from "lodash/deburr";
import styled from "styled-components";

const RoutineListContainer = styled.div`
  width: 100%;
`;

const SearchFilter = styled.div`
  font-size: 1rem;
  font-weight: 800;
`;

const RoutineSearchInput = styled.input`
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

const RoutineContainer = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 0.5px solid black;
`;

const RoutineName = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const RoutineInfo = styled.div`
  display: flex;
`;

const RoutineList = (props) => {
  const [suggestionValue, setSuggestionValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchkey, setSearchKey] = useState("routineName");

  const getSuggestions = (value) => {
    const inputValue = deburr(value.replace(/ /g, "")).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestionList = props.routineList[`${props.selected}`].filter(
      (suggestion) => {
        const keep = suggestion[searchkey]
          .replace(/ /g, "")
          .includes(inputValue);
        if (keep) {
          count += 1;
        }
        return keep;
      }
    );

    return inputLength === 0
      ? props.routineList[`${props.selected}`]
      : suggestionList;
  };

  const updateSuggestionsHandler = (value) => {
    setSuggestions(getSuggestions(value));
  };

  const moveToRoutineDetails = (routineId) => {
    props.moveToRoutineDetails(routineId);
  };

  useEffect(() => {
    setSuggestions(props.routineList[`${props.selected}`]);
  }, [props.routineList[`${props.selected}`]]);

  console.log(props.routineList[`${props.selected}`]);

  return (
    <RoutineListContainer>
      <SearchFilter>
        {searchkey === "routineName" ? "루틴이름" : "만든사람"}
      </SearchFilter>
      <RoutineSearchInput
        onChange={(e) => updateSuggestionsHandler(e.target.value)}
      />
      {suggestions.map((i, k) => (
        <RoutineContainer key={k} onClick={() => moveToRoutineDetails(i._id)}>
          <RoutineName>{i.routineName}</RoutineName>
          <RoutineInfo>
            <div>
              좋아요 <strong>{i.sharedBy.length} </strong>
              공유 <strong>{i.sharedBy.length} </strong>
              만든사람 <strong>허재혁 </strong>
            </div>
          </RoutineInfo>
        </RoutineContainer>
      ))}
    </RoutineListContainer>
  );
};

export default RoutineList;
