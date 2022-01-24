import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal}).then(res => {
            if(!res.ok){
                console.log(res)
                throw Error('Failed to fetch data')
            }
            return res.json()
        }).then(data => {
            setData(JSON.parse(data))
            setloading(false)
            setError(null)
        }).catch(e => {
            if (e.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                setloading(false)
                setError(e.message);
            }
        })
        return () => abortCont.abort();
    }, [url]) 

    return {
        data, loading, error
    }
}

export default useFetch;