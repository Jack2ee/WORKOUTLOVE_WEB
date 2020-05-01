import { updatedObject } from "./utility";

export const authReducer = (state, action) => {
  const login = (state, action) => {
    return updatedObject(state, {
      authToken: action.authToken,
      userId: action.userId,
      name: action.name,
      oauth: action.oauth,
      oauthProvider: action.oauthProvider,
      profileImageUrl: action.profileImageUrl,
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
      allRoutinesUpdated: true,
    });
  };

  const saveMyRoutines = (state, action) => {
    return updatedObject(state, {
      myRoutines: action.myRoutines,
      myRoutineCount: action.myRoutineCount,
      myRoutinesUpdated: true,
    });
  };

  const modifyAllRoutines = (state, action) => {
    return updatedObject(state, {
      allRoutinesUpdated: false,
    });
  };

  const modifyMyRoutines = (state, action) => {
    return updatedObject(state, {
      myRoutinesUpdated: false,
    });
  };

  const toggleRoutinesMode = (state, action) => {
    return updatedObject(state, {
      selectedRoutineCategory: action.selectedRoutineCategory,
    });
  };

  switch (action.type) {
    case "SAVE_ALL_ROUTINES":
      return saveAllRoutines(state, action);
    case "SAVE_MY_ROUTINES":
      return saveMyRoutines(state, action);
    case "MODIFY_ALL_ROUTINES":
      return modifyAllRoutines(state, action);
    case "MODIFY_MY_ROUTINES":
      return modifyMyRoutines(state, action);
    case "TOGGLE_ROUTINES_MODE":
      return toggleRoutinesMode(state, action);
    default:
  }
};

export const newRoutineReducer = (state, action) => {
  const changeRoutineName = (state, action) => {
    return updatedObject(state, {
      routineName: action.routineName,
    });
  };

  const changeRoutineDescription = (state, action) => {
    return updatedObject(state, {
      description: action.description,
    });
  };

  const pushWorkoutInfo = (state, action) => {
    return updatedObject(state, {
      workouts: [...state.workouts, action.pushedWorkout],
    });
  };

  const clearTempWorkout = (state, action) => {
    return updatedObject(state, {
      tempWorkout: null,
    });
  };

  const saveTempWorkout = (state, action) => {
    return updatedObject(state, {
      tempWorkout: action.tempWorkout,
    });
  };

  switch (action.type) {
    case "CHANGE_ROUTINE_NAME":
      return changeRoutineName(state, action);
    case "CHANGE_ROUTINE_DESCRIPTION":
      return changeRoutineDescription(state, action);
    case "PUSH_WORKOUT_INFO":
      return pushWorkoutInfo(state, action);
    case "CLEAR_TEMP_WORKOUT":
      return clearTempWorkout(state, action);
    case "SAVE_TEMP_WORKOUT":
      return saveTempWorkout(state, action);
    default:
  }
};

export const dailyWorkoutReducer = (state, action) => {
  const saveDailyWorkout = (state, action) => {
    return updatedObject(state, {
      dailyWorkouts: action.dailyWorkouts,
      dailyWorkoutsCount: action.dailyWorkoutsCount,
      dailyWorkoutsUpdated: true,
    });
  };

  const modifyDailyWorkout = (state, action) => {
    return updatedObject(state, {
      dailyWorkoutsUpdated: false,
    });
  };

  switch (action.type) {
    case "SAVE_DAILY_WORKOUTS":
      return saveDailyWorkout(state, action);
    case "MODIFY_DAILY_WORKOUTS":
      return modifyDailyWorkout(state, action);
    default:
  }
};

export const workoutReducer = (state, action) => {
  const saveAllWorkouts = (state, action) => {
    return updatedObject(state, {
      allWorkouts: action.allWorkouts,
      totalWorkoutCount: action.totalWorkoutCount,
      allWorkoutsUpdated: true,
    });
  };

  const saveMyWorkouts = (state, action) => {
    return updatedObject(state, {
      myWorkouts: action.myWorkouts,
      myWorkoutCount: action.myWorkoutCount,
      myWorkoutsUpdated: true,
    });
  };

  const modifyAllWorkouts = (state, action) => {
    return updatedObject(state, {
      allWorkoutsUpdated: false,
    });
  };

  switch (action.type) {
    case "SAVE_ALL_WORKOUTS":
      return saveAllWorkouts(state, action);
    case "SAVE_MY_WORKOUTS":
      return saveMyWorkouts(state, action);
    case "MODIFY_ALL_WORKOUTS":
      return modifyAllWorkouts(state, action);
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
