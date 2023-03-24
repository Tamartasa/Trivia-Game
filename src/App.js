import './App.css';
import {GameProvider, GameSettingsProvider} from './TriviaContext';
import Game from './Game';
import GameSettings from './GameSettings';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';


function App() {
  
	return(
		<GameProvider>
			<GameSettingsProvider>
				<Routes>
					<Route path='/' element={<Layout/>}>
						<Route index element={<Game/>}/>
						<Route path="settings" element={<GameSettings/>}/>
					</Route>
				</Routes>
			</GameSettingsProvider>
		</GameProvider>


	)

}



export default App;
