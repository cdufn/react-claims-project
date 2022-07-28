// use the below as an example
/* import Song from './Song';
import {useState} from "react";

const SongList = () => {

    const initialSongs = [
        {title : 'Last thing on my mind', artist: 'steps', votes : 0},
        {title : 'If you\'re over me', artist: 'Years and years', votes : 0},
        {title : 'Top of the world', artist: 'Carpenters', votes: 0},
        {title: 'Sometimes', artist: 'Erasure', votes : 0}
    ];

    let [showAll, setShowAll] = useState(true);
    let [songs, setSongs] = useState(initialSongs);

    const addVote = (artist) => {
        let newSongs = songs.map( it => {
            if (it.artist === artist) {
                return {...it, votes: it.votes + 1};
            }
            else {
                return it;
            }
        });
        setSongs(newSongs);
    }

    // Version 1 - traditional syntax
    // const displaySongs = [];
    //
    // for (const [index, value] of songs.entries()) {
    //     displaySongs.push(<Song key={index} song={value} recordVote={addVote} />)
    // }

    //Version 1 - functional programming syntax
    // const displaySongs = songs.map ( (song, index) => {
    //     return (<Song key={index} song={song} recordVote={addVote} />);
    // });


    let [visible, setVisible] = useState(false);



    const toggleVisibility = () => {
        setVisible(!visible);
    }

    const toggleShowAll = () => {
        setShowAll(!showAll);
    }

    return (
        <div>
            <h2>Your favourite songs are:</h2>
            <button onClick={toggleVisibility}> {visible ? 'hide' : 'show'} songs</button>
            <ul style= {{display : visible ? 'block' : 'none'}}>
                {
                    /* version 1
                    {displaySongs} */
                }

                { /* version 2 */}
                {showAll &&
                    songs.map((song, index) => <Song key={index} song={song} recordVote={addVote}/>)
                }

                {!showAll &&
                    songs.filter(it => it.votes >=2).map((song, index) => <Song key={index} song={song} recordVote={addVote}/>)
                }

            </ul>
            <h3>Currently showing {showAll ? 'all' : '2 or more rated'} songs</h3>
            <button onClick={toggleShowAll}>Show {showAll ? 'all songs' : 'only songs with 2 or more votes'}</button>
        </div>
    );
};

export default SongList */