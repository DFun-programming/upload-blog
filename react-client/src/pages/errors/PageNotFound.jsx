import React from "react";
import svg from "../../assets/404.svg";
import {useNavigate} from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-start my-4">
                <img src={svg} alt="svg" />
                <button className="bg-gradient-to-r from-green-900 via-blue-950 to-blue-800 text-slate-200 px-3 py-2 rounded-lg" onClick={()=>navigate('/')}>Back to Home</button>
            </div>
        </>
    );
};

export default PageNotFound;
