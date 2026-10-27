import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
// import { User } from './user.Models'

const videoSchema = new mongoose.Schema
(
    {
        videoFile: {
            type: String, // cloudnary url
            requred: true
        },

        thumbnail: {
            type: String, // cloudnary url
            requred: true
        },

        title: {
            type: String, 
            requred: true
        },

        description: {
            type: String, 
            requred: true
        },

        duration: {
            type: Number,
            requred: true
        },

        views: {
            type: Number,
            default: 0
        },

        isPublished: {
            type: Boolean,
            default: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }




    },
    {
         timestamps: true
        }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)