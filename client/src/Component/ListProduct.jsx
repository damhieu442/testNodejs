import { useEffect, useState } from "react";
import axios from "axios";

import ModalAddNew from "./ModalAddNew";
import ModalDetailProduct from "./ModalDetailProduct";
import ModalEditProduct from "./ModalEditProduct";

export default function ListProduct() {
  let [productData, setProductData] = useState([]);
  let [categoryData, setCategoryData] = useState([]);
  let [openModalAddNew, setOpenModalAddNew] = useState(false);
  let [openModalDetail, setOpenModalDetail] = useState(false);
  let [productInfor, setProductInfor] = useState({});
  let [openModalEdit, setOpenModalEdit] = useState(false);
  let [key, setKey] = useState("");
  let [category, setCategory] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let userInfor = JSON.parse(localStorage.getItem("userTest"));
  let authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${userInfor.accessToken}`,
    },
  });

  let getAllProduct = async () => {
    try {
      let res = await authAxios.get("http://localhost:5000/get-all-product");
      if (res) {
        setProductData(res?.data?.data);
      } else {
        console.log("Get all product failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  let getAllCategory = async () => {
    try {
      let res = await authAxios.get("http://localhost:5000/get-all-category");
      if (res) {
        setCategoryData(res?.data?.arrCategory);
      } else {
        console.log("Get all category failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [refresh]);

  let handleOpenModalAddNew = () => {
    setOpenModalAddNew(!openModalAddNew);
  };

  let handleOpenModalDetail = (productInfor) => {
    setOpenModalDetail(!openModalDetail);
    setProductInfor(productInfor);
  };

  let handleOpenModalEdit = (productInfor) => {
    setOpenModalEdit(!openModalEdit);
    setProductInfor(productInfor);
  };

  let handleOnclickAddNew = async (productInfor) => {
    try {
      let res = await authAxios.post(
        "http://localhost:5000/add-new-product",
        productInfor
      );
      if (res) {
        console.log("Add new product success: ", res.data);
        setRefresh(!refresh);
      } else {
        console.log("Add new product failed!");
      }
      setOpenModalAddNew(!openModalAddNew);
    } catch (e) {
      console.log(e);
    }
  };

  let handleOnclickEdit = async (productInfor) => {
    try {
      let res = await authAxios.post(
        "http://localhost:5000/edit-product",
        productInfor
      );
      if (res) {
        console.log("Edit product success: ", res.data);
        setRefresh(!refresh);
      } else {
        console.log("Edit product failed!");
      }
      setOpenModalEdit(!openModalEdit);
    } catch (e) {
      console.log(e);
    }
  };

  let handleOnclickDelete = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        let res = await authAxios.post("http://localhost:5000/delete-product", {
          productId,
        });
        if (res) {
          console.log("Delete product success: ", res.data);
          setRefresh(!refresh);
        } else {
          console.log("Delete product failed!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  let handleOnchangeCategory = async (key) => {
    let arr = [...category];
    if (arr.includes(key)) {
      arr = arr.filter((item) => item !== key);
    } else {
      arr.push(key);
    }
    if (arr.length > 0) {
      try {
        let res = await authAxios.post(
          "http://localhost:5000/get-product-by-category",
          {
            arrCategory: arr,
          }
        );
        if (res) {
          console.log("Get product by category success: ", res.data);
          setProductData(res?.data?.data);
        } else {
          console.log("Get product by category failed!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      getAllProduct();
    }
    setCategory(arr);
  };

  let handleOnchangeSearch = async (e) => {
    let keyWord = e.target.value;
    setKey(keyWord);
    try {
      let res = await authAxios.post(
        "http://localhost:5000/get-product-by-search",
        {
          keyWord: keyWord,
        }
      );
      if (res && res.data && res.data.errCode === 0) {
        console.log("Get product by search success: ", res.data);
        setProductData(res?.data?.data);
      } else {
        console.log("Get product by search failed!");
        getAllProduct();
      }
    } catch (e) {
      console.log(e);
      getAllProduct();
    }
  };
  let arrCategory = categoryData.reduce((accumulator, element) => {
    if(accumulator.indexOf(element) === -1){
      accumulator.push(element)
    }
    return accumulator
  }, [])
  return (
    <>
      {openModalAddNew && (
        <ModalAddNew
          handleOpenModalAddNew={handleOpenModalAddNew}
          handleOnclickAddNew={handleOnclickAddNew}
        />
      )}
      {openModalDetail && (
        <ModalDetailProduct
          handleOpenModalDetail={handleOpenModalDetail}
          productInfor={productInfor}
        />
      )}
      {openModalEdit && (
        <ModalEditProduct
          handleOpenModalEdit={handleOpenModalEdit}
          productInfor={productInfor}
          handleOnclickEdit={handleOnclickEdit}
        />
      )}

      <h1 className="flex justify-center">LIST PRODUCT</h1>
      <div className="form-group col-12 flex justify-center my-4">
        <div className="input-group mb-3 col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter key"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={key}
            onChange={(e) => handleOnchangeSearch(e)}
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-success my-4 mx-8"
        onClick={handleOpenModalAddNew}
      >
        Add new
      </button>
      <div className="form-group mx-4 my-2 flex">
        {arrCategory &&
          arrCategory.map((item, index) => {
            return (
              <div key={index} className="form-check mx-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`check${index}`}
                  checked={category.includes(item)}
                  onChange={() => handleOnchangeCategory(item)}
                ></input>
                <label className="form-check-label" htmlfor={`check${index}`}>
                  {item}
                </label>
              </div>
            );
          })}
      </div>

      <table className="table mx-8">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product ID</th>
            <th scope="col">Category</th>
            <th scope="col">Product name</th>
            <th scope="col">Cost</th>
            <th scope="col">Feature</th>
          </tr>
        </thead>
        <tbody>
          {productData &&
            productData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.productId}</td>
                  <td>{item?.category}</td>
                  <td>{item?.productName}</td>
                  <td>{item?.cost}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary mx-2 px-3"
                      onClick={() => handleOpenModalDetail(item)}
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mx-2 px-3"
                      onClick={() => handleOpenModalEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => handleOnclickDelete(item.productId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
