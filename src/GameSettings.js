import { SETTINGS_ACTIONS, useGameSettings, useGameSettingsDispatch } from "./TriviaContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { Box, Button, LinearProgress } from '@mui/material';

export default function GameSettings() {


        const settingsState = useGameSettings()

        const settingsDispatch = useGameSettingsDispatch()
       
        const [loading, setLoading] = useState(false)
        const [difficulty, setDifficult] = useState(settingsState.difficulty)
        const [amount, setAmount] = useState(settingsState.amount)
        const [categories, setCategories] = useState([])
        const [selectedCategories, setSelectedCategories] = useState([]) 
      
        useEffect(() => {
            const getCategories = async () => {
                try{
                    setLoading(true)
                    const response = await axios.get("https://the-trivia-api.com/api/categories")
                    if (response.status === 200) {
                        setLoading(false)
                        console.log(response.data)
                        setCategories(Object.keys(response.data))
                        console.log(Object.keys(response.data))
                    }
                    else {
                        setLoading(false)
                        console.log(response.statusText)
                    } 
                }catch (error) {
                    console.log(error.message)}
                }
                getCategories()
            }, [])
 
        // useEffect(() => {
        // const getCategories = async () => {
        //     try{
        //         settingsDispatch({type: SETTINGS_ACTIONS.SETTINGS_FETCH_START})
        //         const response = await axios.get("https://the-trivia-api.com/api/categories")
        //         if (response.status === 200) {
        //             console.log(response.data)
        //             settingsDispatch({type: SETTINGS_ACTIONS.SETTINGS_FETCH_SUCCESS,
        //                                 categories: Object.keys(response.data)})
        //             // setCategories(Object.keys(response.data))
        //             console.log(Object.keys(response.data))

        //         }
        //         else {
        //             settingsDispatch({ type: SETTINGS_ACTIONS.SETTINGS_FETCH_ERROR, msg: response.statusText})
        //         } 
        //     }catch (error) {
        //         console.log(error.message)}
        //     }
        //     getCategories()
        // }, [] )

    const handleSendSettings = () => {
        console.log(difficulty)
        console.log(amount)
        console.log(selectedCategories)
        settingsDispatch({type: SETTINGS_ACTIONS.UPDATE_SETTINGS,
                            amountRecieved: amount,
                            difficultyRecieved: difficulty,
                            categoriesRecieved: selectedCategories
                            })
    }

    const handleReset = (event) => {
        settingsDispatch({type: SETTINGS_ACTIONS.RESET_SETTINGS})
        setAmount(settingsState.amount)
        setDifficult(settingsState.difficulty)
        
    }

    return (
      
      <Box
        className="App"
        // sx={{
        //   width: "70%",
        //   margin: "0 auto",
        //   backgroundColor: "white",
        //   backgroundSize: "cover",
        //   backgroundPosition: "top",
        //   paddingTop: "70px",
        // }}
      >

            <h1>SETTINGS</h1>
            <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSendSettings()
                    }}>
            
                <div className="slidecontainer">
                    <input type="range" min="1" max="20" value={amount} 
                    className="slider" onChange={(event) =>{setAmount(event.target.value)}}/>
                </div>
                <p>amount of questions: {amount}</p>

                <div >
                    <input type='radio' 
                        value={"easy"} 
                        checked={difficulty === "easy"}
                        onChange={(event) => {setDifficult(event.target.value)}}/>
                        {/* // defaultChecked={difficulty === null}/ */}
                    <label>{"easy"}</label>
                    <input type='radio' 
                        value={"medium"} 
                        checked={difficulty === "medium"}
                        onChange={(event) => {setDifficult(event.target.value)}}/>
                    <label>{"medium"}</label>
                    <input type='radio' 
                        value={"hard"} 
                        checked={difficulty === "hard"}
                        onChange={(event) => {setDifficult(event.target.value)}}/>
                    <label>{"hard"}</label>                    
                </div>

           
                <p>For windows: Hold down the control (ctrl) button to select multiple options</p>
                <p>For Mac: Hold down the command button to select multiple options</p>
                <div>
                <select defaultValue={[]} onChange={(event) => {setSelectedCategories(Array.from(event.target.selectedOptions, option => option.value))}} multiple>
                    {categories.map((category) => (
                    <option key={category} value={category}>
                         {category}
                    </option>
                    ))}
                </select>
                </div>

                <Button variant="outlined" type="submit" style={{color: '#5F9EA0'}}>submit</Button>
                <Button variant="outlined" type="reset" style={{color: '#5F9EA0'}}
                        onClick={handleReset}>reset</Button>
            </form>
            
            {loading && 
                <LinearProgress style={{backgroundColor: '#5F9EA0'}}/>}
            </Box>

    )}