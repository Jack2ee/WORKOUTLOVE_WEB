import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import routes from "./routes";

import AuthStore from "./contexts/AuthStore";
import MypageStore from "./contexts/MypageStore";
import RoutineStore from "./contexts/RoutineStore";
import WorkoutStore from "./contexts/WorkoutStore";

import LoginMiddleware from "./Middlewares/LoginMiddleware";

const AppContainer = styled.div`
  height: 100vh;
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
      <AuthStore>
        <LoginMiddleware>
          <MypageStore>
            <RoutineStore>
              <WorkoutStore>{switchRoutes}</WorkoutStore>
            </RoutineStore>
          </MypageStore>
        </LoginMiddleware>
      </AuthStore>
    </AppContainer>
  );
}

export default App;
