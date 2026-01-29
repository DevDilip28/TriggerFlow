import { Handle, Position } from "@xyflow/react";
import { type ExecuteTradeNodeMetadata } from "@triggerflow/common/types";

function ExecuteTrade({
  data,
  isConnectable,
}: {
  data: {
    metadata: ExecuteTradeNodeMetadata;
  };
  isConnectable: boolean;
}) {
  const { tradeType, qty, symbol, platform } = data.metadata;

  return (
    <div className="min-w-48 rounded-md border bg-white px-4 py-3 text-smshadow">
      <div className="mb-1 text-xs font-semibold uppercase text-blue-500">
        Execute Trade
      </div>

      <div className="mt-1 text-black-700">
        {tradeType.charAt(0).toUpperCase() + tradeType.slice(1)} {qty} {symbol} on {platform}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ExecuteTrade;
