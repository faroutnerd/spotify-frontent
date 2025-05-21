// import React, { useContext, useEffect } from 'react'
// import Sidebar from './components/Sidebar'
// import Player from './components/Player'
// import Display from './components/Display'
// import { PlayerContext } from './context/PlayerContext'

// const App = () => {


//   const {audioRef, track, songsData, albumsData} = useContext(PlayerContext);

  
//   useEffect(()=>{
//     console.log(track.file)
    
//   }, [track])

//   return (
//     <div className="h-screen bg-black">
//       {
//         songsData.length !== 0 
//         ? <>
//             <div className="h-[90%] flex">
//               <Sidebar />
//               <Display />
//             </div>
//             <Player />
//           </>
//         : null
//       }
      
//       <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>  {/* The preload='auto' attribute indicates that the browser should preload the audio file as soon as possible  */}
//     </div>
//   )
// }

// export default App


import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const { audioRef, track, songsData, albumsData } = useContext(PlayerContext);
  
  useEffect(() => {
    // Only try to access track.file if track exists
    if (track) {
      console.log(track.file);
    }
  }, [track]);

  return (
    <div className="h-screen bg-black">
      {
        songsData.length !== 0 
        ? <>
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>
            <Player />
          </>
        : null
      }
      
      {/* Only add audio element when track exists and has a file property */}
      {track && track.file ? (
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
      ) : null}
    </div>
  )
}

export default App