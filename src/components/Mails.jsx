import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useToast } from "rc-toastr";

const Mails = () => {
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const logout = useCallback(() => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }, [dispatch, navigate]);

  const exit = useCallback(
    (error) => error.response.status === 406 && logout(),
    [logout]
  );

  useEffect(() => {
    (async () => {
      const res = await axios.get("https://mail-chat-app-backend-production.up.railway.app/mails").catch(exit);
      setMails(res.data);
    })();
  }, [exit]);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const res = await axios.get("https://mail-chat-app-backend-production.up.railway.app/mails").catch(exit);
        setMails(res.data);
        if (res.data.some(({ isRead }) => !isRead))
          toast.success("You have unread message!");
      })();
    }, 10000);
    return () => clearInterval(interval);
  }, [exit, mails, toast]);

  return (
    <div>
      <h1 className="title">Mail</h1>
      <h2 className="subtitle">List of mails</h2>
      <div className="columns has-background-black mb-5">
        <div className="column is-size-5 has-text-centered has-text-white">
          From
        </div>
        <div className="column is-size-5 has-text-centered has-text-white">
          Date
        </div>
        <div className="column is-size-5 is-8 has-text-centered has-text-white">
          Title
        </div>
      </div>
      <div className="is-hoverable is-fullwidth">
        <div className="columns is-flex-direction-column-reverse">
          {mails?.map((mail) => (
            <Mail key={mail.uuid} {...mail} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Mail = ({ uuid, from, createdAt, title, text, isRead }) => {
  const [show, setShow] = React.useState(false);
  const [isRed, setIsRed] = React.useState(false);
  const handleClick = async () => {
    setShow(!show);
    if (!isRead && !isRed) {
      setIsRed(true);
      await axios.post("https://mail-chat-app-backend-production.up.railway.app/isred", {
        isRead: true,
        uuid,
      });
    }
  };

  return (
    <div className="columns has-background-white mb-5">
      <div className="column is-size-5 has-text-centered"> {from}</div>
      <div className="column is-size-5 has-text-centered">{createdAt}</div>
      <div className="column is-8 has-text-left">
        <button
          className="button is-white is-size-5 is-fullwidth"
          onClick={handleClick}
        >
          {title}
        </button>
        {show && <div>{text}</div>}
      </div>
    </div>
  );
};

export default Mails;
