import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalDetailProduct({
  handleOpenModalDetail,
  productInfor,
}) {
  let [rate, setRate] = useState(1);
  let [averageRate, setAverageRate] = useState("");

  let handleOnclickClose = () => {
    handleOpenModalDetail();
  };
  let userInfor = JSON.parse(localStorage.getItem("userTest"));

  let authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${userInfor.accessToken}`,
    },
  });

  let getAverageRate = async () => {
    try {
      let res = await authAxios.post("http://localhost:5000/get-rate", {
        productId: productInfor?.productId,
      });
      if (res && res.data && res.data.errCode === 0) {
        setAverageRate(res.data.averageRate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAverageRate();
  }, []);

  let handleOnchangeRate = (e) => {
    setRate(parseInt(e.target.value));
  };

  let handleOnclickSendRate = async () => {
    let data = {
      productId: productInfor.productId,
      userName: userInfor.userName,
      rate: rate,
    };
    try {
      let res = await authAxios.post("http://localhost:5000/send-rate", data);
      if (res && res.data && res.data.errCode === 0) {
        console.log(res.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
    handleOpenModalDetail();
  };

  return (
    <>
      <div className="modal fade show  d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">DETAIL PRODUCT</h5>
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
                    Category:
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
                    disabled
                    value={productInfor?.productName}
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
                    disabled
                    value={productInfor?.cost}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Average rate:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    disabled
                    value={averageRate}
                  ></input>
                </div>

                <div className="form-group">
                  <label htmlfor="recipient-name" className="col-form-label">
                    Your Rate:
                  </label>
                  <select
                    className="form-control"
                    id="recipient-name"
                    value={rate}
                    onChange={(e) => handleOnchangeRate(e)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
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
                onClick={handleOnclickSendRate}
              >
                Update Rate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
