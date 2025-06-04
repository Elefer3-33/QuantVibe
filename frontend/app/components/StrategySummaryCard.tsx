import type React from "react";

interface Condition {
  indicator: string;
  operator: string;
  value: string | number;
}

interface StrategySummaryProps {
  ticker: string;
  action: string;
  conditions: Condition[];
}

const StrategySummaryCard: React.FC<StrategySummaryProps> = ({
  ticker,
  action,
  conditions,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-dark-100">Strategy Summary</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Ticker:</span>
          <span className="bg-light-100 px-2 py-1 rounded text-dark-100">
            {ticker}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Action:</span>
          <span
            className={`px-2 py-1 rounded ${
              action === "buy"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {action.toUpperCase()}
          </span>
        </div>
        <div>
          <span className="font-semibold block mb-2">Conditions:</span>
          <ul className="list-disc pl-5 space-y-1">
            {conditions.map((condition, index) => (
              <li key={index} className="text-sm">
                {condition.indicator} {condition.operator} {condition.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrategySummaryCard;
