import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let Account = [
  {
    userName: "test@gmail.com",
    password: "$2a$10$JzM5wB.TroKBlmrcPXW97OV4c.ta6aCEFb1VsuXaWjSB9tMsSZ2qu",
  },
  {
    userName: "user@gmail.com",
    password: "$2a$10$1w.qCoMKmkaJ.BaI8Ln9oOJVJWLHMstNuERfG9r7DFAErx0PFT.d6",
  },
];

//sign up

const signUp = async (req, res) => {
  let userData = req.body;
  let checkExist = false;
  if (userData) {
    Account.map((item, index) => {
      if (item.userName === userData.userName) {
        checkExist = true;
      }
    });
    if (checkExist) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "This account is already exist!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userData.password, salt);
      Account.push({ userName: userData.userName, password: hashPassword });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Create new account success",
        userInfor: userData.userName,
      });
    }
  } else {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Failed",
    });
  }
};

//compare password

let comparePassword = async (clientPassword, serverPassword) => {
  try {
    let validPassword = await bcrypt.compare(clientPassword, serverPassword);
    console.log("check compare password: ", validPassword);
    return validPassword;
  } catch (e) {
    console.log(e);
    return false;
  }
};
//login
const login = async (req, res) => {
  try {
    let userData = req.body;
    let checkIndex = 0;
    let checkExist = false;

    //find exist userName
    Account.forEach((item, index) => {
      if (item.userName === userData.userName) {
        checkExist = true;
        checkIndex = index;
      }
    });

    // if userName is found, check password
    if (checkExist) {
      let checkValidate = await comparePassword(
        userData.password,
        Account[checkIndex].password
      );
      if (checkValidate) {
        console.log("login success");
        let accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({
          errCode: 0,
          errMessage: "Login success",
          userName: userData.userName,
          accessToken,
        });
      } else {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Password incorrect",
        });
      }
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "UserName incorrect",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

//export
const userController = {
  login,
  signUp,
};
export default userController;
