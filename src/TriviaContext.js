import { createContext, useContext, useReducer } from "react";

export const DEFAULT_SETTINGS = {
  amount: 5,
  categories: [],
  difficulty: "",
  settingsLoading: false,
  settingsErrorMsg: null,
  newSettings: null
}

export const SETTINGS_ACTIONS = {
  SETTINGS_FETCH_START: 'settingsFetchStart',
  SETTINGS_FETCH_SUCCESS: 'settingsFetchSuccess',
  SETTINGS_FETCH_ERROR: 'settingsFetchError',
  UPDATE_SETTINGS: 'updateSettings',
  // UPDATE_AMOUNT: 'updateAmount',
  // UPDATE_CATEGORY: 'updateCategory',
  // UPDATE_DIFFICULTY: 'updateDifficulty',
  RESET_SETTINGS: 'resetSettings',
};

// Reducer function for updating game settings
function settingsReducer(settingsState, action) {
  switch (action.type) {
    // case SETTINGS_ACTIONS.SETTINGS_FETCH_START: {
    //   return {
    //     ...settingsState,
    //     settingsLoading: true,
    //     settingsErrorMsg: null
    //   }}
    // case SETTINGS_ACTIONS.SETTINGS_FETCH_SUCCESS: {
    //   return {
    //     ...settingsState,
    //     settingsLoading: false,
    //     settingsErrorMsg: null,
    //   }
    // }

    case SETTINGS_ACTIONS.SETTINGS_FETCH_ERROR: {
      return {
        ...settingsState,
        settingsLoading: false,
        settingsErrorMsg: action.msg
      }
    }

    case SETTINGS_ACTIONS.UPDATE_SETTINGS: {
      return {
        ...settingsState,
        amount: action.amountRecieved,
        difficulty: action.difficultyRecieved,
        categories: action.categoriesRecieved,
        newSettings: true
      }
    }


    case SETTINGS_ACTIONS.RESET_SETTINGS:
      return DEFAULT_SETTINGS;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const GameSettingsContext = createContext(DEFAULT_SETTINGS);
const SettingsDispatchContext = createContext(null)

export function GameSettingsProvider({ children }) {
  const [settingsState, dispatch] = useReducer(
    settingsReducer,
    DEFAULT_SETTINGS
  );

  return (
    <GameSettingsContext.Provider value={settingsState}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </GameSettingsContext.Provider>
  );
}

// Custom hook for accessing the GameSettings context
export function useGameSettings() {
  return useContext(GameSettingsContext);
}

// Custom hook for accessing the GameSettings dispatch function
export function useGameSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

// ---------------------------------------------------------------------------------
const INITIAL_GAME_STATE = {
  loading: false,
  errorMsg: null,
  gameInProcess: false,
  questions: [],
  disabled: false
}

export const GAME_ACTIONS = {
  QUESTIONS_FETCH_START: 'questionsFetchStart',
  QUESTIONS_FETCH_SUCCESS: 'questionsFetchSuccess',
  QUESTIONS_FETCH_ERROR: 'questionsFetchError',
  SELECT_ANSWER: 'selectAnswer',
  RESET_ANSWERS: 'resetAnswers',
  SUBMIT_ANSWERS: 'submitAnswers',
  RESET_GAME: 'resetGame'
}

function gameReducer(gameState, action) {
  switch (action.type) {

    case GAME_ACTIONS.QUESTIONS_FETCH_START: {
      console.log("sending request")
      return {
        ...gameState,
        loading: true,
        errorMsg: null
      }
    }

    case GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS: {
      action.questionsReceived.forEach(q => {
        q.selectedAnswer = ""
      });
      return {
        ...gameState,
        loading: false,
        errorMsg: null,
        gameInProcess: true,
        questions: action.questionsReceived,
        disabled: true
      }
    }

    case GAME_ACTIONS.QUESTIONS_FETCH_ERROR: {
      return {
        ...gameState,
        loading: false,
        errorMsg: action.msg
      }
    }

    case GAME_ACTIONS.SELECT_ANSWER: {
      const selectedQuestion = gameState.questions.filter(q => q.id === action.questionId)[0]
      selectedQuestion.selectedAnswer = action.answer
      function checkAll(Question) {
        return Question.selectedAnswer;
      }
      return {
        ...gameState,
        questions: [...gameState.questions],
        disabled: !gameState.questions.every(checkAll)
      }
    }

    case GAME_ACTIONS.SUBMIT_ANSWERS: {
      return {
        ...gameState,
        gameInProcess: false,
      }
    }

    case GAME_ACTIONS.RESET_ANSWERS: {
      gameState.questions.forEach(q => {
        q.selectedAnswer = ''
      })
      return {
        ...gameState,
        questions: [...gameState.questions]
      }
    }

    case GAME_ACTIONS.RESET_GAME: {
      return {
        INITIAL_GAME_STATE
      }
    }


    default: {
      throw Error('Unknown action: ' + action.type)
    }

  }
}

const GameContext = createContext(INITIAL_GAME_STATE)
const GameDispatchContext = createContext(null)


export function GameProvider({ children }) {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    INITIAL_GAME_STATE
  );

  return (
    <GameContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

