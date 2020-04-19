import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import deburr from "lodash/deburr";
import styled from "styled-components";

import { breakpoints } from "../UI/sharedStyles";

const RecommendContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ItemContainer = styled.div`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
`;

const StyleWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  @media (max-width: ${breakpoints}) {
    width: 100%;
  }
  & .react-autosuggest__input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border-width: 0;
    font-size: 1rem;
    @media (max-width: ${breakpoints}) {
      width: 100%;
    }
  }
  & .react-autosuggest__suggestions-container--open {
    width: calc(100%);
    height: 50vh;
    overflow: scroll;
    margin: 0;
    position: absolute;
    top: 50px;
    background-color: white;
    border: 1px solid white;
  }
  & .react-autosuggest__suggestions-list {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  & .react-autosuggest__suggestion {
    list-style-type: none;
    font-size: 0.94rem;
    margin-bottom: -1px;
    color: var(--twoyak-black);
    cursor: pointer;
    padding: 0.75rem 0;
    font-weight: bold;
    border-bottom: 1px #e6f6ff solid;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .react-autosuggest__suggestion--highlighted {
    background-color: aliceblue;
  }
`;

const AutosuggestComponent = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = deburr(value.trim().toLowerCase());
    const inputLength = inputValue.length;
    let count = 0;
    const suggestionList = props.listOfThingsToAutosuggest.filter(
      (suggestion) => {
        const keep =
          count < 20 &&
          suggestion[props.searchKey].replace(/\s/g, "").includes(inputValue);
        if (keep) {
          count += 1;
        }

        return keep;
      }
    );
    return inputLength === 0 ? [] : suggestionList;
  };

  const getSuggestionValue = (suggestion) => suggestion[props.searchKey];

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion[props.searchKey], query);
    const parts = parse(suggestion[props.searchKey], matches);
    return (
      <RecommendContainer>
        <ItemContainer>
          <div>
            {parts.map((part, index) =>
              part.highlight ? (
                <b key={index} style={{ color: "#00a2ff" }}>
                  {part.text}
                </b>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </div>
          <div>{suggestion.targetMuscleKor}</div>
        </ItemContainer>
      </RecommendContainer>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: props.inputPlaceholder,
    value,
    onChange: onChange,
  };

  return (
    <StyleWrapper>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </StyleWrapper>
  );
};

export default AutosuggestComponent;
