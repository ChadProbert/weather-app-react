import React from 'react'
import "./App.css"
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import countries from "i18n-iso-countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default function App() {
	// stores the response from the API
	const [apiData, setApiData] = useState({});
	// stores the location name that is inside of the input field
	const [getState, setGetState] = useState("Johannesburg");
	// stores a copy of getState
	const [state, setState] = useState("Johannesburg");

	// created a .env.local file which stores the api key as a variable called REACT_APP_API_KEY
	const apiKey = process.env.REACT_APP_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

	// fetching data from apiURL and storing inside of apiData state
	useEffect(() => {
		const fetchWeather = async () => {
			const data = await fetch(apiUrl).then((res) => res.json());
			setApiData(data);
		};
		fetchWeather();
	}, [apiUrl]);

	// user input handler functions:

	// stores the input from the user (inside the input field) in getState
	const inputHandler = (event) => {
		setGetState(event.target.value);
	};

	// copies getState to setState
	const submitHandler = () => {
		setState(getState);
	};

	// converting from kelvin (API's default temperature measurement) to degrees celsius
	// conversion formula: kelvin temperature - 273.15 = degrees celsius
	// rounded off to 0 decimal places
	const kelvinToCelsius = (k) => {
		return (k - 273.15).toFixed(0);
	};

	// added Font Awesome spinner icon for when the location search is loading
	const iconSpinner = <FontAwesomeIcon icon={faSpinner} spin />;

	return (
		<div className="App">
			<header className="d-flex justify-content-center align-items-center">
				<h1 className="headingWeatherApp">Weather App</h1>
			</header>

			<div className="container">
				<div className="mt-3 d-flex flex-column justify-content-center align-items-center">
					<span>
						<TextField
							id="standard-basic"
							label="Enter Location"
							variant="standard"
							color="primary"
							onChange={inputHandler}
							value={getState}
						/>
						<button className="btn btn-primary mt-2" onClick={submitHandler}>
							<i className="fas fa-search"></i>
						</button>
					</span>
				</div>
				<div
					className="card mt-3 mx-auto"
					style={{ width: "60vw", height: "60vh" }}
				>
					{apiData.main ? (
						<div className="card-body text-center">
							<img
								src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
								alt="weather status icon"
								className="weather-icon"
							/>

							<p className="h2">{kelvinToCelsius(apiData.main.temp)}&deg; C</p>

							<p className="h5">
								<i className="fas fa-map-marker-alt"></i>{" "}
								<strong>{apiData.name}</strong>
							</p>

							<div className="row mt-4 divReadings">
								<div className="col-md-6">
									<p>
										<i className="fas fa-temperature-low "></i>{" "}
										<strong>
											{kelvinToCelsius(apiData.main.temp_min)}&deg; C
										</strong>
									</p>
									<p>
										<i className="fas fa-temperature-high"></i>{" "}
										<strong>
											{kelvinToCelsius(apiData.main.temp_max)}&deg; C
										</strong>
									</p>
								</div>
								<div className="col-md-6">
									<p>
										{" "}
										<strong>{apiData.weather[0].main}</strong>
									</p>
									<p>
										<strong>
											{" "}
											{countries.getName(apiData.sys.country, "en", {
												select: "official",
											})}
										</strong>
									</p>
								</div>
							</div>
						</div>
					) : (
						<h1 className="loading">{iconSpinner}</h1>
					)}
				</div>
			</div>
		</div>
	);
}

/* References: 

https://openweathermap.org/

https://dev.to/imshines/a-simple-weather-app-using-react-and-openweathermap-api-10m2

https://www.vedantu.com/chemistry/kelvin-to-celsius

https://www.npmjs.com/package/i18n-iso-countries

https://stackoverflow.com/questions/49108136/importing-env-variable-react-front-end

https://react-bootstrap.github.io/getting-started/introduction/

https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react

https://mui.com/components/text-fields/

*/
