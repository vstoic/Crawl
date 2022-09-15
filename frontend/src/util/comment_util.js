import axios from "axios";

export const fetchAllComments = () => {
    return axios.get("/api/comments/");
};

export const fetchComment = (id) => {
    return axios.get(`/api/comments/${id}`);
};

export const updateComment = (comment) => {

    return axios.patch(`/api/comments/${comment.id}`, comment);
};

export const createComment = async (commentData) => {
    let create_comment = await axios.post("/api/comments", commentData);
    console.log("CommentAll=======>", create_comment);
    return create_comment;
};

export const deleteComment = async (id) => {
    let commentById = await axios.delete(`/api/comments/${id}`);
    return commentById;
};

export const getCommentByCrawl = async (crawlId) => {
    let getComment = await axios.get(`/api/crawls/users/${crawlId}`);
    console.log("Data=========>", getComment)
    return getComment;
}