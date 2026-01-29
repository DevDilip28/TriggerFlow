import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }
})

const EdgesSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    }
}, {
    _id: false,
})

const PositionSchema = new Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
}, {
    _id: false,
})

const NodeDataSchema = new Schema({
    kind: {
        type: String,
        enum: ["Action", "Trigger"]
    },
    metadata: Schema.Types.Mixed,
})

const WorkflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    position: PositionSchema,
    credentials: Schema.Types.Mixed,
    nodeId: {
        type: mongoose.Types.ObjectId,
        ref: "Nodes",
    },
    data: NodeDataSchema,
}, {
    _id: false,
})

const WorkflowSchema = new Schema({
    UserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    nodes: [WorkflowNodeSchema],
    edges: [EdgesSchema],
})

const CredentialsTypeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        required: true,
    }
})

const NodeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Action", "Trigger"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    credentialsType: [CredentialsTypeSchema],
})

const ExecutionSchema = new Schema({
    workflowId: {
        type: mongoose.Types.ObjectId,
        ref: "workflows",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true,
    },
    startTime: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    endTime: {
        type: Date,
    }
})

export const UserModel = mongoose.model("Users", UserSchema);
export const WorkflowModel = mongoose.model("Workflows", WorkflowSchema);
export const NodeModel = mongoose.model("Nodes", NodeSchema);
export const ExecutionModel = mongoose.model("Executions", ExecutionSchema);
