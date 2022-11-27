import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendMail = () => {
  const [to, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://mail-chat-app-backend-production.up.railway.app/send",
        {
          to,
          from: user.name,
          title,
          text,
        }
      );
      navigate("/mails");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Send mail</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={sendMail}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    required
                    type="text"
                    className="input"
                    value={to}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <label className="label">Title</label>
                <div className="control">
                  <input
                    required
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <label className="label">Body</label>
                <div className="control">
                  <textarea
                    required
                    type="text"
                    className="textarea is-large"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write some text"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
