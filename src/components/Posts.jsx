import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addSomeData, fetchPosts, getLoading, getPostsErrorMessage, getPostserrorStatus, resetFetchPosts, selectAllPosts } from '../redux/features/postsSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const Posts = () => {

    const dispatch = useDispatch();

    const checkInitialState = useSelector((state) => state.posts);
    console.log("checkInitialState", checkInitialState)

    const posts = useSelector(selectAllPosts);
    const errorStatus = useSelector(getPostserrorStatus);
    const errorMessage = useSelector(getPostsErrorMessage);
    const loading = useSelector(getLoading);

    useEffect(() => {
        dispatch(fetchPosts({ test: "test" }))
    }, [dispatch])

    return (
        <div>
            <h2 style={{ color: "#990011FF" }} >Posts</h2>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }} >
                <Button variant="contained" onClick={() => dispatch(resetFetchPosts())} >Reset</Button>
                <Button variant="contained" color="success" onClick={() => dispatch(addSomeData())} >
                    Add some Data
                </Button>
            </div>

            {loading ? <h4>...Loading</h4> : errorStatus ? <h4>{errorMessage}</h4> : (
                <div>
                    {posts?.map(item => (
                        <Card variant="outlined" key={item.id} style={{ textAlign: "center", maxWidth: "max-content", margin: "auto", marginTop: "10px", background: "#422057FF", color: "#FCF951FF" }} >
                            <CardContent>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >

                                    <h3>ID: {item.id}</h3>
                                    <h3>user ID: {item.userId}</h3>
                                </div>

                                <h2> Title: {item.title}</h2>
                                <h5>{item.body.substring(0, 100)}</h5>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Posts