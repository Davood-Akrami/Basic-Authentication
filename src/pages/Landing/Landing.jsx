import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>

            <div>
                <button 
                    onClick={() => navigate('/auth')}
                >Login</button>
            </div>
        </div>
    )
}

export default Landing;
