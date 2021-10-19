import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        // console.log(postMessage);
        res.status(200).json(postMessage);

        } catch (error) {
            res.status(404).json({ message: error.message})
    }
}

export const createPost = async (req, res ) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save()

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updatePost = async (req, res ) => {
    //extract id
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    console.log('EDITED');
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new : true});
    res.json(updatedPost);
}

export const deletePost = async ( req, res ) => {
    //extract id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id)

    console.log('DELETED');    
    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res ) => {
    //extract id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    console.log('LIKED');
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount : post.likeCount + 1 }, { new : true});
    res.json(updatedPost);
}