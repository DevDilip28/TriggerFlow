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
    <div className="min-w-48 rounded-md border bg-white px-4 py-3 text-smshadow-sm">
      <div className="mb-1 text-xs font-semibold uppercase text-red-600">
        Price Trigger
      </div>

      <div className="mt-1 text-black-700">
        When {data.metadata.asset} reaches {data.metadata.price}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}
