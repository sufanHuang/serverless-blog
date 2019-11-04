import React, {Component} from "react";
import config from "../config";
import axios from "axios";
import to from "await-to-js"
import { Link } from "react-router-dom"



export default class Post extends Component{
    state ={
       post:{
           "id": "",
           "title": "",
           "author": "",
           "imageURL":"",
           "content": "",
           "createdAt": ""
       }
    }
    componentDidMount =async()=>{
        const  {id}  = this.props.match.params
        let [ error, result ] = await to (axios.get(`${config.apiGateway.URL}/posts/${id}`))
       // console.log(result.data)
        let post = result.data
        if (error){
            console.log(error)
        }
        return this.setState({post})
    }

    deletePost = async()=>{
        const  {id}  = this.props.match.params
        let [error] = await to (axios.delete(`${config.apiGateway.URL}/posts/${id}`))


        if(error){
            console.log('deleteItem has error',error)
        }

        return this.props.history.push("/")
    }
    changePage =()=>{
        this.props.history.push("/")
    }

    render(){
        const { id, title, author, imageURL, content, createdAt } = this.state.post
        return(
            <div className='App'>
                <div key = {id} >
                    <h3>{title}</h3>
                    <h5 className='heading'>{author}</h5>
                    <img src= {imageURL} alt={title} />
                    <h5>{content}</h5>
                    <button className='btn btn-danger post-buttons' onClick={this.deletePost}>Delete Post</button>
                    <button className='btn btn-secondary post-buttons'>
                        <Link to = {{
                            pathname: `/posts/${id}/edit`
                        }}
                        >Edit Post
                        </Link>
                    </button>
                    <button className='btn btn-info post-buttons' onClick={this.changePage}>Back to Home</button>

                </div>
            </div>
    )
    }
}
