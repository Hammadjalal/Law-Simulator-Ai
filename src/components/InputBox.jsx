import { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    onSend(text);
    setText("");
  };

  const voice = () => {
    const sr = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    sr.lang = "en-IN";
    sr.start();

    sr.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };
  };

  return (
    <div style={styles.box}>
      <input
        style={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter legal scenario..."
      />

      <button style={styles.btn} onClick={send}>
        Send
      </button>

      <button style={styles.mic} onClick={voice}>
        🎤
      </button>
    </div>
  );
}

const styles = {
  box: {
    display: "flex",
    padding: 10,
    background: "#111827",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    outline: "none",
  },
  btn: {
    marginLeft: 10,
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: 8,
  },
  mic: {
    marginLeft: 8,
    background: "#22c55e",
    border: "none",
    padding: "10px",
    borderRadius: 8,
  },
};