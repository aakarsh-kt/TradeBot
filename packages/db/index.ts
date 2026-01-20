import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true            
        }
    }
)


const PositionSchema = new Schema({
    x:{
        type:Number,
        required:true
    },
    y:{
        type:Number,
        required:true
    }
})
const NodeDataSchema = new Schema ({
    
        
        kind:{
            type:String,
            enum:["ACTION","TRIGGER"]
        },
        metadata:Schema.Types.Mixed,
        
     
},{
    _id:false
})
const EdgesSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    }
})
const WorkflowNodeSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    position:PositionSchema,
    credentials:{
        type: Schema.Types.Mixed
    },
    type:{
        type:String,
        enum:["price","timer", "hyperliquid" , "backpack" , "lighter"],
        required:true
    },
    nodeId:{
        type:mongoose.Types.ObjectId,
        ref:"Nodes"
    },
    data:NodeDataSchema
    })

const WorkflowSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    nodes:[WorkflowNodeSchema],
    edges:[EdgesSchema]
})
const CredentialsTypesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    
    required:{
        type:Boolean,
        required:true
    },
})
const NodesSchema = new Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     type:{
        type:String,
        enum:['ACTION',"TRIGGER"],
        required:true
     },
     credentialsType:[CredentialsTypesSchema]
})

const ExecutionSchema = new Schema({
    workflowId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Workflows'
    },
    status:{
        type:String,
        enum:["PENDING","SUCCESS","FAILURE"]
    },
    startTime:{
        type:Date,
        default:Date.now()
    },
    endTime:{
        type:Date
    }
})
export const WorkflowModel = mongoose.model("WorkflowSchema",WorkflowSchema);
export const UserModel = mongoose.model("Users",UserSchema);
export const NodesModel = mongoose.model("Nodes",NodesSchema);
export const ExecutionModel = mongoose.model("Executions",ExecutionSchema);
export {mongoose};