import React from 'react';
import './styles.css';

const Card = ({ image, txt1, value1, txt2, value2 }) => {
   return (
      <div className='card col' style={{ flex: 0.5 }}>
         <div className='row' style={{ justifyContent: 'center', flex: 1, }}>
            <img
               src={image}
               alt='weather'
               height="50px"
               width="50px"
               style={{ alignSelf: 'center' }}
            />
         </div>
         <div className='row' style={{ justifyContent: 'center', flex: 1, }}>
            <div className='column' style={{ flex: 0.5, textAlign: 'center', margin: '0px 10px 0px 10px' }}>
               <p className='t1'>{txt1}</p>
               <p className='t1'>{value1}</p>
            </div>
            <div className='column' style={{ flex: 0.5, textAlign: 'center', margin: '0px 10px 0px 10px' }}>
               <p className='t1'>{txt2}</p>
               <p className='t1'>{value2}</p>
            </div>
         </div>
      </div>
   );
};

export default Card;