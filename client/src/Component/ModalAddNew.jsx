import { useState } from "react";

export default function ModalAddNew({
  handleOpenModalAddNew,
  handleOnclickAddNew,
}) {
  let [productId, setProductId] = useState("");
  let [category, setCategory] = useState("");
  let [productName, setProductName] = useState("");
  let [cost, setCost] = useState("");

  let handleOnclickClose = () => {
    handleOpenModalAddNew();
  };

  let handleOnclickSaveChange = async () => {
    let productInfor = {
      productId,
      category,
      productName,
      cost,
    };
    handleOnclickAddNew(productInfor);
  };

  let handleOnchange = (e, type) => {
    if (type === "productId") {
      setProductId(e.target.value);
    }
    if (type === "category") {
      setCategory(e.target.value);
    }
    if (type === "productName") {
      setProductName(e.target.value);
    }
    if (type === "cost") {
      setCost(e.target.value);
    }
  };
  return (
    <>
      <div className="modal fade show  d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ADD NEW PRODUCT</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Product ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={productId}
                    onChange={(e) => handleOnchange(e, "productId")}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={category}
                    onChange={(e) => handleOnchange(e, "category")}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Product name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={productName}
                    onChange={(e) => handleOnchange(e, "productName")}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Cost:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={cost}
                    onChange={(e) => handleOnchange(e, "cost")}
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleOnclickClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnclickSaveChange}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
