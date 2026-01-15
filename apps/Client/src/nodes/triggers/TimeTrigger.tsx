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
    <div className="min-w-48 rounded-md border bg-white px-4 py-3 text-smshadow-sm">
      <div className="mb-1 text-xs font-semibold uppercase text-red-600">
        Time Trigger
      </div>

      <div className="mt-1 text-black-700">After {data.metadata.time} seconds</div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      ></Handle>
    </div>
  );
}
