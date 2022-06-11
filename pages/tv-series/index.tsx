import Head from 'next/head'
import React from 'react'
import Navbar from '../../components/Navbar'
import TVDashboard from '../../components/TVDashboard'
import { Cast, Movie } from '../../interface'
import { getAiringTodayTvShows, getOnTheAirTvShows, getTrendingTvShows, getTVCasts } from '../api/movie'

interface ITv {
    trendingTvShows:Movie[],
    airingToday:Movie[],
    onTheAir:Movie[],

}

const TVPage = ({ trendingTvShows,airingToday,onTheAir }:ITv) => {
 
  return (
    <main className=''>
        <Head>
            <title>TV Shows</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
         
         <TVDashboard trendingTvShows={trendingTvShows} airingToday={airingToday} onTheAir={onTheAir} />
    </main>
  )
}

export const getStaticProps = async() => {
    const [trendingTvShows,airingToday,onTheAir] =([await getTrendingTvShows(),await getAiringTodayTvShows(),await getOnTheAirTvShows()]);

    return {
        props:{
            trendingTvShows,
            airingToday,
            onTheAir,
          
        }
    }
}

export default TVPage