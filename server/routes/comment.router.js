const express= require('express');
const router = express.Router();
const {createComment, likeComment, deleteComment, editComment, getPostComments} = require('../controllers/comment.controller');
const { isAuth, isError } = require('../middleware/auth');

// you have to be authenticated(an user) for  comment 
// isAuth is to check the jwt token valid or not
router.post('/create',isAuth,createComment,isError);

//commentId is the request param to like / dislike the comment
//this endpoint is to like/dislike 
//authenticated route
router.post('/like/:commentId',isAuth,likeComment,isError);

//commentId is the request param to delete the comment
//this  endpoint is to delete particular comment 
//authenticated route
router.delete('/delete/:commentId',isAuth,deleteComment,isError);

//commentId is the request param to edit the comment
//this  endpoint is to edit particular comment 
//authenticated route
router.put('/edit/:commentId',isAuth,editComment,isError);

//postId is the requestParam to get comments for a post
//this is open for all
router.get('/get/:postId',getPostComments,isError);



module.exports = router;