import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Body from '../../components/Body'
import Poster from '../../components/Poster'
import ReviewCard from '../../components/ReviewCard'
import useFavourites from '../../hooks/useFavourites'
import { Cast, Movie, MovieDetails, MovieReview } from '../../interface'
import { getTrendingMovies,getNowPlaying,getTopRated,getPopular, getMovieDetails, getRecommendations, getCredits, getSimilar, getReviews } from '../api/movie'

interface IMovieDetails {
    movieDetails:MovieDetails;
    movieRecommendations:Movie[],
    movieCasts:Cast[],
    movieSimilar:Movie[],
    movieReviews:MovieReview[]
}

const MovieDetailsPage = ({ movieDetails,movieRecommendations,movieCasts,movieSimilar,movieReviews }:IMovieDetails) => {

    const [showMoreCasts,setShowMoreCasts] = useState<boolean>(false);
    const [showMoreRecommendations,setShowMoreRecommendations] = useState<boolean>(false);

    useEffect(()=>{
        setShowMoreRecommendations(false);
        setShowMoreCasts(false);
    },[]);

    const { userFavourites,addFavourite,deleteFavourite } = useFavourites(movieDetails);


  return (
    <Body>
     
        <Head>
            <title>{movieDetails.title}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
     
        <div className='relative'>
            <Image alt={movieDetails.title} src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} width="100%" height={50} layout="responsive" objectFit='cover'  />
            <div className=' w-[90%] px-2  py-2 md:py-4  -mt-20 text-white backdrop-sepia-0 bg-black/30 rounded-lg mx-auto space-y-2'>
                <div className='flex justify-between items-center'>
                    <h1 className=' text-lg md:text-xl font-semibold'>{movieDetails.title}</h1>
                    <BiHeart size={24} className="cursor-pointer" />
                </div>
                <div className='flex gap-2 items-center'>
                    <p className='font-bold'>Genres:</p>
                    {movieDetails.genres.map((genre,i)=>(
                        <p key={genre.id} className="text-sm md:text-base">
                            {!(i === movieDetails.genres.length - 1) ? genre.name + "," : genre.name}
                        </p>
                    ))}
                </div>
                <div>
                    <p className='font-bold'>Duration: <span className='font-normal text-sm md:text-base'>{movieDetails.runtime} minutes</span></p>
                </div>
                <div>
                    <p className='font-bold'>Rating: <span className='font-normal text-sm md:text-base'>{movieDetails.vote_average}</span></p>
                </div>
            </div>
        </div>
        <div className='text-gray-500 px-4 md:px-8 py-2 md:py-4 space-y-6'>
            <div>
                <h1 className='text-xl font-bold'>Plot</h1>
                <p className='text-sm md:text-base'>
                    {movieDetails.overview}
                </p>
            </div>
            <div className='space-y-2'>
                <h1 className='text-xl font-bold'>Casts</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
                    {movieCasts.slice(0,showMoreCasts ? 15 : 6).map((cast)=>(  
                        <div key={cast.id}  className='flex flex-col space-y-2 '>
                            <Image  alt={cast.name} src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}  width={150} objectFit="cover" height={200} className="rounded-md mb-2" />
                            <div>
                                <p className='text-white text-sm md:text-base'>{cast.name}</p>
                                <p className='truncate text-sm md:text-base'>{cast.character}</p>
                            </div>
                            
                     
                        </div>
                      
                    ))}
                    
                </div>
                <p className='cursor-pointer whitespace-nowrap mx-auto w-16' onClick={()=>setShowMoreCasts(!showMoreCasts)}>{showMoreCasts ? "Show less" : "Show more"}</p>
            </div>
            <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg md:text-xl font-bold'>Recommendations for you</h1>
                    <p className='cursor-pointer whitespace-nowrap' onClick={()=>setShowMoreRecommendations(!showMoreRecommendations)}>{showMoreRecommendations ? "Show less" : "Show more"}</p>

                </div>
                <div className='row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-rounded-md'>
                    {movieRecommendations.slice(0,showMoreRecommendations ? 12 : 2).map((movie)=>(
                        <Poster type="movie" key={movie.id} movie={movie} size="big"   />
                    ))}
                </div>
                    
            </div>
            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>Similar Movies</h1>
                    {/* <p className='cursor-pointer' onClick={()=>setShowMoreRecommendations(!showMoreRecommendations)}>{showMoreRecommendations ? "Show less" : "Show more"}</p> */}

                </div>
                <div className="row  scrollbar-thumb-gray-800 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-rounded-md">
                    {movieSimilar.map((movie)=>(
                        <Poster key={movie.id} movie={movie} size="normal" type="movie"  />
                    ))}
                </div>
            </div>  
            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>Reviews</h1>
                    {/* <p className='cursor-pointer' onClick={()=>setShowMoreRecommendations(!showMoreRecommendations)}>{showMoreRecommendations ? "Show less" : "Show more"}</p> */}
                </div>
                {movieReviews.length !== 0 ? (
                    <div className='space-y-8 divide-y divide-gray-500'>
                        {movieReviews.map((review)=>(
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ):(
                    <p>No reviews</p>
                )}
                
                <div>
                  
                </div>
            </div>
            
        </div>
        
     
        

    </Body>
  )
}

export const getStaticPaths = async() => {
    const [trendingMovies,nowPlayingMovies,topRatedMovies,popularMovies] = ([await getTrendingMovies(),await getNowPlaying(),await getTopRated(),await getPopular()]);

    const trendingIds = trendingMovies.map((movie:Movie)=>movie.id);
    const nowPlayingIds= nowPlayingMovies.map((movie:Movie)=>movie.id);
    const topRatedIds = topRatedMovies.map((movie:Movie)=>movie.id);
    const popularIds = popularMovies.map((movie:Movie)=>movie.id);

    const ids = [...trendingIds,...nowPlayingIds,...topRatedIds,...popularIds];

    const paths = ids.map((id)=>({
        params:{
            movieId:id.toString()
        }
    }))
    
    return {
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps = async({ params }:any) => {
    const [movieDetails,movieRecommendations,movieCasts,movieSimilar,movieReviews] = ([await getMovieDetails(params.movieId),await getRecommendations(params.movieId),await getCredits(params.movieId),await getSimilar(params.movieId),await getReviews(params.movieId,"movie")])
    
    return {
        props:{
            movieDetails,
            movieRecommendations,
            movieCasts,
            movieSimilar,
            movieReviews
        }
    }

}


export default MovieDetailsPage