import {z} from "zod";

export const SignupSchema = z.strictObject({
    username:z.string().min(3).max(100),
    password:z.string().min(5)
})

export const SigninSchema = z.strictObject({
    username:z.string().min(3).max(100),
    password:z.string().min(5)
})
const nodesSchema=z.object({
    id:z.string(),
    type:z.string(),
    data:z.object({
        kind:z.enum(["ACTION","TRIGGER"]),
        metadata:z.any()
    }),
    position:z.object({
        x:z.number(),
        y:z.number()
    }),
    credentials:z.any()
})
const edgesSchema=z.object({
    id:z.string(),
    source:z.string(),
    target:z.string()
})
export const createWorkflowSchema= z.object({

    nodes:z.array(nodesSchema),
    edges:z.array(edgesSchema)
})
