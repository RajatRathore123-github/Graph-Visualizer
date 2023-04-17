import { useState, useEffect } from "react";
import "./Grid.css";
import { useParams } from "../../context/states";
import { useRef } from "react";

export default function Grid() {

    const { grid, setGrid, editing, setEditing, mode, start, end, run, res, algo, isStart } = useParams();


    const [refarray, setRefarray] = useState(getrefArray(grid));

    function getrefArray(grid) {
        let array = [];
        grid.forEach((elem) => {
            elem.forEach((child) => {
                array.push(useRef())
            })
        })

        return array
    }


    useEffect(() => {
        if (algo == 'BFS') {
            let hashmap = {};
            let prevmap = {};
            for (let j = 0; j < 25; j++) {
                for (let i = 0; i < 50; i++) {
                    hashmap[`${i}-${j}`] = false;
                    prevmap[`${i}-${j}`] = null;
                }
            }

            // if algo btn is set to BFS

            let result = BFS(grid, hashmap, prevmap, start.current, end.current);
            let path = [];
            if(result != null) {
                let current = result[0];
                while(prevmap[`${current.x}-${current.y}`] != null) {
                    path.push(current);
                    current = prevmap[`${current.x}-${current.y}`]
                }
                setTimeout(() => {
                    path.reverse().forEach((elem, index) => {
                        refarray[elem.x + elem.y*50].current.style['transition-delay'] = `${(index) * 15}ms`
                        refarray[elem.x + elem.y*50].current.classList.add('path')
                    })
                }, result[1]*9);
            }
        
        }

        // if algo btn is set to DFS

        if(algo == 'DFS'){
            let hashmap = {};
            let prevmap = {};
            for(let j = 0;j < 25;j++){
                for(let i = 0;i < 50;i++){
                    hashmap[`${i}-${j}`] = false;
                    prevmap[`${i}-${j}`] = null;
                }
            }
            let result = DFS(grid,hashmap,prevmap,start.current,end.current);
                let path = [];
                if(result != null){
                    let current = result[0];
                    while(prevmap[`${current.x}-${current.y}`] != null){
                        path.push(current);
                        current=prevmap[`${current.x}-${current.y}`]
                    }

                    setTimeout(()=>{
                        path.reverse().forEach((elem,index) => {
                            refarray[elem.x+elem.y*50].current.style['transition-delay'] = `${(index) * 15}ms`
                            refarray[elem.x+elem.y*50].current.classList.add('path')
                        })
                    },result[1]*9);
                }
            
        }



    }, [run]);

    // Clearing the board
    
    useEffect(() => {
        refarray.forEach((elem) => {elem.current.style['transition-delay']='0ms'});
        refarray.forEach((elem) => {elem.current.classList.remove('visited');
        elem.current.classList.remove('path')})
    },[res]);

    // doing simple bfs

    function BFS(graph, hashmap, prevmap, start, target) {
        let queue = [start]
        let count = 0;
        hashmap[`${start.x}-${start.y}`] = true;

        while (queue.length > 0) {
            count += 1
            let c = queue.pop()
            refarray[c.x+c.y*50].current.style['transition-delay'] =`${count * 8}ms`
            refarray[c.x+c.y*50].current.classList.add('visited')
            if (c.x == target.x && c.y == target.y) return [c, count];

            // checking all four directions an the grid

            if (c.x+1 < 50 && !hashmap[`${c.x+1}-${c.y}`] && !graph[c.y][c.x+1].isWall) {
                queue.unshift({x:c.x+1, y:c.y});
                prevmap[`${c.x+1}-${c.y}`] = {...c};
                hashmap[`${c.x+1}-${c.y}`] = true;
            }

            if (c.x-1 >= 0 && !hashmap[`${c.x-1}-${c.y}`] && !graph[c.y][c.x-1].isWall) {
                queue.unshift({ x:c.x-1, y:c.y});
                prevmap[`${c.x-1}-${c.y}`] = {...c};
                hashmap[`${c.x-1}-${c.y}`] = true;
            }
            if (c.y+1 < 25 && !hashmap[`${c.x}-${c.y+1}`] && !graph[c.y+1][c.x].isWall) {
                queue.unshift({ x:c.x, y:c.y+1});
                prevmap[`${c.x}-${c.y+1}`] = {...c};
                hashmap[`${c.x}-${c.y+1}`] = true;
            }
            if (c.y-1 >= 0 && !hashmap[`${c.x}-${c.y-1}`] && !graph[c.y-1][c.x].isWall) {
                queue.unshift({ x:c.x, y:c.y-1});
                prevmap[`${c.x}-${c.y-1}`] = {...c};
                hashmap[`${c.x}-${c.y-1}`] = true;
            }
        }
        return null;
    }

    // doing simple dfs

    function DFS(graph, hashmap, prevmap, start, target) {
        let queue = [start];
        let count = 0;
        hashmap[`${start.x}-${start.y}`] = true;
        while (queue.length > 0) {
            count += 1;
            let c = queue[0];
            queue.shift();
            refarray[c.x + c.y * 50].current.style['transition-delay'] = `${count * 8}ms`;
            refarray[c.x + c.y * 50].current.classList.add('visited');
            if (c.x == target.x && c.y == target.y) return [c, count];

            // checking all four directions an the grid

            if (c.y+1 < 25 && !hashmap[`${c.x}-${c.y+1}`] && !graph[c.y+1][c.x].isWall) {
                queue.unshift({ x:c.x, y:c.y+1 });
                prevmap[`${c.x}-${c.y+1}`] = {...c };
                hashmap[`${c.x}-${c.y+1}`] = true;
            }

            if (c.x-1 >= 0 && !hashmap[`${c.x - 1}-${c.y}`] && !graph[c.y][c.x-1].isWall) {
                queue.unshift({ x:c.x -1, y:c.y });
                prevmap[`${c.x-1}-${c.y}`] = {...c };
                hashmap[`${c.x-1}-${c.y}`] = true;
            }

            if (c.y-1 >= 0 && !hashmap[`${c.x}-${c.y-1}`] && !graph[c.y -1][c.x].isWall) {
                queue.unshift({ x: c.x, y: c.y - 1 });
                prevmap[`${c.x}-${c.y-1}`] = {...c };
                hashmap[`${c.x}-${c.y-1}`] = true;
            }

            if (c.x+1 < 50 && !hashmap[`${c.x+1}-${c.y}`] && !graph[c.y][c.x+1].isWall) {
                queue.unshift({ x:c.x +1, y:c.y });
                prevmap[`${c.x + 1}-${c.y}`] = {...c };
                hashmap[`${c.x + 1}-${c.y}`] = true;
            }
        }
        return null;
    }


    return (
        <div className="board">
            {refarray.map((elem, index) => {
                let classList = ['cell'];
                let yindex = Math.floor(index / 50);
                let xindex = index % 50;
                let cell = grid[yindex][xindex];

                if (cell.isWall) {
                    classList.push('wall');
                }


                return <div key={`${index}`} ref={elem} className={classList.join(' ')}

                    onMouseDown={() => { setEditing(true) }}
                    onMouseUp={() => { setEditing(false) }}
                    onMouseMove={() => {
                        if (!editing) return
                        const current = grid[yindex][xindex];
                        if (current.isStart || current.isTarget) return

                        switch (mode) {
                            case 'setStart':
                                var newgrid = grid.map((elem) => {
                                    return elem.map((elem) => {
                                        if (!elem.isStart) return elem
                                        return { ...elem, isStart: false }
                                    })
                                })
                                newgrid[yindex][xindex] = {
                                    ...newgrid[yindex][xindex], isStart: true, isTarget: false,
                                    weight: 1, isWall: false
                                }
                                start.current = { x: xindex, y: yindex }
                                setGrid(newgrid)
                                break;
                            case 'setTarget':
                                var newgrid = grid.map((elem) => {
                                    return elem.map((elem) => {
                                        if (!elem.isTarget) return elem
                                        return { ...elem, isTarget: false }
                                    })
                                })
                                newgrid[yindex][xindex] = {
                                    ...newgrid[yindex][xindex], isStart: false, isTarget: true,
                                    weight: 1, isWall: false
                                }
                                end.current = { x: xindex, y: yindex }
                                setGrid(newgrid)
                                break;

                            case 'addBricks':
                                var newgrid = grid.slice()
                                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 1, isWall: true }
                                setGrid(newgrid)
                                break;

                            case 'addWeight':
                                var newgrid = grid.slice()
                                newgrid[yindex][xindex] = { ...newgrid[yindex][xindex], weight: 5, isWall: false }
                                setGrid(newgrid)
                                break;

                            default:
                                return

                        }

                    }}
                >
                    {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
                    {cell.isStart ? <i className="bi bi-geo-alt"></i> : null}
                    {cell.isTarget ? <i className="bi bi-geo"></i> : null}
                </div>
            })}
        </div>
    )

}