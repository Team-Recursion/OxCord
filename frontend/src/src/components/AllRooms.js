import React, { useState, createContext } from 'react'

export const CTX = React.createContext();

/*
    state: {
            roomId:[
                {song}, {song}, {song}
            ]
            roomId:[
                {song}, {song}, {song}
            ]
        }

*/

// const initState = {
//     room1:[
//         {
//             videoId: 'ter0p_iyIxk',
//             title: 'september',
//             description: "banger",
//             thumbnail: 'https://upload.wikimedia.org/wikipedia/en/1/18/EarthWindAndFireSeptember7InchSingleCover.jpg'
//         }, 
//         {
//             videoId: 'Kr4EQDVETuA',
//             title: 'billie jean',
//             description: 'yeah he did it',
//             thumbnail: 'https://i.ytimg.com/vi/Kr4EQDVETuA/maxresdefault.jpg'
//         }, 
//         {
//             videoId: '7u052cW1e1Y',
//             title: 'kakusei',
//             description: "anime banger",
//             thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51znemE6w4L._SX342_QL70_.jpg'
//         }
//     ],
//     room2:[
//         {
//             videoId: '7u052cW1e1Y',
//             title: 'kakusei',
//             description: "anime banger",
//             thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51znemE6w4L._SX342_QL70_.jpg'
//         }, 
//         {
//             videoId: 'ter0p_iyIxk',
//             title: 'september',
//             description: "banger",
//             thumbnail: 'https://upload.wikimedia.org/wikipedia/en/1/18/EarthWindAndFireSeptember7InchSingleCover.jpg'
//         }, 
//         {
//             videoId: 'Kr4EQDVETuA',
//             title: 'billie jean',
//             description: 'yeah he did it',
//             thumbnail: 'https://i.ytimg.com/vi/Kr4EQDVETuA/maxresdefault.jpg'
//         }
//     ]
// }


// function reducer(state, action) {
//     const{videoId, title, description, thumbnail, roomId} = action.payload;
    
    
//     switch (action.type) {
//         case 'RECEIVE SONG':
//             return {
//                 ...state,
//                 [roomId]: [
//                     ...state[roomId],
//                     {
//                         videoId,
//                         title,
//                         description,
//                         thumbnail
//                     }
//                 ]
//             }
//         case 'ADD_ROOM':
//             return {}

//         default:
//             return state
//     }
// }


// export default function AllRooms(props) {

//     const reducerHook = React.useReducer(reducer, initState)
//     console.log(initState);
//     console.log(CTX)
//     return (
//         <CTX.Provider value={initState}>
//             {props.children}
//         </CTX.Provider>
//     )
// }
