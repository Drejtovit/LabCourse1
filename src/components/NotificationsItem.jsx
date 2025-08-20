export default function NotificationsItem({ image, message, time }) {
  return (
    <div className="notification-item">
      <div className="thums">
        <img src={image} alt="" />
      </div>
      <div className="text-left">
        <p>{message}</p>
        <span className="time"><i className="lni-alarm-clock"></i>{time}</span>
      </div>
    </div>
  );
}