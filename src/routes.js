import HOMEPAGE from "./pages/Home";
import LOGINPAGE from "./pages/Login";
import MYWORKOUTSPAGE from "./pages/Myworkouts";
import MARKETPAGE from "./pages/Market";

import ROUTINEPAGE from "./stacks/Routine";
import ROUTINEDETAILPAGE from "./stacks/RoutineDetail";
import CREATEROUTINEPAGE from "./stacks/CreateRoutine";
import WORKOUTPAGE from "./stacks/Workout";
import WORKOUTSEARCHPAGE from "./stacks/WorkoutSearch";
import WORKOUTDETAILPAGE from "./stacks/WorkoutDetail";
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
    page: ROUTINEDETAILPAGE,
    exact: true,
  },
  {
    path: "/new-routine",
    name: "루틴생성",
    page: CREATEROUTINEPAGE,
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
    path: "/workouts/:workoutId/detail",
    name: "운동상세작성",
    page: WORKOUTDETAILPAGE,
    exact: true,
  },
  {
    path: "/mypage",
    name: "마이페이지",
    page: MYPAGE,
    exact: true,
  },
  {
    path: "/market",
    name: "마켓",
    page: MARKETPAGE,
    exact: true,
  },
];

export default routes;
