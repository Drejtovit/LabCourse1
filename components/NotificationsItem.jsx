export default function NotificationsItem({message, time }) {
  return (
    <div className="notification-item">
      <div className="text-left">
        <p>{message}</p>
        <span className="time"><i className="lni-alarm-clock"></i>{time}</span>
      </div>
    </div>
  );
}