import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('user1')
    const [loading, setLoading] = useState(false);
    const his = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const blog = {title, body, author};
        setLoading(true)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setLoading(false)
            his.push("/")
        })

    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Blog body:</label>
                <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                <label>Blog Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="user1">user1</option>
                    <option value="user2">user2</option>
                </select>
                {!loading && <button type="submit">Add blog</button>}
                {loading && <button type="submit" disabled>Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;