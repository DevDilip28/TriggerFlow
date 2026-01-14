import { Handle, Position } from "@xyflow/react";
import React from "react";

export type SendWhatsappNodeMetadata = {
  to: string;
  body: string;
};

function SendWhatsapp({
  data,
  isConnectable,
}: {
  data: {
    metadata: SendWhatsappNodeMetadata;
  };
  isConnectable: boolean;
}) {
  const { to, body } = data.metadata;
  return (
    <div className="min-w-48 rounded-md border bg-white px-4 py-3 text-smshadow">
      <div className="mb-1 text-xs font-semibold uppercase text-blue-500">
        Send Whatsapp
      </div>

      <div className="mt-1 text-black-700">
        To: {to}
        <br />
        Body: {body}
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

export default SendWhatsapp;
