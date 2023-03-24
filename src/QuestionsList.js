import Question from "./Question"
import { GAME_ACTIONS, useGame, useGameDispatch, useGameSettingsDispatch, SETTINGS_ACTIONS } from "./TriviaContext"
import axios from "axios"
import { Button } from "@mui/material"


export default function QuestionsList() {

    const settingsDispatch = useGameSettingsDispatch()

    const gameState = useGame()
    const dispatch = useGameDispatch()
    const {questions, gameInProcess} = gameState
    
    const items = questions.map(
        (q, index) => <Question key={index} question={q}/>)

        const handleStartGame = async (event) => {
            event.preventDefault()
            console.log("new game")
            settingsDispatch({type: SETTINGS_ACTIONS.RESET_SETTINGS})
            dispatch({type: GAME_ACTIONS.QUESTIONS_FETCH_START})
            try {
                const response = await axios.get("https://the-trivia-api.com/api/questions?limit=5")
                if (response.status === 200) {
                    dispatch({
                        type: GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS,
                        questionsReceived: response.data
                    })
                } else {
                    dispatch({ type: GAME_ACTIONS.QUESTIONS_FETCH_ERROR, msg: response.statusText})
                }
            } catch (error) {
                console.error(error)
            }
        }
        


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({type: GAME_ACTIONS.SUBMIT_ANSWERS})
    }

    const handleReset = () => {
        dispatch({type: GAME_ACTIONS.RESET_ANSWERS})
    }

    
    if (gameInProcess && questions.length > 0) {
        return(
            <form onSubmit={handleSubmit} onReset={handleReset}>
                {items} 
                <Button type="submit" variant="outlined" style={{color: '#5F9EA0'}}
                        disabled={gameState.disabled}>SUBMIT</Button>
                <Button type="reset" variant="outlined" style={{color: '#5F9EA0'}}
                        >RESET</Button>
                <Button type="submit" variant="outlined" style={{color: '#5F9EA0'}}
                        onClick={handleStartGame}>NEW GAME</Button>
                
            </form>
        )
    } else {
        return null;
    }
}