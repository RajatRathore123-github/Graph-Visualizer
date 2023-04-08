import "./Navbar.css"
import { useParams } from "../../context/states"

export default function Navbar(){
    const { mode,setMode,algo,setAlgo,setRes,setRun } = useParams();

    return (
        <div className="navbar">
            <div className="container">

                 {/* button for Start */}

                <button type="button" className={['btn','btn-primary',mode == 'setStart' ? 'selected' : ''].join(' ')} onClick={() => {
                    if(mode == 'setStart') setMode(null);
                    else{
                        setMode('setStart')
                    }
                }}>
                    <i className="bi bi-geo-alt"></i>
                </button>
                     
                 {/* button for Target */}  

                <button type="button" className={['btn','btn-primary',mode == 'setTarget' ? 'selected' : ''].join(' ')} onClick={() => {
                    if(mode == 'setTarget') setMode(null);
                    else{
                        setMode('setTarget')
                    }
                }}>
                    <i className="bi bi-geo"></i>
                </button>
                 
                 {/* button for adding boundaries */}

                <button type="button" className={['btn','btn-primary',mode == 'addBricks' ? 'selected' : ''].join(' ')} onClick={() => {
                    if(mode == 'addBricks') setMode(null);
                    else{
                        setMode('addBricks')
                    }
                }}>
                    <i className="bi bi-bricks"></i>
                </button>
                 
                 {/* button for adding weights */}

                <button type="button" className={['btn','btn-primary',mode == 'addWeight' ? 'selected' : ''].join(' ')} onClick={() => {
                    if(mode == 'addWeight') setMode(null);
                    else{
                        setMode('addWeight')
                    }
                }}>
                    <i className="bi bi-virus"></i>
                </button>

                <button type="button" className="btn btn-primary" onClick={() => {
                    setRes((old) => {return !old})
                }}>
                    <i className="bi bi-arrow-counterclockwise"></i>
                </button>

                <button type="button" className="btn btn-primary" onClick={() => {
                    setRun((old) => {return !old})
                }}>
                    <i className="bi bi-caret-right"></i>
                </button>
                <div>
                    <select className="form-select" aria-label="default select example" value={algo} onChange ={(e) => setAlgo(e.target.value)}>
                        <option value=''>Choose your algorithm</option>
                        <option value="dijkstra">dijkstra</option>
                        <option value="BFS">BFS</option>
                        <option value="DFS">DFS</option>
                    </select>
                </div>
            </div>
        </div>
    )
}