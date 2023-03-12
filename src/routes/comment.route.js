const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/comment.controller');
const { validateBody } = require("../validators/validatorBody");
const { validateParams } = require("../validators/validatorParams");
const authenticateToken = require('../middlewares/auth.middleware');
const adminAuthorization = require("../middlewares/adminPriviledges.middleware");


const { getCommentUnderPostitUnderUserSchema, getCommentUnderPostitSchema, commentIdSchema, paginationSchema, commentSchema, getCommentSchema, getAllPostitCommentsSchema, searchPostitForCommentSchema, searchPostitForCommentSchemaParam, getAllDeletedCommentsSchema, getAllUserDeletedCommentsSchema, editCommentSchema, postitIdSchema } = require("../validators/schemas/comment.schema");

//documentation redirect
commentRouter.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioZ');
});

// CREATE //////////////////////////////////////////////////////////////
//Create comment
commentRouter.post("/:postitId", [validateParams(postitIdSchema), validateBody(commentSchema), authenticateToken], commentController.comment);


// READ //////////////////////////////////////////////////////////////

//Get a particular comment with its comment ID
commentRouter.get("/single/:commentId", [validateParams(getCommentSchema), authenticateToken], commentController.getParticularComment);

//get all deleted comments [admin]
commentRouter.get("/deleted/:pagination", [validateParams(paginationSchema), authenticateToken, adminAuthorization], commentController.getAllDeletedComments);

//Use text to search for comments under a particular postit (just to practice searching) [admin]
commentRouter.get("/search/:postitId/:pagination", [validateParams(searchPostitForCommentSchemaParam), validateBody(searchPostitForCommentSchema), authenticateToken, adminAuthorization], commentController.searchPostitComments);

//Get all deleted comments under a particular postit [admin]
commentRouter.get("/postit-deleted/:postitId/:pagination", [validateParams(getAllDeletedCommentsSchema), authenticateToken, adminAuthorization], commentController.getAllDeletedCommentsForPostit);

//Get all comments deleted by a particular user [admin]
commentRouter.get("/user-deleted/:userId/:pagination", [validateParams(getAllUserDeletedCommentsSchema), authenticateToken, adminAuthorization], commentController.getAllUserDeletedComments);








//Get all comments by a particular user
commentRouter.get("/user-all/:userId/:pagination", [validateParams(getAllUserDeletedCommentsSchema), authenticateToken], commentController.getAllUserComments);

//get a particular comment under a particular postit
commentRouter.get("/:postitId/:commentId", [validateParams(getCommentUnderPostitSchema), authenticateToken], commentController.getCommentUnderPostit);

//get a particular comment under a particular postit under a particular user
commentRouter.get("/:userId/:postitId/:commentId", [validateParams(getCommentUnderPostitUnderUserSchema), authenticateToken], commentController.getCommentUnderPostitUnderUser);










//get all comments that are not deleted [admin]
commentRouter.get("/:pagination", [validateParams(paginationSchema), authenticateToken, adminAuthorization], commentController.getAllComments);

//Get all comments for a particular postit
commentRouter.get("/:postitId/:pagination", [validateParams(getAllPostitCommentsSchema), authenticateToken], commentController.getAllCommentsForPostit);


// UPDATE //////////////////////////////////////////////////////////////
// Update a particular comment
commentRouter.patch("/:commentId", [validateParams(commentIdSchema), validateBody(editCommentSchema), authenticateToken], commentController.editComment);


// DELETE //////////////////////////////////////////////////////////////
//Delete a particular comment
commentRouter.delete("/:commentId", [validateParams(commentIdSchema), authenticateToken], commentController.deleteComment);


module.exports = commentRouter;