export default function AdminNav() {
  return (
    <>
      <a href="/admin/products">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Products</div>
      </a>
      <a href="/admin/users">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Users</div>
      </a>
      <a href="/admin/orders">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Orders</div>
      </a>
      <a href="/admin/carts">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Carts</div>
      </a>
    </>
  );
}
