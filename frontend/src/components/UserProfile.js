export default function UserProfile({ name = "bayuu", address = "jalan ilahi", password = "bersama123" }) {
  return (
    <table className="mt-28 bg-red-400">
      <tr className="">
        <td className="p-2 align-top">Name</td>
        <td className="w-4 p-2 align-top">:</td>
        <td className="p-2 align-top">{name}</td>
      </tr>
      <tr className="">
        <td className="p-2 align-top">Address</td>
        <td className="p-2 align-top">:</td>
        <td className="p-2 align-top">{address}</td>
      </tr>
      <tr className="">
        <td className="p-2 align-top">Password</td>
        <td className="p-2 align-top">:</td>
        <td className="p-2 align-top">{password}</td>
      </tr>
    </table>
  );
}
