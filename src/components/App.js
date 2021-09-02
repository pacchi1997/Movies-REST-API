import React,{useState ,useEffect ,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';


function App() {
 
const [movies ,setMovies] = useState([]);
const [ loading ,setLoading] =useState(false);
const [error ,setError] = useState(null);



const fetchMoviesHandler=useCallback( async ()=>{
    setLoading(true);
    setError(null);
    
    try{
      const response = await fetch('https://react-584ec-default-rtdb.firebaseio.com/movies.json/');
      
      if(!response.ok){
        throw new Error('somthing went wrrong!!!')
      }

     const data = await response.json();
     const loadedData = [];

     for(const key in data){
      loadedData.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,      
      })
     }
     setMovies(loadedData);

    } catch(err){
    setError(err.message)
    }
    setLoading(false);
  },[]);
  
async function addMovieHandler(movie){

  fetch("https://react-584ec-default-rtdb.firebaseio.com/movies.json",{

   method: 'POST',
   body : JSON.stringify(movie),
   headers: {
    'Content-Type': 'application/json'
   }
  });

}

useEffect(()=>{

  fetchMoviesHandler();
 

},[fetchMoviesHandler])

 let content = <p>Fetch for movies</p>
 
  if(movies.length > 0){
   content=<MoviesList movies={movies} />
 }
 if(loading && movies.length === 0){
   content = <p>No movie found</p>
 }
 if(error){
 content= <p>{error}</p>;
}
if(loading){
 content =<p>Loading...</p>
}




  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/> <br />
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
