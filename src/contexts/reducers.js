import { updatedObject } from "./utility";

export const authReducer = (state, action) => {
  const login = (state, action) => {
    return updatedObject(state, {
      authToken: action.authToken,
      userId: action.userId,
      name: action.name,
      oauth: action.oauth,
      oauthProvider: action.oauthProvider,
    });
  };

  switch (action.type) {
    case "LOGIN":
      return login(state, action);
    default:
  }
};

export const routineReducer = (state, action) => {
  const saveAllRoutines = (state, action) => {
    return updatedObject(state, {
      allRoutines: action.allRoutines,
      totalRoutineCount: action.totalRoutineCount,
      allRoutinesLoaded: true,
    });
  };

  const saveMyRoutines = (state, action) => {
    return updatedObject(state, {
      myRoutines: action.myRoutines,
      myRoutineCount: action.myRoutineCount,
      myRoutinesLoaded: action.myRoutinesLoaded,
    });
  };

  const updateMyRoutines = (state, action) => {
    return updatedObject(state, {
      myRoutinesLoaded: action.myRoutinesLoaded,
    });
  };

  switch (action.type) {
    case "SAVE_ALL_ROUTINES":
      return saveAllRoutines(state, action);
    case "SAVE_MY_ROUTINES":
      return saveMyRoutines(state, action);
    case "UPDATE_MY_ROUTINES":
      return updateMyRoutines(state, action);
    default:
  }
};

export const workoutReducer = (state, action) => {
  const saveAllWorkouts = (state, action) => {
    return updatedObject(state, {
      allWorkouts: action.allWorkouts,
      totalWorkoutCount: action.totalWorkoutCount,
      allWorkoutsLoaded: action.allWorkoutsLoaded,
    });
  };

  const saveMyWorkouts = (state, action) => {
    return updatedObject(state, {
      myWorkouts: action.myWorkouts,
      myWorkoutCount: action.myWorkoutCount,
      myWorkoutsLoaded: action.myWorkoutsLoaded,
    });
  };

  const updateMyWorkouts = (state, action) => {
    return updatedObject(state, {
      myWorkoutsLoaded: action.myWorkoutsLoaded,
    });
  };

  switch (action.type) {
    case "SAVE_ALL_WORKOUTS":
      return saveAllWorkouts(state, action);
    case "SAVE_MY_WORKOUTS":
      return saveMyWorkouts(state, action);
    case "UPDATE_MY_WORKOUTS":
      return updateMyWorkouts(state, action);
    default:
  }
};

export const mypageReducer = (state, action) => {
  const saveMypageInfo = (state, action) => {
    return updatedObject(state, {
      profileImageUrl: action.profileImageUrl,
      oauth: action.oauth,
      oauthProvider: action.oauthProvider,
      sex: action.sex,
      age: action.age,
      height: action.height,
      weight: action.weight,
      posts: action.posts,
      routines: action.routines,
      dailyWorkouts: action.dailyWorkouts,
      workouts: action.workouts,
      rooms: action.rooms,
      images: action.images,
      name: action.name,
    });
  };

  switch (action.type) {
    case "SAVE_MYPAGE_INFO":
      return saveMypageInfo(state, action);
    default:
  }
};

export const UIReducer = (state, action) => {
  const showBackdrop = (state, action) => {
    return updatedObject(state, {
      backdrop: action.backdrop,
    });
  };

  switch (action.type) {
    case "SHOW_BACKDROP":
      return showBackdrop(state, action);
    default:
  }
};
