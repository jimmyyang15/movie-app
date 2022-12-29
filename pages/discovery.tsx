import React, { useEffect, useState } from "react";
import Poster from "../components/Poster";
import { Movie } from "../interface";
import {
  getDiscoveryMovies,
  getDiscoveryTVs,
  getMovieAnimation,
  getMovieThriller,
  getTvAnimation,
} from "./api/movie";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { searchResultsState, searchState } from "../atoms/searchAtom";
import { mediaTypeState } from "../atoms/mediaTypeAtom";
import Head from "next/head";
import { useRouter } from "next/router";
import Search from "../components/Search";
import useUserBookmarks from "../hooks/useFavourites";
import Body from "../components/Body";

interface IDiscoveryMovies {
  discoveryMovies: Movie[];
  animationMovies: Movie[];
  thrillerMovies: Movie[];
  discoveryTvs: Movie[];
  animationTvs: Movie[];
}

const Discovery = ({
  discoveryMovies,
  animationMovies,
  thrillerMovies,
  discoveryTvs,
  animationTvs,
}: IDiscoveryMovies) => {
  const [searchResults, setSearchResults] =
    useRecoilState<any>(searchResultsState);
  // useEffect(()=>{
  //     setSearchResults(null);
  // },[])
  const router = useRouter();
  const [mediaType] = useRecoilState(mediaTypeState);


  const [bookmarkExists, setBookmarkExists] = useState<boolean>();

  return (
    <main>
      <Head>
        <title>Discover</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <h1 className="text-2xl  md:text-4xl text-white font-black text-center whitespace-nowrap ">
          Discover Movie Star
        </h1>
        <div className="md:hidden">
          <Search />
        </div>
        {searchResults && (
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl text-white font-bold">
              Search Results
            </h1>
            <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
              {searchResults?.map((movie: Movie) => (
                <Poster
                  key={movie.id}
                  movie={movie}
                  size="big"
                  type={mediaType}
                />
              ))}
            </div>
          </div>
        )}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl text-white font-bold">
            9+ rated movies of all time
          </h1>
          <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
            {discoveryMovies?.map((movie) => (
              <Poster
                key={movie.id}
                movie={movie}
                size="big"
                type="movie"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl text-white font-bold">
            Best TV Shows of all tiem
          </h1>
          <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
            {discoveryTvs?.map((movie) => (
              <Poster
                key={movie.id}
                movie={movie}
                size="big"
                type="tv-series"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl text-white font-bold">
            Animation{" "}
          </h1>
          <p>Movies</p>
          <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
            {animationMovies?.map((movie) => (
              <Poster
                key={movie.id}
                movie={movie}
                size="normal"
                type="movie"
              />
            ))}
          </div>
          <p>TV Shows</p>
          <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
            {animationTvs?.map((movie) => (
              <Poster
                key={movie.id}
                movie={movie}
                size="normal"
                type="tv-series"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl text-white font-bold">
            Thriller Movies
          </h1>
          <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-none rounded scrollbar-thumb-rounded-md">
            {thrillerMovies?.map((movie) => (
              <Poster
                key={movie.id}
                movie={movie}
                size="big"
                type="movie"
              />
            ))}
          </div>
        </div>
      </Body>
    </main>
  );
};

export const getStaticProps = async () => {
  const [
    discoveryMovies,
    animationMovies,
    thrillerMovies,
    discoveryTvs,
    animationTvs,
  ] = [
    await getDiscoveryMovies(),
    await getMovieAnimation(),
    await getMovieThriller(),
    await getDiscoveryTVs(),
    await getTvAnimation(),
  ];

  return {
    props: {
      discoveryMovies: discoveryMovies,
      animationMovies: animationMovies,
      thrillerMovies: thrillerMovies,
      discoveryTvs: discoveryMovies,
      animationTvs: animationTvs,
    },
  };
};

export default Discovery;
