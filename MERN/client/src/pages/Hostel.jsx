import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hostel = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [mongoData, setMongoData] = useState([]);
  const [loadingMongoData, setLoadingMongoData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('/getAllUser');
        const usersData = await usersResponse.json();
        if (usersResponse.ok) {
          setAllUsers(usersData.data);
        } else {
          console.error(usersData.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }

      try {
        const mongoResponse = await fetch('/getAllUser');
        const mongoData = await mongoResponse.json();
        setMongoData(mongoData);
      } catch (error) {
        console.error('Error fetching MongoDB data:', error);
      } finally {
        setLoadingMongoData(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/admin">Home</Link></li>
          <li><Link to="/home">Scanner</Link></li>
          <li><Link to="/hostel">Members</Link></li>
        </ul>
      </nav>
      <div>
        <h1>All Users</h1>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {allUsers.map(User => (
              <li key={User._id}>
                <p>Name: {User.name}</p>
                <p>Email: {User.email}</p>
                {/* Add other user details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1>Data from MongoDB</h1>
        {loadingMongoData ? (
          <p>Loading MongoDB data...</p>
        ) : (
          <ul>
            {mongoData.map((item, index) => (
              <li key={index}>
                Name: {item.name}, Age: {item.age}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Hostel;
