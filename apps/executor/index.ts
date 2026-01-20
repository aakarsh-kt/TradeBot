import { WorkflowModel, mongoose, ExecutionModel } from "db/client"
import { execute } from "./execute";
type assetPrices = {

    symbol: string,
    price: string,
}

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("[backend] mongo connected");
    } catch (err) {
        console.error("[backend] mongo connect error:", err);
        process.exit(1);
    }

    while (true) {
        const workflows = await WorkflowModel.find({});
        workflows.map(async workflow => {
            const trigger = workflow.nodes.find(x => x.data?.kind === "TRIGGER");

            if (!trigger)
                return;

            switch (trigger.type) {
                case "price":
                    {
                        const price = trigger.data?.metadata.price;
                        const execution = await ExecutionModel.findOne({
                            workflowId: workflow.id
                        }).sort({
                            startTime: "desc"
                        })
                        const as = trigger.data?.metadata.asset;
                     
                        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${as}USDT`)
                        const res = (await response.json()) as assetPrices;
               
                        const realPrice = Number(res?.price);
                        if(!execution || realPrice<=price){

                            const execution = await ExecutionModel.create({
                                workflowId:workflow.id,
                                startTime:new Date(),
                                status:"PENDING"
                            })
                               await execute(workflow.nodes,workflow.edges);

                             execution.endTime= new Date();
                             execution.status="SUCCESS";

                             await execution.save();
                            }

                        break;

                    }
                case "timer":
                    {
                        const timeS = trigger.data?.metadata.time;
                        const execution = await ExecutionModel.findOne({
                            workflowId: workflow.id
                        }).sort({
                            startTime: "desc"
                        })

                        if (!execution || new Date(execution.startTime).getTime() < Date.now() - timeS * 1000) {

                            const execution = await ExecutionModel.create({
                                workflowId: workflow.id,
                                startTime: new Date(),
                                status: "PENDING"
                            })
                            await execute(workflow.nodes, workflow.edges);

                            execution.endTime = new Date();
                            execution.status = "SUCCESS";

                            await execution.save();
                        }


                        break;
                    }
            }
        })

        await new Promise(x => setTimeout(x, 2000));
    }
}
main();