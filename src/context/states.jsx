import { useContext, createContext, useState, useRef, useEffect } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext();

export const useParams = () => {
    return useContext(context);
}

export const ParamsProvider = ({children}) => {

    const [mode, setMode] = useState(null);
    const [algo, setAlgo] = useState('');
    const [run, setRun] = useState(false);
    const [grid, setGrid] = useState(getGrid(50,25));
    const [editing, setEditing] = useState(false);
    const [res, setRes] = useState(false);
    const start = useRef({x:25,y:12});
    const end = useRef({x:48,y:23});

    function reStart(){
        setGrid(getGrid(50,25));
    }

    useEffect(() => {
        reStart()
    },[res]);

    return (
        <div>
            <context.Provider value={{
                mode,
                setMode,
                algo,
                setAlgo,
                grid,
                setGrid,
                res,
                setRes,
                editing,
                setEditing,
                start,
                end,
                run,
                setRun

            }}>
                {children}
            </context.Provider>
        </div>
    )
}