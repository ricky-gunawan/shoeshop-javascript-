import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";

export default function Products() {
  const products = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts("/api/products"));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 m-4 place-items-start">
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
          <ProductCard img={product.img} name={product.name} price={product.price} />
        </Link>
      ))}
    </div>
  );
}
