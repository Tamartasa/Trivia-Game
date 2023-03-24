import axios from "axios"
import QuestionsList from "./QuestionsList"
import Results from "./Results"
import { GAME_ACTIONS, useGame, useGameDispatch, useGameSettings } from "./TriviaContext"
import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"


export default function Game() {
    
    const gameState = useGame()
    const dispatch = useGameDispatch()

	const settingsState = useGameSettings()
	const {amount, difficulty, categories, newSettings = false} = settingsState
	// const [newSettings, setNewSettings] = useState(false)
	const [showNewGameButton, setShowNewGameButton] = useState(true)

	
	useEffect(() => {
		if (!gameState.gameInProcess && (newSettings === true || newSettings === null)) {
		  setShowNewGameButton(true)
		} else {
		  setShowNewGameButton(false)
		  handleStartGame()
		}
	  }, [gameState.gameInProcess, newSettings])



	const handleStartGame = async () => {
		dispatch({type: GAME_ACTIONS.QUESTIONS_FETCH_START})

		let URL = `https://the-trivia-api.com/api/questions?`
		let params = {limit: amount} 

		if (categories) {
			params.categories = categories.join(',')
		}
		if (amount) {
			params.limit = amount
		}
		if (difficulty) {
			params.difficulty = difficulty
		}
		
		console.log(URL)
		const response = await axios.get(URL, {params: {...params}})
		console.log(URL, {params: {...params}})
		if (response.status === 200) {
			dispatch({
				type: GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS,
				questionsReceived: response.data
			})
		} else {
			dispatch({ type: GAME_ACTIONS.QUESTIONS_FETCH_ERROR, msg: response.statusText})
		}
	}

	return (
		<Box className='App'
		   sx={{
          width: "70%",
          margin: "0 auto",
          backgroundSize: "cover",
          backgroundPosition: "top",
          paddingTop: "70px",
        }}>
		<h3>TRIVIA GAME</h3>

        {gameState.loading ?
            <p>Loading...</p>
        :
            <>
                <QuestionsList />
                <Results />
            </>
        }

        {gameState.errorMsg &&
            <p style={{color: 'red'}}>{gameState.errorMsg}</p>
        }
        
        {console.log("showNewGameButton: ", showNewGameButton)}
        {showNewGameButton &&
            <Button variant="outlined" onClick={handleStartGame} disabled={gameState.loading}
					style={{color: '#5F9EA0'}}>NEW GAME</Button>
        }


		</Box>
	);
}