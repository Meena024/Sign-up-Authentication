import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/Auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    //add validation
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAdGYjLFC5DIrMp-l1ZEpgi-d1ntGdDqt0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //assumption: Always successful

      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
          autoComplete="off"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
