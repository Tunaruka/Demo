import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    tags: [String],
    creator: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;