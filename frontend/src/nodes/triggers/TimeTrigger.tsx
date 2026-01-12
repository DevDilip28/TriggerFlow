import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata = {
  time: number;
};

export function Timer({
  data,
  isConnectable,
}: {
  data: {
    metadata: TimerNodeMetadata;
  };
  isConnectable: boolean;
}) {
  return (
    <div className="min-w-40 rounded-md border bg-white px-4 py-3 text-sm shadow-sm">
      <div className="mb-1 font-medium text-gray-700">Time Trigger</div>
      <div>After {data.metadata.time} seconds</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      ></Handle>
    </div>
  );
}
