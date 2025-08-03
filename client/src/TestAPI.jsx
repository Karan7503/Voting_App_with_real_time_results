import { useEffect, useState } from "react";

const TestAPI = ()=> {
    const [message, setMessage] = useState('Loading');

    useEffect( ()=>{
        fetch('http://localhost:5000/api/test')
        .then(res => res.json())
        .then(data => setMessage(data.msg))
        .catch(err =>{
            console.error(err);
            setMessage('Error connecting to backend')
        });
    }, []);
    return(
        <div>
            <h2>Backend Test:</h2>
            <p>{message}</p>
        </div>
    );
};

export default TestAPI;