import type React from "react";

interface ResultsCardProps {
  return: number;
  win_rate: number;
  trades: number;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  return: returnValue,
  win_rate,
  trades,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-dark-100">
        Performance Metrics
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Return</p>
          <p
            className={`text-2xl font-bold ${
              returnValue >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {returnValue}%
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Win Rate</p>
          <p className="text-2xl font-bold text-dark-100">{win_rate}%</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Trades</p>
          <p className="text-2xl font-bold text-dark-100">{trades}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
