// // import axios from "axios";

// // import { createContext, useEffect, useRef, useState } from "react";

// // export const PlayerContext = createContext();

// // const PlayerContextProvider = (props) => {
// //   const audioRef = useRef();
// //   const seekBg = useRef(); // This is the background of the seek bar -> Player.jsx
// //   const seekBar = useRef(); // This is the actual seek bar that moves when the audio is playing <hr/> -> Player.jsx

// //   const url = "https://spotify-backend-x05l.onrender.com/api";

// //   const [songsData, setSongsData] = useState([]);
// //   const [albumsData, setAlbumsData] = useState([]);

// //   const [track, setTrack] = useState(songsData[0]);
// //   const [playStatus, setPlayStatus] = useState(false);
// //   const [time, setTime] = useState({
// //     currentTime: {
// //       second: 0,
// //       minute: 0,
// //     },
// //     totalTime: {
// //       second: 0,
// //       minute: 0,
// //     },
// //   });

// //   const play = () => {
// //     audioRef.current.play();
// //     setPlayStatus(true);
// //   };

// //   const pause = () => {
// //     audioRef.current.pause();
// //     setPlayStatus(false);
// //   };

// //   const playWithId = async (id) => {
// //     await songsData.map((item) => {
// //       if (id === item._id) {
// //         setTrack(item);
// //       }
// //     });
// //     await audioRef.current.play();
// //     setPlayStatus(true);
// //   };

// //   const previous = async () => {
// //     songsData.map(async (item, index) => {
// //       if (track._id === item._id && index > 0) {
// //         await setTrack(songsData[index - 1]);
// //         await audioRef.current.play();
// //         setPlayStatus(true);
// //       }
// //     });
// //   };

// //   const next = async () => {
// //     songsData.map(async (item, index) => {
// //       if (track._id === item._id && index < songsData.length) {
// //         await setTrack(songsData[index + 1]);
// //         await audioRef.current.play();
// //         setPlayStatus(true);
// //       }
// //     });
// //   };

// //   const seekSong = async (e) => {
// //     // offsetX is the distance from the left of the seek bar to the click position
// //     audioRef.current.currentTime =
// //       (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
// //       audioRef.current.duration;
// //   };

// //   const getSongsData = async () => {
// //     try {
// //       const response = await axios.get(`${url}/song/list`);
// //       if (response.data) {
// //         setSongsData(response.data.songs);
// //         console.log("hi arnab")
// //         setTrack(response.data.songs[0]);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const getAlbumsData = async () => {
// //     try {
// //       const response = await axios.get(`${url}/album/list`);
// //       if(response.data){
// //           setAlbumsData(response.data.albums);

// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// // //   console.log(songsData);
// // //   // console.log(track.file);
// // //   console.log("yo ", track);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       audioRef.current.ontimeupdate = () => {
// //         // how much time has passed since the song started playing
// //         seekBar.current.style.width =
// //           Math.floor(
// //             (audioRef.current.currentTime / audioRef.current.duration) * 100
// //           ) + "%";

// //         setTime({
// //           currentTime: {
// //             second: Math.floor(audioRef.current.currentTime % 60),
// //             minute: Math.floor(audioRef.current.currentTime / 60),
// //           },
// //           totalTime: {
// //             second: Math.floor(audioRef.current.duration % 60),
// //             minute: Math.floor(audioRef.current.duration / 60),
// //           },
// //         });
// //       };
// //     }, 1000);
// //   }, [audioRef]);

// //   //     useEffect(() => {
// //   //     // Ensure audioRef.current exists before setting the event listener
// //   //     if (audioRef.current) {
// //   //         const updateTime = () => {
// //   //             // Check if duration is a valid number to avoid NaN
// //   //             if (!isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
// //   //                 seekBar.current.style.width =
// //   //                     (Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)) + "%";

// //   //                 setTime({
// //   //                     currentTime: {
// //   //                         second: Math.floor(audioRef.current.currentTime % 60),
// //   //                         minute: Math.floor(audioRef.current.currentTime / 60)
// //   //                     },
// //   //                     totalTime: {
// //   //                         second: Math.floor(audioRef.current.duration % 60),
// //   //                         minute: Math.floor(audioRef.current.duration / 60)
// //   //                     }
// //   //                 });
// //   //             }
// //   //         };

// //   //         // Set the event listener
// //   //         audioRef.current.ontimeupdate = updateTime;

// //   //         // Cleanup: Remove the event listener when the component unmounts or effect re-runs
// //   //         return () => {
// //   //             if (audioRef.current) {
// //   //                 audioRef.current.ontimeupdate = null;
// //   //             }
// //   //         };
// //   //     }
// //   // }, [audioRef]);

// //   useEffect(() => {
// //     getSongsData();
// //     getAlbumsData();
// //   }, []);

// //   const contextValue = {
// //     audioRef,
// //     seekBg,
// //     seekBar,
// //     track,
// //     setTrack,
// //     playStatus,
// //     setPlayStatus,
// //     time,
// //     setTime,
// //     play,
// //     pause,
// //     playWithId,
// //     previous,
// //     next,
// //     seekSong,
// //     songsData,
// //     albumsData,
// //   };

// //   return (
// //     <PlayerContext.Provider value={contextValue}>
// //       {props.children}
// //     </PlayerContext.Provider>
// //   );
// // };

// // export default PlayerContextProvider;

// import axios from "axios";
// import { createContext, useEffect, useRef, useState } from "react";

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {
//   const audioRef = useRef(null);
//   const seekBg = useRef(null);
//   const seekBar = useRef(null);

//   const url = "https://spotify-backend-x05l.onrender.com/api";

//   const [songsData, setSongsData] = useState([]);
//   const [albumsData, setAlbumsData] = useState([]);
//   const [track, setTrack] = useState(null);
//   const [playStatus, setPlayStatus] = useState(false);
//   const [time, setTime] = useState({
//     currentTime: {
//       second: 0,
//       minute: 0,
//     },
//     totalTime: {
//       second: 0,
//       minute: 0,
//     },
//   });

//   const play = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setPlayStatus(true);
//     }
//   };

//   const pause = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setPlayStatus(false);
//     }
//   };

//   const playWithId = async (id) => {
//     const foundTrack = songsData.find(item => id === item._id);
//     if (foundTrack) {
//       setTrack(foundTrack);
//       // Let the effect handle playing after track is set
//     }
//   };

//   const previous = () => {
//     const currentIndex = songsData.findIndex(item => track && track._id === item._id);
//     if (currentIndex > 0) {
//       setTrack(songsData[currentIndex - 1]);
//       // Let the effect handle playing after track is set
//     }
//   };

//   const next = () => {
//     const currentIndex = songsData.findIndex(item => track && track._id === item._id);
//     if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
//       setTrack(songsData[currentIndex + 1]);
//       // Let the effect handle playing after track is set
//     }
//   };

//   const seekSong = (e) => {
//     if (audioRef.current && seekBg.current && audioRef.current.duration) {
//       audioRef.current.currentTime =
//         (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
//         audioRef.current.duration;
//     }
//   };

//   const getSongsData = async () => {
//     try {
//       const response = await axios.get(`${url}/song/list`);
//       if (response.data && response.data.songs && response.data.songs.length > 0) {
//         setSongsData(response.data.songs);
//         setTrack(response.data.songs[0]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getAlbumsData = async () => {
//     try {
//       const response = await axios.get(`${url}/album/list`);
//       if (response.data && response.data.albums) {
//         setAlbumsData(response.data.albums);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Effect to handle playing audio when track changes
//   useEffect(() => {
//     if (track && audioRef.current) {
//       audioRef.current.play().then(() => {
//         setPlayStatus(true);
//       }).catch(error => {
//         console.error('Error playing audio:', error);
//       });
//     }
//   }, [track]);

//   // Effect to update time and seek bar
//   useEffect(() => {
//     const updateTimeAndSeek = () => {
//       if (audioRef.current && seekBar.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
//         seekBar.current.style.width =
//           Math.floor(
//             (audioRef.current.currentTime / audioRef.current.duration) * 100
//           ) + "%";

//         setTime({
//           currentTime: {
//             second: Math.floor(audioRef.current.currentTime % 60),
//             minute: Math.floor(audioRef.current.currentTime / 60),
//           },
//           totalTime: {
//             second: Math.floor(audioRef.current.duration % 60),
//             minute: Math.floor(audioRef.current.duration / 60),
//           },
//         });
//       }
//     };

//     if (audioRef.current) {
//       audioRef.current.addEventListener('timeupdate', updateTimeAndSeek);
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.removeEventListener('timeupdate', updateTimeAndSeek);
//       }
//     };
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     getSongsData();
//     getAlbumsData();
//   }, []);

//   const contextValue = {
//     audioRef,
//     seekBg,
//     seekBar,
//     track,
//     setTrack,
//     playStatus,
//     setPlayStatus,
//     time,
//     setTime,
//     play,
//     pause,
//     playWithId,
//     previous,
//     next,
//     seekSong,
//     songsData,
//     albumsData,
//   };

//   return (
//     <PlayerContext.Provider value={contextValue}>
//       {props.children}
//       {track && <audio ref={audioRef} src={track.file} preload="metadata" />}
//     </PlayerContext.Provider>
//   );
// };

// export default PlayerContextProvider;

import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const url = "https://spotify-backend-x05l.onrender.com/api";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const foundTrack = songsData.find(item => id === item._id);
    if (foundTrack) {
      setTrack(foundTrack);
      // Set playStatus to true to indicate intent to play
      setPlayStatus(true);
      
      // Try to play, but handle autoplay restrictions
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Autoplay prevented by browser policy:', error);
          // User will need to click play button manually
        }
      }
    }
  };

  const previous = () => {
    const currentIndex = songsData.findIndex(item => track && track._id === item._id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      // Let the effect handle playing after track is set
    }
  };

  const next = () => {
    const currentIndex = songsData.findIndex(item => track && track._id === item._id);
    if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      // Let the effect handle playing after track is set
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBg.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/song/list`);
      if (response.data && response.data.songs && response.data.songs.length > 0) {
        setSongsData(response.data.songs);
        setTrack(response.data.songs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/album/list`);
      if (response.data && response.data.albums) {
        setAlbumsData(response.data.albums);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Effect to handle track changes WITHOUT autoplay
  useEffect(() => {
    if (track && audioRef.current) {
      // Don't automatically play - just update the audio source
      // The play() function will be called explicitly after user interaction
      if (playStatus) {
        audioRef.current.play().then(() => {
          // Already in play state, no need to update
        }).catch(error => {
          console.error('Error playing audio:', error);
          setPlayStatus(false); // Reset play status if there's an error
        });
      }
    }
  }, [track, playStatus]);

  // Effect to update time and seek bar
  useEffect(() => {
    const updateTimeAndSeek = () => {
      if (audioRef.current && seekBar.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTimeAndSeek);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTimeAndSeek);
      }
    };
  }, []);

  // Initial data fetch
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      {/* Audio element has been moved to App.jsx to avoid duplication */}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;