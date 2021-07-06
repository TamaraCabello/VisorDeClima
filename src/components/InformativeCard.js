import React from 'react';
import './styles.css';

const InformativeCard = ({ title, description, image }) => {
    return (
        <div className='informative-card'>
            <div className='col'>
                <p style={{ fontSize: 35, textAlign: 'center', margin: 0 }}>
                    {title}
                </p>
                <p style={{ fontSize: 20, textAlign: 'center' }}>
                    {description}
                </p>
                <img
                    src={image}
                    alt='information'
                    height="200px"
                    width="200px"
                    style={{ alignSelf: 'center', padding: 20 }}
                />
            </div>
        </div>
    );
};

export default InformativeCard;