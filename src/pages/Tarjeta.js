import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'


function Tarjeta() {
    const location = useLocation()
    const history = useHistory()

    function goBackHandle() {
        history.goBack();
    }

    return (
        <div>
            Tarjeta
            
            <button onClick={goBackHandle}>Go Back</button>

        </div>
    )
}

export default Tarjeta
