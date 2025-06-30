import { Switch } from "../../components/ui/switch";
import { useState } from "react";

const StatusBadge = ({ isActive, onToggle }) => {
  const [status, setStatus] = useState(isActive);

  const handleToggle = (checked) => {
    setStatus(checked);
    if (onToggle) {
      onToggle(checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={status} onCheckedChange={handleToggle} />
      <span className={`text-sm font-medium ${status ? 'text-success' : 'text-danger'}`}>
        {status ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};

export default StatusBadge;
