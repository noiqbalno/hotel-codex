import {Link} from "react-router-dom";


export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/resto">Go To Resto</Link>
        <Link to='/hr/department'>
            Go To HR
        </Link>
    </div>
  );
};