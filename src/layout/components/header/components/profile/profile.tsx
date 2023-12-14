import React from 'react'
import './profile.scss'
import { Space, Typography } from 'antd';

const { Text, Link } = Typography;


const Profile = () => {
  return (
    <div className={"profile"}>
      <div className={"profile__mock"} />
      <div className={"profile__info"}>
        <Text>Mostafa</Text>
        <Text>user34@gmail.com</Text>
      </div>
    </div>
  );
};

export default Profile
