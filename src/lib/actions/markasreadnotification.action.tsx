'use server';

export default async function markAsReadNotification(notificationIds : string[]) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjk1Y2NlY2RlMzY0ZWY2MTQwNDUyYzQ4Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjgwNjA2NjV9.EzzZAvpOIPxe2SNS58EHAkzDkqxD2Z7jS6n-kq7cuo0"; 

  const res = await fetch(`https://flower.elevateegy.com/api/v1/notifications/mark-read`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({notificationIds})
  });

  const payload = await res.json();
  return payload;
}