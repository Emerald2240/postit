const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/comment.controller');
const {validateBody} = require("../validators/validatorBody");
const {validateParams} = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware')
const adminAuthorization = require("../middlewares/adminPriviledges.middleware")

const { commentIdSchema, commentSchema, getCommentSchema, getAllPostitCommentsSchema, searchPostitForCommentSchema, getAllDeletedCommentsSchema, getAllUserDeletedCommentsSchema, editCommentSchema } = require("../validators/schemas/comment.schema");

// CREATE //////////////////////////////////////////////////////////////
//Create comment
commentRouter.post("/", [validateBody(commentSchema), authenticateToken], commentController.comment);


// READ //////////////////////////////////////////////////////////////
//Get all comments for a particular postit
commentRouter.get("/:postitId/:pagination", [validateParams(getAllPostitCommentsSchema), authenticateToken], commentController.getAllCommentForPostit);

//Get a particular comment with its comment ID
commentRouter.get("/comment/:commentId", [validateParams(getCommentSchema), authenticateToken], commentController.getParticularComment);

//Use text to search for comments under a particular postit (just to practice searching) [admin]
commentRouter.get("/search/:postitId/:pagination", [validateBody(searchPostitForCommentSchema), authenticateToken, adminAuthorization], commentController.searchPostitComments);

//Get all deleted comments under a particular postit [admin]
commentRouter.get("/postit-deleted/:postitId/:pagination", [validateParams(getAllDeletedCommentsSchema), authenticateToken, adminAuthorization], commentController.getAllDeletedCommentsForPostit);

//Get all comments deleted by a particular user [admin]
commentRouter.get("/user-deleted/:userId/:pagination", [validateParams(getAllUserDeletedCommentsSchema), authenticateToken, adminAuthorization], commentController.getAllUserDeletedComments);



// UPDATE //////////////////////////////////////////////////////////////
// Update a particular comment
commentRouter.patch("/", [validateParams(commentIdSchema), validateBody(editCommentSchema), authenticateToken], commentController.editComment);


// DELETE //////////////////////////////////////////////////////////////
//Delete a particular comment
commentRouter.delete("/" [validateParams(commentIdSchema), authenticateToken], commentController.deleteComment);


module.exports = commentRouter;