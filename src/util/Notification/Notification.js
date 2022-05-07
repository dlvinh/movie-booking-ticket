import { Button, notification, Space } from 'antd';

export const openNotificationWithIcon = (type,message,description,position) => {
  notification[type]({
    message: message,
    description:description,
    placement: position
  });
};