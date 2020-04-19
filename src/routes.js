import LOGINPAGE from "./pages/Login";
import ROUTINEPAGE from "./pages/Routine";
import ROUTINESEARCHPAGE from "./pages/RoutineSearch";
import WORKOUTPAGE from "./pages/Workout";
import WORKOUTSEARCHPAGE from "./pages/WorkoutSearch";
import MYPAGE from "./pages/My";

const routes = [
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
    path: "/routines/search",
    name: "루틴검색",
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
