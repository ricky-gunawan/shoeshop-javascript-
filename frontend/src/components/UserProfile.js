import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../features/user/userSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { name, email, address, token } = useSelector((store) => store.user.userInfo);
  const [editProfile, setEditProfile] = useState(false);
  const [form, setForm] = useState({ name, email, address, password_1: "", password_2: "" });
  const [passwordWarning, setPasswordWarning] = useState(null);
  const [emailWarning, setEmailWarning] = useState(null);

  const handleForm = (e) => {
    const elemName = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prevState) => ({ ...prevState, [elemName]: value }));
  };

  const handleSubmit = async (e) => {
    setPasswordWarning(null);
    setEmailWarning(null);
    e.preventDefault();
    if (form.password_1 === form.password_2) {
      try {
        const newProfile = await axios.patch("/api/user/edit", { name: form.name, email: form.email, password: form.password_1, address: form.address }, { headers: { authorization: `Bearer ${token}` } });
        dispatch(setUserInfo(newProfile.data));
        window.location.reload();
      } catch (error) {
        if (error.response.status === 400) {
          setEmailWarning("The email has been used, use another email");
        } else if (error.response.status === 500) {
          alert("server error, try again later");
        } else {
          alert("error, try again later");
        }
      }
    } else {
      setPasswordWarning("Make sure the passwords are match!");
    }
  };
  return (
    <div className="relative mt-28 ml-4 p-4 border border-slate-300 max-w-sm">
      <form onSubmit={handleSubmit}>
        <table className="mx-2 w-fit mb-2">
          <tbody>
            <tr className="">
              <td className="w-20 p-2">Name</td>
              <td className="w-4 p-2">:</td>
              <td className="p-2 capitalize">
                <input
                  value={form.name}
                  onChange={handleForm}
                  disabled={!editProfile}
                  type="text"
                  name="name"
                  id="edit_name"
                  className="w-full rounded-sm disabled:bg-slate-200 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </td>
            </tr>
            <tr className="">
              <td className="w-20 p-2">Email</td>
              <td className="p-2">:</td>
              <td className="p-2">
                <input
                  value={form.email}
                  onChange={handleForm}
                  disabled={!editProfile}
                  type="email"
                  name="email"
                  id="edit_email"
                  className="w-full rounded-sm disabled:bg-slate-200 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                />

                {emailWarning && <div className="mx-auto text-red-500 text-sm w-fit">{emailWarning}</div>}
              </td>
            </tr>
            <tr className="">
              <td className="w-20 p-2 align-top">Address</td>
              <td className="p-2 align-top">:</td>
              <td className="p-2">
                <textarea
                  value={form.address}
                  onChange={handleForm}
                  disabled={!editProfile}
                  name="address"
                  id="edit_address"
                  className="w-full h-20 mb-4 rounded-sm disabled:bg-slate-200 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </td>
            </tr>
            <tr className="">
              <td className="w-20 p-2">{editProfile ? "New Password" : "Password"}</td>
              <td className="p-2">:</td>
              <td className="p-2">
                <input
                  value={form.password_1}
                  onChange={handleForm}
                  disabled={!editProfile}
                  type="password"
                  name="password_1"
                  id="edit_password_1"
                  className="w-full rounded-sm disabled:bg-slate-200 disabled:placeholder:text-black placeholder:text-white border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="*********"
                />
              </td>
            </tr>
            <tr className={editProfile ? "" : "hidden"}>
              <td className="p-2">Repeat Password</td>
              <td className="p-2">:</td>
              <td className="p-2">
                <input
                  value={form.password_2}
                  onChange={handleForm}
                  disabled={!editProfile}
                  type="password"
                  name="password_2"
                  id="edit_password_2"
                  className="w-full rounded-sm disabled:bg-slate-200 border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                />
                {passwordWarning && <div className="mx-auto text-red-500 text-sm w-fit">{passwordWarning}</div>}
              </td>
            </tr>
          </tbody>
        </table>
        <input className={`${editProfile ? "" : "invisible"} ml-28 mb-8 rounded-md uppercase bg-green-500 px-2 py-1 cursor-pointer font-semibold text-neutral-50 hover:bg-green-600`} type="submit" value="Save" />
      </form>
      <button className="uppercase absolute right-0 bottom-0 m-4 w-[4.5rem] text-center py-1 rounded-md bg-cyan-400 p-2 font-semibold text-neutral-50 hover:bg-cyan-500" onClick={() => setEditProfile((prevState) => !prevState)}>
        {editProfile ? "cancel" : "edit"}
      </button>
    </div>
  );
}
