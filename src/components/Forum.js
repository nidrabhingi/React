import React,{Component, useEffect, useRef, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import options, {charts, apiResultInput} from '../config';

function Forum()
{
    
    const [userId, setUserId] = useState(0);
    const [postId, setPostId] = useState(0);
    const [albumId, setAlbumId] = useState(0);
    const [todoId, setTodoId] = useState(0);
    // const [isPosts, setIsPosts] = useState(true);
    const [tabName, setTabName] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [comments, setComments] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState();
    const [albumIndex, setAlbumIndex] = useState();
    
    useEffect(()=> {
        getPosts();
    },[])

    const getPosts = () => {
        if(posts.length > 0) {
            setTabName('posts');
            return;
        }else{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPosts(json);
                setFilteredPosts(json);
                setTabName('posts');
            });
        }
    };
    const handlePostClick = (event,itrIndex) => {
        setIndex(itrIndex);
    }
    const handleDisplayComments = (postId, itrIndex) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setComments(json);
                setIndex(itrIndex);
            });
    }
    const getAlbums = () => {
        if(albums.length > 0) {
            setTabName('albums');
            return;
        }else{
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setAlbums(json);
                setFilteredAlbums(json);
                setTabName('albums');
            });
        }
    }
    const getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setUsers(json);
                setTabName('users');
            });
    }
    const getTodos = () => {
        if(todos.length > 0) {
            setTabName('todos');
            return;
        }else{
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTodos(json);
                setFilteredTodos(json);
                setTabName('todos');
            });
        }
    }
    const handleUserClick = (event, id)=>{
        if(event.target.checked){
            setUserId(id);
            if(id>0){
                const ps= posts.filter(post => post.userId == id);
                setFilteredPosts(ps);
                const as= albums.filter(album => album.userId == id);
                setFilteredAlbums(as);
                const ts= todos.filter(todo => todo.userId == id);
                setFilteredTodos(ts);

            }
            else{
                setFilteredPosts(posts);
                setFilteredAlbums(albums);
                setFilteredTodos(todos);
            }
        }
        else{
            setUserId(0);
            setFilteredPosts(posts);
            setFilteredAlbums(albums);
            setFilteredTodos(todos);
        }

    }
    const handleAlbumClick = (albumId, albumIndex)=>{
        if(albumId > 0){
            fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPhotos(json);
                setAlbumId(albumId);
                setAlbumIndex(albumIndex);
            });
        }
        else{
            setPhotos([]);
            setAlbumId(0);
            setAlbumIndex();
        }

    }
    const handleDisplayAlbumPhotos = (albumId, itrIndex) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPhotos(json);
            });
    }
    const handleTodoClick = (event, id)=>{
        if(event.target.checked)
            setTodoId(id);
        else
            setTodoId(0);

    }
    return (
        <>
            <div className='container-fluid m-2'>
                {/* <input type="button" className='btn btn-primary' onClick={getPosts} value="Posts"></input> */}
                <div className='row clearfix'>
                    <div className='col-10 float-left'><h1 className='text-primary'>Learning</h1></div>
                    <span className='col-2 float-end'>
                        <ul className="nav nav-pills">
                            <li className='nav-item dropdown'>
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Site Options</a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        Profile
                                    </li>
                                    <li  className="dropdown-item">
                                        Logout
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        
                    </span>
                </div>
                <hr></hr>
                {/* <!-- Nav tabs --> */}
                <ul className="nav nav-tabs">
                    <li className="nav-item" onClick={getUsers}>
                        <a className={(tabName == 'users')?"nav-link active":"nav-link"} data-bs-toggle="tab" href="#users">Users</a>
                    </li>
                    <li className="nav-item" onClick={getPosts}>
                        <a className={(tabName == 'posts')?"nav-link active":"nav-link"} data-bs-toggle="tab" href="#accordion">Posts{filteredPosts && filteredPosts.length > 0 ? ` (${filteredPosts.length})`:``}</a>
                    </li>
                    <li className="nav-item" onClick={getAlbums}>
                        <a className="nav-link" data-bs-toggle="tab" href="#albums">Albums{filteredAlbums && filteredAlbums.length > 0 ? ` (${filteredAlbums.length})`:``}</a>
                    </li>
                    <li className="nav-item" onClick={getTodos}>
                        <a className="nav-link" data-bs-toggle="tab" href="#todos">Todos{filteredTodos && filteredTodos.length > 0 ? ` (${filteredTodos.length})`:``}</a>
                    </li>
                </ul>
                    {(tabName == 'posts') ? 
                        <div id="accordion" className='bg-grey m-3'>
                        {/* <div>total: {posts.length}</div> */}
                        {filteredPosts && filteredPosts.length > 0 ?
                            filteredPosts.map((post, itrIndex) => 
                                <div className="card m-2">
                                    <div className="card-header">
                                        <span className="btn" data-bs-toggle="collapse" href={`#collapse${itrIndex}`} onClick={() => {handleDisplayComments(post.id, itrIndex); setIndex(itrIndex)}} >
                                            {post.title}
                                        </span>
                                        <input type="button" value="C" className='btn btn-primary' ></input>
                                    </div>
                                    <div id="collapseOne" className={(itrIndex == index)?"collapse show":"collapse"} 
                                        data-bs-parent="#accordion">
                                        <div className="card-body">
                                            {post.body}
                                        </div>
                                        {
                                            comments.length > 0 ? 
                                                comments.map((comment,commentIndex) => 
                                                    <div className='m-4'>
                                                        <p><i>Comment:</i> {comment.body}</p>
                                                        <p className='small small small small'><i>Name:</i> {comment.name}</p>
                                                        <p className='small small small small'><i>Email:</i> {comment.email}</p>
                                                        <hr></hr>
                                                    </div>
                                                )
                                            : <p>No comments!</p>
                                        }
                                    </div>
                                </div>
                            )
                            : (tabName == 'posts')?<h1>No posts!</h1>:''
                        }
                    </div> 
                    : (tabName == 'users') ?
                        <div className='container-flid p-3'>
                            {users.map((user, index) => 
                                <div id="users" className='row clearfix'>
                                    <div className='col-1 float-middle'>
                                        <input type="checkbox" onClick={(event) => handleUserClick(event,user.id)} 
                                            checked={(userId > 0 && userId ==user.id) ? true:false}></input></div>
                                    <div className='col-1 float-end'>{index+1}</div>
                                    <div className='col-2 float-end'>{user.username}</div>
                                    <div className='col-8 float-start'>{user.name}</div>
                                </div> 
                            )}
                        </div>
                    : (tabName == 'albums') ? 
                        <div id="albums" className='bg-grey m-3'>
                            {filteredAlbums && filteredAlbums.length > 0 ?
                                filteredAlbums.map((album, itrIndex) => 
                                    <>
                                        <div className="card m-2">
                                            <div className="card-header">
                                                <span className="btn" data-bs-toggle="collapse" href={`#collapse${itrIndex}`} onClick={() => {handleAlbumClick(album.id, itrIndex); setAlbumIndex(itrIndex)}} >
                                                    {album.title}
                                                </span>
                                            </div>
                                        </div>
                                        <div id="collapseOne" className={(albumIndex == itrIndex)?"collapse show":"collapse"} 
                                            data-bs-parent="#albums">
                                            <div className="card-body">
                                                {album.title}  
                                            </div>
                                            <div className='m-4'>
                                                {
                                                    photos && photos.length > 0 ?
                                                    <div className='container-fluid'>
                                                        {photos.map(photo => <img src={photo.url} alt="image" style={{width:50, height:50}}/>)}
                                                    </div>:<h1>No Photos!</h1>
                                                }
                                            </div>
                                        </div>
                                    </>
                                ): <h1>No albums!</h1>
                            }
                        </div>
                    :   <div className='container-flid p-3'>
                            {filteredTodos && filteredTodos.length > 0 ?
                                filteredTodos.map(task => 
                                    <div id="todos" className='row clearfix'>
                                        <div className='col-1 float-middle'>
                                            <input type="checkbox" onClick={(event) => handleTodoClick(event,task.id)} 
                                                checked={(todoId > 0 && todoId ==task.id) ? true:false}></input></div>
                                        <div className='col-1 float-end'>{task.id}</div>
                                        <div className='col-10 float-start'>{task.title}</div>
                                    </div> 
                            ):<h1>No Todos!</h1>}
                        </div>
                    }
            </div>
        </>
    );
}

export default Forum;