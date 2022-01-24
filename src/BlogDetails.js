import { useParams, useHistory } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, error, loading} = useFetch('https://blog-api-site.herokuapp.com/blogs/' + id);
    const history = useHistory()
    const handleDelete = () => {
        fetch('https://damp-coast-97320.herokuapp.com/https://blog-api-site.herokuapp.com/blogs/' + blog['id'], {
            method: "DELETE",
            headers: {"origin": "x-requested-with", "Host": "damp-coast-97320.herokuapp.com"}
        }).then(() => {
            history.push("/")
        })
    }

    return ( 
        <div className="blog-details">
            {loading && <div>loading...</div>}
            {error && <div>{error}</div>}
            {blog && (<article>
                <h2>{blog.title}</h2>
                <p>Written by - {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>delete</button>
            </article>)}
        </div>
     )
}

export default BlogDetails;