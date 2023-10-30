import React, { useState, useEffect } from 'react';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardPointsPerMonth, setRewardPointsPerMonth] = useState({});

  const fetchTransactionData = () => {
    const mockTransactions = [
      { customerId: 1, amount: 120, date: '2023-07-10' },
      { customerId: 2, amount: 80, date: '2023-07-15' },
      { customerId: 1, amount: 75, date: '2023-08-05' },
      { customerId: 2, amount: 110, date: '2023-08-20' },
      { customerId: 1, amount: 90, date: '2023-09-02' },
    ];

    // Simulate an asynchronous delay to mimic API call
    setTimeout(() => {
      setTransactions(mockTransactions);
    }, 1000);
  };


  const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += (amount - 100) * 2;
      points += 50;
    } else if (amount > 50) {
      points += (amount - 50);
    }
    return points;
  };


  const calculateRewardPointsPerMonth = () => {
    const pointsPerMonth = {};

    transactions.forEach((transaction) => {
      const { customerId, amount, date } = transaction;
      const month = new Date(date).getMonth() + 1;
      const points = calculateRewardPoints(amount);

      if (!pointsPerMonth[customerId]) {
        pointsPerMonth[customerId] = {};
      }

      if (!pointsPerMonth[customerId][month]) {
        pointsPerMonth[customerId][month] = points;
      } else {
        pointsPerMonth[customerId][month] += points;
      }
    });

    setRewardPointsPerMonth(pointsPerMonth);
  };
  useEffect(() => {
    fetchTransactionData();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      calculateRewardPointsPerMonth();
    }
  }, [transactions]);

  return (
    <div>
      <h2>Reward Points Earned Per Customer Per Month</h2>
      <ul>
        {Object.keys(rewardPointsPerMonth).map((customerId) => (
          <li key={customerId}>
            <strong>Customer {customerId}:</strong>
            <ul>
              {Object.keys(rewardPointsPerMonth[customerId]).map((month) => (
                <li key={month}>
                  Month {month}: {rewardPointsPerMonth[customerId][month]} points
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardPointsCalculator;

