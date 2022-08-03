import { useState } from "react";

export default function ModalEditProduct({
  handleOpenModalEdit,
  productInfor,
  handleOnclickEdit,
}) {
  let [productName, setProductName] = useState(productInfor.productName);
  let [cost, setCost] = useState(productInfor.cost);
  let handleOnclickClose = () => {
    handleOpenModalEdit();
  };

  let handleOnchange = (e, type) => {
    if (type === "productName") {
      setProductName(e.target.value);
    }
    if (type === "cost") {
      setCost(e.target.value);
    }
  };

  let handleOnclickSaveChange = () => {
    let data = {
      productId: productInfor.productId,
      productName,
      cost,
    };
    handleOnclickEdit(data);
  };

  return (
    <>
      <div className="modal fade show  d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDIT PRODUCT</h5>
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
                    disabled
                    value={productInfor?.productId}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    disabled
                    value={productInfor?.category}
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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
