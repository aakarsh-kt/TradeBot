import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import { NodesModel, UserModel, WorkflowModel } from "db/client";
import { createWorkflowSchema, SigninSchema, SignupSchema } from "common/types";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import cors from "cors";
const JWT_SECRET = process.env.JWT_SECRET!;
// mongoose.connect(process.env.MONGO_URL!);
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());


async function main() {
    console.log("[backend] booting...");

    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("[backend] mongo connected");
    } catch (err) {
        console.error("[backend] mongo connect error:", err);
        process.exit(1);
    }

    app.listen(3000, () => {
        console.log("[backend] listening on http://localhost:3000");
    });
}

main();
app.post("/signup", async (req, res) => {
    const { success, data } = SignupSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Incorrect inputs"
        })
        return
    }
    try {
        const user = await UserModel.create({
            username: data.username,
            password: data.password
        })

        res.json({
            id: user._id
        })
    } catch (e) {
        res.status(411).json({
            message: "Username already taken"
        })

    }

})
app.get("/user",authMiddleware, async (req,res)=>{
    const userId=req.userId;
    try{
        const user= await UserModel.findOne({
            _id:userId
        })

        if(user != null){
            res.json({
                username:user?.username
            })
            
        }
    }catch(e){
        res.status(500).json({
            message:"No User found"
        })
    }
})
app.post("/signin", async (req, res) => {
    const { success, data } = SigninSchema.safeParse(req.body);
    console.log(data);
    if (!success) {
        res.status(403).json({
            message: "Invalid login credentials"
        })
        return
    }
    console.log("Signing In");
    const user = await UserModel.findOne({
        username: data?.username,
        password: data?.password
    })
    if (user && user.id != null) {
        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET)
        return res.json({
            id: user.id,
            token
        })
    }
    else {
        return res.status(403).json({
            message: "No user found for this username and password"
        })
    }


})
app.post("/workflow", authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const { success,error, data } = createWorkflowSchema.safeParse(req.body);
    console.log(data);
    console.log(req.body);
    if (!success) {
        console.log(error)
        res.status(403).json({
            message: "Invalid workflow data"
        })
        return
    }
    try {
        const workflow = await WorkflowModel.create({
            userId: userId,
            nodes: data.nodes,
            edges: data.edges
        })

        res.json({
            id: workflow._id
        })
    }
    catch (e) {
        res.status(403).json({
            message: "There was some error in creating the workflow"
        })
    }

})
app.put("/workflow", authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const { success, data } = createWorkflowSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Invalid workflow data"
        })
        return
    }
    try {
        const workflow = await WorkflowModel.findOneAndUpdate({
            userId: userId,
            nodes: data.nodes,
            edges: data.edges
        })
        if (workflow) {
            res.json({
                id: workflow._id
            })
        }
        else {
            res.status(500).json({
                message: "No workflow found for this id"
            })
        }

    }
    catch (e) {
        res.status(403).json({
            message: "There was some error in creating the workflow"
        })
    }

})
app.get("/workflow/:workflowId", authMiddleware, async (req, res) => {
    const workflowId = req.params.workflowId
    const userId = req.userId!
    
    try {
        const workflow = await WorkflowModel.findOne({
            _id: workflowId ,
            userId
          
        })
        console.log(workflow);
        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found",
            })
        }

        return res.json({ workflow })
    } catch (e) {
        return res.status(500).json({
            message: "Failed to fetch workflow",
        })
    }
})
app.get("/workflow/executions/:workflowId", (req, res) => {

})
app.get("/getWorkflows", authMiddleware, async(req,res)=>{
    const userId = req.userId!;
    try{
        const workflows= await WorkflowModel.find({
            userId:userId
        });

        return res.json({ workflows });
    }catch(e){
        return res.status(500).json({
            message:"No workplaces found"
        })
    }
})
app.get("/nodes", authMiddleware, async (req: Request, res: Response) => {

    try {
        const nodes = await NodesModel.find({});
        return res.json({ nodes });
    } catch (e) {
        return res.status(500).json({
            message: "Failed to fetch nodes",
        })
    }
})
