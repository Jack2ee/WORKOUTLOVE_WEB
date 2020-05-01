import React from "react";
import styled from "styled-components";

const WorkoutContainer = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-bottom: 0.5px solid black;
`;

const WorkoutName = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const WorkoutInfo = styled.div`
  display: flex;
`;

const WorkoutList = (props) => {
  console.log(props);
  return (
    <>
      {props.workouts.map((i, k) => (
        <WorkoutContainer key={k}>
          <WorkoutName>{i.workout.workoutNameKor}</WorkoutName>
          {i.intensities.map((i, k) => (
            <div key={k}>
              {i.number} {i.unit}
            </div>
          ))}
        </WorkoutContainer>
      ))}
    </>
  );
};

export default WorkoutList;
