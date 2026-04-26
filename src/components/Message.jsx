export default function Message({ msg, onSpeak }) {
  return (
    <div className={`msg ${msg.role}`}>
      <div className="bubble">

        <div className="text">{msg.text}</div>

        <div className="actions">
          <button onClick={() => navigator.clipboard.writeText(msg.text)}>
            📋
          </button>

          <button onClick={() => onSpeak(msg.text)}>
            🔊
          </button>
        </div>

      </div>
    </div>
  );
}