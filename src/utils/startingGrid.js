// Creating object and its properties : x,y,isstarting,istarget,iswall and weight

import React from 'react'

export const startingGrid = (width,height) => {

    let grid = [];
    for(let i = 0 ; i < height ; i++){
        let local = [];
        for(let j = 0 ; j < width ; j++){
            local.push({x : j, y : i, isStart : false, isTarget : false, weight : 1, isWall : false})
        }
        grid.push(local);
    }
  return (
    <>
     
    </>
  )
}

