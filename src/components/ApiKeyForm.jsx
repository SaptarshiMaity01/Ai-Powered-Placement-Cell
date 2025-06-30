import { useEffect } from "react";

const ApiKeyForm = ({ setApiKey }) => {
  // Your hardcoded API key (replace with your actual key)
  const hardcodedKey = "";

  // Automatically set the hardcoded key on component mount
  useEffect(() => {
    setApiKey(hardcodedKey);
  }, [setApiKey]);

  // Return null to render nothing
  return null;
};

export default ApiKeyForm;
