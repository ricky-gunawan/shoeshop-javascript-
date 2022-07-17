import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { editProduct, getSingleProduct, setProductForm } from "../features/admin/adminSlice";

export default function AdminEditProduct() {
  const { product, isLoading } = useSelector((store) => store.admin);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleForm = (e) => {
    const elemName = e.target.name;
    const value = elemName === "price" ? priceStr(e.target.value) : e.target.type === "checkbox" ? e.target.checked : e.target.type === "file" ? e.target.files[0] : e.target.value;

    dispatch(setProductForm({ name: elemName, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let prop in product) {
      data.append(prop, product[prop]);
    }

    dispatch(editProduct(data));
    window.location.assign("/admin/products");
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">{productId === "add" ? "Add Product" : "Edit Product"}</div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-28 mb-10">
          <table className="mx-auto w-full max-w-screen-lg">
            <tbody>
              <tr>
                <td className="w-40">id</td>
                <td>:</td>
                <td>
                  <input
                    value={product._id}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="id"
                    id="admin_product_id"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td className="align-top">image</td>
                <td className="align-top">:</td>
                <td className="flex">
                  <div>
                    <input onChange={handleForm} required={product.img ? false : true} type="file" accept=".jpg,.jpeg,.png,.webp" name="image" id="admin_product_image" className="" />
                    {product.image && <img className="rounded-md mt-2" width={100} src={URL.createObjectURL(product.image)} title={product.image.name} alt={product.image.name} />}
                  </div>
                  {product.img && <img className="rounded-lg align-top" width={150} src={`/static/images/${product.img}`} title={product.name} alt={product.name} />}
                </td>
              </tr>
              <tr>
                <td>name</td>
                <td>:</td>
                <td>
                  <input value={product.name} onChange={handleForm} required type="text" name="name" id="admin_product_name" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>price</td>
                <td>:</td>
                <td>
                  <input value={product.price} onChange={handleForm} required type="text" name="price" id="admin_product_price" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>brand</td>
                <td>:</td>
                <td>
                  <input value={product.brand} onChange={handleForm} required type="text" name="brand" id="admin_product_brand" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>color</td>
                <td>:</td>
                <td>
                  <input value={product.color} onChange={handleForm} required type="text" name="color" id="admin_product_color" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>description</td>
                <td>:</td>
                <td>
                  <textarea value={product.description} onChange={handleForm} required name="description" id="admin_product_description" className="w-full h-20 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="save" className="rounded-md uppercase bg-green-500 mx-auto w-40 block text-center mt-8 py-1 cursor-pointer font-semibold text-neutral-50 hover:bg-green-600" />
        </form>
      )}
    </div>
  );
}

const priceStr = (str) => {
  const s = toNumber(str).toString();
  const a = s.split("").reverse().join("");
  const b = a.replace(/(.{3})/g, "$1.");
  const c = b.split("").reverse().join("");
  return c.charAt(0) === "." ? c.slice(1) : c;
};

const toNumber = (str) => {
  const newStr = str.replaceAll(".", "");
  return Number(newStr);
};
