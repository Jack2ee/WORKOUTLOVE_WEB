import HOMEPAGE from "./pages/Home";
import LOGINPAGE from "./pages/Login";
import MYWORKOUTSPAGE from "./pages/Myworkouts";

import ROUTINEPAGE from "./stacks/Routine";
import ROUTINESEARCHPAGE from "./stacks/RoutineSearch";
import WORKOUTPAGE from "./stacks/Workout";
import WORKOUTSEARCHPAGE from "./stacks/WorkoutSearch";
import MYPAGE from "./stacks/My";

const routes = [
  // routes to home
  {
    path: "/",
    name: "홈",
    page: HOMEPAGE,
    exact: true,
  },
  // routes related to authentication
  {
    path: "/login",
    name: "로그인",
    page: LOGINPAGE,
    exact: true,
  },
  // routes related to routine
  {
    path: "/routines",
    name: "루틴",
    page: ROUTINEPAGE,
    exact: true,
  },
  {
    path: "/routines/:routineId",
    name: "루틴상세",
    page: ROUTINESEARCHPAGE,
    exact: true,
  },
  // routes related to workout
  {
    path: "/workouts",
    name: "운동",
    page: WORKOUTPAGE,
    exact: true,
  },
  {
    path: "/workouts/my",
    name: "내 운동",
    page: MYWORKOUTSPAGE,
    exact: true,
  },
  {
    path: "/workouts/search",
    name: "운동검색",
    page: WORKOUTSEARCHPAGE,
    exact: true,
  },
  {
    path: "/mypage",
    name: "마이페이지",
    page: MYPAGE,
    exact: true,
  },
  {},
];

export default routes;
