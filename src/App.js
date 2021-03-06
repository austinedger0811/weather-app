import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Current from './Current'
import RainChart from './RainChart'
import Forecast from './Forecast'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'

const App = () => {

  var key = 'b075c49533634e1894f23737210509'
  const baseURL = 'https://api.weatherapi.com/v1/'

  const [searchValue, setSearchValue] = useState('New York')
  const [weather, setWeather] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${baseURL}forecast.json?key=${key}&q=${searchValue}&days=3&aqi=no&alerts=no`).then((response) => {
      setWeather(response.data)
      setLoading(false)
    })
  }, [searchValue, key])

  const getSearchValue = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(event.target.value)
      event.target.value = ''
    }
  }

  if (isLoading) {
    return <div></div>
  }

  return (
    <Container>
      <AppBar position="static">
        <NavBar>
          <Search>
            <Input type="text" placeholder="Search by city or zipcode..." fullWidth autoFocus onKeyDown={getSearchValue} />
          </Search>
        </NavBar>
      </AppBar>
      <Current weather={weather} />
      <RainChart forecast={weather.forecast.forecastday[0].hour} />
      <Forecast forecast={weather.forecast.forecastday} />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  background-color: #102A43; 
`

const NavBar = styled(Toolbar)`
  color: #BCCCDC;
  background-color: #334E68;
`

const Search = styled.div`
  width: 100%;
  margin-left: 9%;
  margin-right:9%;
  border-radius: 6px;
`

const Input = styled(InputBase)`
  && {
    padding-left: 12px;
    border-radius: 6px;
    color: #D9E2EC;
    background-color: #486581;
  }
`

export default App;
