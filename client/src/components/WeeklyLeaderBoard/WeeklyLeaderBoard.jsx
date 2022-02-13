import React from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@apollo/client';
import { QUERY_WEEKLY_SCORES } from '../../utils/queries';
import { formatTime } from '../../utils/helpers';

const WeeklyLeaderBoard = () => {
    const { loading, data } = useQuery(QUERY_WEEKLY_SCORES);
    
    const leaderBoard = data?.weeklyScores.map(score => { return {wpm: score.wpm, accuracy: score.accuracy, username: score.username, date: formatTime(score.createdAt)} })

    return (
        <section  className='w-3/4 mx-auto my-4'>
            <h1 className='block text-center text-2xl underline'>Weekly Leaderboard</h1>
            <table className='table-auto mx-auto'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>WPM</th>
                        <th>User</th>
                        <th>Accuracy</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {leaderBoard ? (
                    <tbody>
                        {leaderBoard.map((score, i) => (
                            <tr key={uuid()}>
                                <td className='text-center p-2' key={uuid()}>{i + 1}</td>
                                <td className='text-center p-2' key={uuid()}>{score.wpm}</td>
                                <td className='text-center p-2' key={uuid()}>
                                    {i === 0 && 
                                        <img alt='1st place badge' className='inline m1' src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto.png"/>
                                    } {i === 1 && 
                                        <img alt='2nd place badge' className='inline m1' src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-2.png"/>
                                    } {i === 2 && 
                                        <img alt='3rd place badge' className='inline m1' src="https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/28/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-13.png"/>}
                                    <a href={`/profile/${score.username}`}>{score.username}</a>
                                </td>
                                <td className='text-center p-2' key={uuid()}>{score.accuracy}</td>
                                <td className='text-center p-2' key={uuid()}>{score.date}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    )
}

export default WeeklyLeaderBoard