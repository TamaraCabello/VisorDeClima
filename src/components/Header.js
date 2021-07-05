import React from 'react';
import './styles.css';
import moment from 'moment';
import sun from "../assets/images/sun.png";

const Header = ({ clima, setCity, getClima, city }) => {
    return (
        <div className='header col'>
            <div className='row'>
                <img
                    style={{ alignSelf: 'center', marginLeft: 45, }}
                    src={sun}
                    alt="sun icon"
                    height="40px"
                    width="40px"
                />
                <p style={{ fontSize: 35, margin: '0px 0px 0px 10px', fontWeight: 500, color: '#414141' }}>Visor de clima</p>
            </div>
            <div className='row'>
                <div className='search-bar-container'>
                    <input
                        className='search-bar'
                        placeholder='Ingrese una ciudad'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className='boton' onClick={() => { getClima() }} >
                        <p style={{ fontSize: 18, fontWeight: 400, margin: 5 }}>Buscar</p>
                    </div>
                </div>
                <div className='datetime-container'>
                    <p style={{ fontSize: 30, margin: 0, margin: '20px 20px 20px 20px' }}>
                        {(clima === undefined) ? moment().format('dddd DD, MMMM, yyyy HH:mm') : moment.unix(clima.dt).utc().format('dddd DD, MMMM, yyyy hh:mm')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;