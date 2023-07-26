import "./userSingle.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { Account } from "../../model/Account";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { CircularProgress, List } from "@mui/material";
import { Chart } from "../../components/chart/Chart";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { Toast, useToast } from "@chakra-ui/react";

export const UserDetail = () => {
  const toast = useToast();
  const params = useParams();
  const { getAccountById } = useAccountContext();
  const [account, setAccount] = useState(Account);
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAccountById(params.userId, "token")
      .then((res) => setAccount(res.data))
      .catch((err) => console.log(err));
  });
  const UploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
      });
      toast({
        title: "Đăng hình ảnh thành công!",
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 1000,
      });
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <>
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={account.imgUrl}
                    alt=""
                    className="itemImg"
                    width={"500px"}
                    height={"500px"}
                  />
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                  <button
                    onClick={UploadImage}
                    style={{
                      border: "2px solid blue",
                      borderRadius: "10px",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    Upload Image
                  </button>

                  <div className="details">
                    <h1 className="itemTitle">{account.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{account.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{account.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Created Date:</span>
                      <span className="itemValue">
                        {formatDate(account.createAt.toString())}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Status:</span>
                      <span className="itemValue">
                        {account.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
