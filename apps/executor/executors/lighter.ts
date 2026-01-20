export async function execute(asset:"SOL"|"BTC"|"ETH",qty:number, type:"LONG"|"SHORT", apiKey:string){
    console.log(`Executing trade on Lighter to ${type} for ${asset} quantity ${qty} ` );
}