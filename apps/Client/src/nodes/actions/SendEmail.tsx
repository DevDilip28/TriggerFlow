import { Handle, Position } from "@xyflow/react";
import React from "react";
import { type SendEmailNodeMetadata } from "@triggerflow/common/types";

function SendEmail({
  data,
  isConnectable,
}: {
  data: {
    metadata: SendEmailNodeMetadata;
  };
  isConnectable: boolean;
}) {
  const { to, subject, body } = data.metadata;
  return (
    <div className="min-w-48 rounded-md border bg-white px-4 py-3 text-smshadow">
      <div className="mb-1 text-xs font-semibold uppercase text-blue-500">
        Send Email
      </div>

      <div className="mt-1 text-black-700">
        To: {to}
        <br />
        Subject: {subject}
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

export default SendEmail;
