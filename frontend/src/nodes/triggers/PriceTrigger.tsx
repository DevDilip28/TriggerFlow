import { Handle, Position } from "@xyflow/react";

export type PriceNodeMetadata = {
  asset: string;
  price: number;
};

export function Price({
  data,
  isConnectable,
}: {
  data: {
    metadata: PriceNodeMetadata;
  };
  isConnectable: boolean;
}) {
  return (
    <div className="min-w-40 rounded-md border bg-white px-4 py-3 text-sm shadow-sm">
      <div className="mb-1 font-medium text-gray-700">Price Trigger</div>
      <div>When {data.metadata.asset} reaches {data.metadata.price}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      ></Handle>
    </div>
  );
}
