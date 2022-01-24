import useFetch from "./useFetch";
import BlogList from "./BlogList";
import { useEffect, useState } from "react"

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);
    const url = 'https://blog-api-site.herokuapp.com/blogs';
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal}).then(res => {
            if(!res.ok){
                console.log(res)
                throw Error('Failed to fetch data')
            }
            return res.json()
        }).then(data => {
            setBlogs(data)
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
    return ( 
        <div className="home">
            { error && <div>{error}</div> }
            {loading && <div className="loading">loading</div> }
            {blogs && <BlogList blogs={blogs} title="All blogs" />}
        </div>
    );
}

export default Home;