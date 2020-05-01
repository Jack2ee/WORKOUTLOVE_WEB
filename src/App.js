import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import routes from "./routes";

import AuthStore from "./contexts/AuthStore";
import MypageStore from "./contexts/MypageStore";
import RoutineStore from "./contexts/RoutineStore";
import NewRoutineStore from "./contexts/NewRoutineStore";
import WorkoutStore from "./contexts/WorkoutStore";
import DailyWorkoutStore from "./contexts/DailyWorkoutStore";
import UIStore from "./contexts/UIStore";

import AutoLoginMiddleware from "./Middlewares/AutoLoginMiddleware";

const AppContainer = styled.div`
  height: 100vh;
  padding: 10vh 0 8vh 0;
`;

function App() {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.path}
            component={prop.page}
            exact={prop.exact}
            key={key}
          />
        );
      })}
    </Switch>
  );

  return (
    <AppContainer>
      <UIStore>
        <AuthStore>
          <AutoLoginMiddleware>
            <MypageStore>
              <RoutineStore>
                <NewRoutineStore>
                  <WorkoutStore>
                    <DailyWorkoutStore>{switchRoutes}</DailyWorkoutStore>
                  </WorkoutStore>
                </NewRoutineStore>
              </RoutineStore>
            </MypageStore>
          </AutoLoginMiddleware>
        </AuthStore>
      </UIStore>
    </AppContainer>
  );
}

export default App;
