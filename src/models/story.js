const {schema,model, Schema} = require("mongoose")

const storySchema = new schema({
    story_id:Schema.Types.ObjectId,
    content:{
        url:String,
        expireAt: { type: Date,  expires: 86400 },
        createdAt:Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Story = model("Story",storySchema)
 module.exports = Story