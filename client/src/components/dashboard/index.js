import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/hotel">Go To Hotel</Link>
    </div>
  );
};
