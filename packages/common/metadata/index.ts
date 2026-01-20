export const Assets = [
  {
    asset: "SOL",
    price: 100
  },
  {
    asset: "BTC",
    price: 200
  },
  {
    asset: "ETH",
    price: 400
  }
];
export const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    desc: "Run this every x second/minutes."
  },
  {
    id: "price",
    title: "Price Trigger",
    desc: "Run this when price crosses the threshold."
  }
] as const;
export type allAssets = "ETH" | "BTC" | "SOL"
export type NodeType = "price" | "timer" | "hyperliquid" | "backpack" | "lighter";
export type Kind = "ACTION" | "TRIGGER";
export type PriceMetaData = {
  price: number,
  asset: string
}
export type TimerMetaData = {
  time: number,
}

export interface Edge {
  id: string,
  source: string,
  target: string

}

export interface Node_Type {
  type: NodeType,
  data: {
    kind: Kind,
    metadata: PriceMetaData | TimerMetaData | ActionNodeMetadata,
    label: string
  },
  id: string,
  position: { x: number, y: number },


}
export type holdingPos = "long" | "short"
export type ActionNodeMetadata = {
  id: string,
  pos: holdingPos,
  qty: number,
  asset: allAssets,
  service: string,
  url: string
  api_key: string
}
export const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    service: "Hyperliquid",
    url: "",
    pos: "long",
    asset: "BTC",
    qty: 0,
    api_key:""

  },
  {
    id: "backpack",
    service: "Backpack",
    url: "",
    pos: "long",
    asset: "BTC",
    qty: 0,
        api_key:""
  },
  {
    id: "lighter",
    service: "Lighter",
    url: "",
    pos: "long",
    asset: "BTC",
    qty: 0,
        api_key:""
  }
] as const;