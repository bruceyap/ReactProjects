import * as React from 'react';
import axios from 'axios';
import styles from "./App.module.css";
import SearchForm from './components/SearchForm';
import List from './components/List';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialState) => {
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  
  React.useEffect(() => {
    if(!isMounted.current){
      isMounted.current = true;
    }
    else{
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch(action.type)
  {
     case "STORIES_FETCH_INIT":
      return{
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return{
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return{
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return{
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);
  const [stories, dispatchStories] = React.useReducer(storiesReducer,{data:[], isLoading: false, isError: false});
  const handleFetchStories = React.useCallback(async()=>{
    dispatchStories({type: "STORIES_FETCH_INIT"});
  try{
    const result = await axios.get(url);
    dispatchStories({
      type: "STORIES_FETCH_SUCCESS",
      payload:result.data.hits, 
    });
  }catch{
    dispatchStories({
      type: "STORIES_FETCH_FAILURE"
    });
  }
},[url]);

  React.useEffect(()=>{
    handleFetchStories();
  },[handleFetchStories]);
  
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (event) =>{
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) =>{
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit}/>

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list = {stories.data}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};

export default App;
