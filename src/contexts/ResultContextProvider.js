import React, {createContext, useContext, useState} from 'react';

const ResultContext = createContext();

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {

    const [results,setResults] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('React js');

    const getResults = async (type) => {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}${type}`,{
            method : 'GET',
            headers : {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': '9bb0a4c093msh78dfac466a805f6p1cbceajsn82cf6591d341',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
        });
        

        const data= await response.json();
        console.log(data)

        if(type.includes('/news')){
                setResults( data.entries);
        }else if(type.includes('/image')){
            setResults( data.image_results);
        }else{
            setResults( data.results);
        }
        setIsLoading(false);
    }

    return <ResultContext.Provider value={{getResults, results,searchTerm,setSearchTerm, isLoading}}>
        {children}
    </ResultContext.Provider>

}

export const useResultContext = () => useContext(ResultContext)