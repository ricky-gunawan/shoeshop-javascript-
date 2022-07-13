import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getSingleProduct, setFormEdit } from "../features/admin/adminSlice";

export default function AdminEditProduct() {
  const { product, isLoading } = useSelector((store) => store.admin);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleForm = (e) => {
    const elemName = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    dispatch(setFormEdit({ name: elemName, value }));
  };

  // useEffect(() => {
  //   dispatch(getSingleProduct(productId));
  // }, [dispatch, productId]);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">{productId ? "Edit Product" : "Add Product"}</div>
      {false ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form className="mt-28">
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
                <td>image</td>
                <td>:</td>
                <td>
                  <input value={product.img} onChange={handleForm} type="text" name="img" id="admin_product_img" className="w-full my-2 text-ellipsis rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>name</td>
                <td>:</td>
                <td>
                  <input value={product.name} onChange={handleForm} type="text" name="name" id="admin_product_name" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>price</td>
                <td>:</td>
                <td>
                  <input value={product.price} onChange={handleForm} type="text" name="price" id="admin_product_price" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>brand</td>
                <td>:</td>
                <td>
                  <input value={product.brand} onChange={handleForm} type="text" name="brand" id="admin_product_brand" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>color</td>
                <td>:</td>
                <td>
                  <input value={product.color} onChange={handleForm} type="text" name="color" id="admin_product_color" className="w-full my-2 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>description</td>
                <td>:</td>
                <td>
                  <textarea value={product.description} onChange={handleForm} name="description" id="admin_product_description" className="w-full h-20 rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
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
