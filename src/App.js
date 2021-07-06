import './App.css';
import { apiKey, lang, units } from "./api";
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

//Images
import sunrise from "../src/assets/images/sunrise.png";
import wind from "../src/assets/images/wind.png";
import temperature from "../src/assets/images/temperature.png";
import water from "../src/assets/images/water.png";
import planet from "../src/assets/images/planet.png";
import errorImg from "../src/assets/images/error.png";
import pointer from "../src/assets/images/pointer.png";

//Components
import Card from "./components/Card";
import Header from "./components/Header";
import InformativeCard from "./components/InformativeCard";


function App() {

  const [clima, setClima] = useState();
  const [city, setCity] = useState('');

  const capitalizeSentence = (string) => { string = string[0].toUpperCase() + string.substring(1); return string }

  const getClima = async () => {
    return await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}&lang=${lang}`)
      .then((response) => response.json())
      .then((json) => {
        setClima(json);
        setCity('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='App'>

      {
        clima && clima.cod === 200 ?
          <>
            <Header clima={clima} setCity={setCity} getClima={getClima} city={city} />

            <div className='main-container'>

              <div className='main-card col' >
                <div className='row'>
                  <p className='h2'>
                    {clima.name}
                    <img
                      id='pointer'
                      style={{ margin: '5px 5px 3px 5px' }}
                      onClick={() => { window.open(`https://www.google.com.ar/maps/place/${clima.coord.lat}+${clima.coord.lon}`) }}
                      src={pointer}
                      alt="pointerMap"
                      height="30px"
                      width="30px"
                    />
                  </p>
                </div>
                <div className='row' style={{ flex: 1, margin: '25px 0px 25px 0px', justifyContent: 'center' }} >
                  <p className='h1' style={{ alignSelf: 'center', }} >{clima.main.temp} °C</p>
                  <div className='divider' />
                  <div className='col' style={{ flex: 0.49, justifyContent: 'center', }} >
                    <img
                      style={{ alignSelf: 'center' }}
                      src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      height="130px"
                      width="130px"
                    />
                    <p className='t1' style={{ textAlign: 'center' }}>{capitalizeSentence(clima.weather[0].description)}</p>
                  </div>
                </div>
                <div className='row'>
                  <p className='t1'>Sensación térmica<br />{clima.main.feels_like} °C</p>
                </div>
              </div>

              <div className='extra-section' >
                <div className='row' style={{ flex: 1 }} >
                  <Card
                    image={sunrise}
                    txt1='Amanecer'
                    value1={moment.unix(clima.sys.sunrise).utc(false).format('HH:mm')}
                    txt2='Anochecer'
                    value2={moment.unix(clima.sys.sunset).utc(false).format('HH:mm')}
                  />
                  <Card
                    image={wind}
                    txt1='Velocidad'
                    value1={clima.wind.speed + ' m/s'}
                    txt2='Dirección'
                    value2={clima.wind.deg + '°'}
                  />
                </div>

                <div className='extra-card'>
                  <div className='row' style={{ flex: 1, justifyContent: 'center' }}>
                    <div className='col' style={{ flex: 0.3, justifyContent: 'center', margin: '0px 10px 0px 0px' }} >
                      <img
                        alt='minmax temperature'
                        src={temperature}
                        height="50px"
                        width="50px"
                        style={{ alignSelf: 'center' }}
                      />
                    </div>
                    <div className='col' style={{ flex: 0.7, margin: 10 }}>
                      <p className='t1' style={{ margin: '0px 0px 10px 0px' }}>Temperatura máxima<br />{clima.main.temp_max} °C</p>
                      <p className='t1'>Temperatura mínima<br />{clima.main.temp_min} °C</p>
                    </div>
                  </div>
                  <div className='divider' />
                  <div className='row' style={{ flex: 1, justifyContent: 'center' }}>
                    <div className='col' style={{ flex: 0.3, justifyContent: 'center', margin: '0px 10px 0px 0px' }} >
                      <img
                        alt='ocean'
                        src={water}
                        height="50px"
                        width="50px"
                        style={{ alignSelf: 'center' }}
                      />
                    </div>
                    <div className='col' style={{ flex: 0.7, margin: 10 }}>
                      <p className='t1' style={{ margin: '0px 0px 10px 0px' }}>Presión atmosférica<br />{clima.main.pressure} hPa</p>
                      <p className='t1'>Humedad<br />{clima.main.humidity} %</p>
                    </div>
                  </div>
                </div>

              </div>
            </div >
          </>

          : clima && clima.cod !== 200 ?
            <div>
              <Header setCity={setCity} getClima={getClima} city={city} />
              <InformativeCard
                title='¡Ups!'
                description='No se han encontrado registros de la ciudad ingresada. Por favor vuelva a intentarlo.'
                image={errorImg} />
            </div>

            :
            <div>
              <Header setCity={setCity} getClima={getClima} city={city} />
              <InformativeCard
                title='¡Bienvenido!'
                description='Conozca el pronóstico del tiempo de cualquier parte del mundo. Para comenzar debe ingresar una ciudad.'
                image={planet} />
            </div>
      }
    </div >
  );
}

export default App;
