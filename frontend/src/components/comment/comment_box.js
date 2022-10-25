import React from 'react';
import { updateComment, deleteComment, getCrawlComments } from '../../util/comment_api_util';
import "../../assets/stylesheets/comment.css";

class CommentBox extends React.Component {
     constructor(props){
        super(props)
        this.state={
            isEdit:false,
            id:null,
            bodyText:'',
            comments: this.props.comments
        }
        this.handleDelete = this.handleDelete.bind(this);
     }
    componentDidMount() {
        this.props.fetchUsers()
    }

    renderName = (user_id) => {
        let text = this.props.users?.data?.find((x) => x._id === user_id)?.username;
        text += ": "
        return text;
    };

handleDelete = async(id)=> {
    await deleteComment(id)
    .then(()=> this.setState({
        commentdeleted: true
    }))
    .then(()=>getCrawlComments(this.props.crawlId));

}

 handleInputChange = async(e,id,crawl_id,index)=>{
    //  console.log( e.target.value ,index );
     this.setState({indexCheck:index})
     var obj = {
        id:id,
        body:e.target.value,
        crawl_id:crawl_id,
        user_id:this.props.currentUser.id,
        indexCheck :null
     }

    await updateComment(obj)
  this.props.comments[index].body = e.target.value
}
    render() {
        const {comments, body, crawlId} = this.props
        // console.log("PropsComments=====>",this.props.crawlId)
        return (
            <div className='main-comment-container'>
                
                {body && crawlId === body.crawl_id && (
                    <div className='comment-container2'>
                <div className='each-comment'>
                    {this.renderName(body.user_id)}: 
                    {body.body}
                </div>
                </div>
                )}
                <div className='comment-container'>
                {(comments || []).map((item,index) => (
                    <div key={item._id} className="each-comment" style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                        {this.state.isEdit && item._id === this.state.id  ?
                         <input className='comment-edit-input' type = 'text' onChange={(e)=>this.handleInputChange(e,item._id,item.crawl_id,index)} defaultValue = {item.body}/>: 
                    (<div className='each-comment-inside'>
                        {this.renderName(item.user_id)}
                        {item.body}
                        </div>
                    )
                    }
                   {item.user_id == this.props.currentUser.id && this.state.indexCheck != index   && (
                    <div className='comment-edit' onClick={()=>this.setState({isEdit:!this.state.isEdit,id:item._id})} >
                    <img className="edit-icon" src="https://i.postimg.cc/mkny8198/edit-icon.png" alt="" />Edit</div>
                   )}

                    {item.user_id == this.props.currentUser.id && this.state.indexCheck != index   && (
                    <div className='comment-edit' onClick={()=>this.handleDelete(item._id)} >
                    <img className="edit-icon" src="https://i.postimg.cc/mkny8198/edit-icon.png" alt="" />Delete</div>
                   )}
                   
                    
                    {item.user_id == this.props.currentUser.id && this.state.indexCheck == index   && (
                    <div className='comment-edit' onClick={()=>this.setState({isEdit:!this.state.isEdit,id:item._id,indexCheck:null})} >Done</div>
                   )}
                </div>
            ))}
            </div>
        </div>
        );
    }
}

export default CommentBox;