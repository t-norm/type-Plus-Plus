// Imports
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import Game from '../components/Game';
import GlobalLeaderBoard from '../components/GlobalLeaderBoard';
import RecentBadge from '../components/RecentBadge/RecentBadge';
import Auth from '../utils/auth';
import Highscore from '../components/Highscore';
import UpcomingBadge from '../components/UpcomingBadge/UpcomingBadge';

const Home = () => {
    const [runGame, setRunGame] = useState(false);
    const [sampleArr, setSampleArr] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getText();
        };
        fetchData();
        if (Auth.loggedIn()) {
            setLoggedIn(true);
        }
    }, []);

    // Get random text
    const getText = async () => {
        const response = await fetch('/api/txtgen');
        let data = await response.text();
        let tmpArr = data.split('');
        setSampleArr(tmpArr);
        return;
    };

    const startGame = () => {
        document.getElementById('welcome-text').classList.add('hidden');
        setTimeout(() => {
            setRunGame(true);
        }, 250);
    };

    const endGame = () => {
        setRunGame(false);
        document.getElementById('welcome-text').classList.remove('hidden');
    };

    return (
        <main className="flex-grow flex flex-col content-around justify-evenly items-center text-gray-700 dark:text-gray-400 dark:bg-gray-800 transition duration-200">
            {/* Intro text */}
            <section className="container px-3" id="welcome-text">
                <p className="p-2 text-justify">
                    Welcome to Type++! Looking to test out your overpriced
                    custom keyboard? Wanna show off how much faster you can type
                    than your buddies? Need to find out your words-per-minute
                    speed for a job application? You’ve come to the right place!
                </p>
                <p className="p-2 text-justify">
                    Hit “Start Game” below to take a typing-speed test. If you
                    really want to experience everything Type++ has to offer,
                    though, create an account first – you’ll be able to save
                    your WPM and accuracy scores, track your improvement over
                    time, follow friends, compete in our leaderboards, and more!
                </p>
            </section>
            <section className="m-4">
                {!runGame && (
                    <button
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="flex items-center justify-between px-6 py-2.5 text-gray-800 hover:text-gray-300 bg-gray-300 hover:bg-gray-600 font-medium uppercase rounded shadow-sm hover:shadow-md focus:shadow-lg transition duration-300 ease-in-out"
                        onClick={startGame}
                    >
                        Start Game
                        <ArrowCircleRightIcon className="h-5 w-5 m-1 inline" />
                    </button>
                )}
                {runGame && (
                    <>
                        <div
                            id="sampleText"
                            className="hidden m-4 mx-auto w-3/4"
                        >
                            {sampleArr.length !== 0 ? (
                                sampleArr.map((char, i) => (
                                    <span
                                        key={uuid()}
                                        id={i}
                                        className="text-2xl"
                                    >
                                        {char}
                                    </span>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <Game
                            sampleArr={sampleArr}
                            unmount={endGame}
                            loggedIn={loggedIn}
                        />
                    </>
                )}
            </section>
            <div className="grid grid-cols-3 container">
                <div>
                    <GlobalLeaderBoard displayCount={5} runGame={runGame} />
                </div>
                <div className="my-4 flex flex-col">
                    {loggedIn && (
                        <h1 className="block text-center text-2xl underline text-gray-600 dark:text-gray-300">
                            Badge Progress
                        </h1>
                    )}
                    <div className="flex flex-grow justify-around text-gray-600 dark:text-gray-400 my-6">
                        {loggedIn && <RecentBadge runGame={runGame} />}
                        {loggedIn && <UpcomingBadge runGame={runGame} />}
                    </div>
                </div>
                {loggedIn && <Highscore runGame={runGame} />}
            </div>
        </main>
    );
};

export default Home;
