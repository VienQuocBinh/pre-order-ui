import "./single.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../model/Product";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { Chart } from "../../components/chart/Chart";
import { List } from "../../components/table/Table";
import { CircularProgress } from "@mui/material";
import { ref  
        ,uploadBytes
        ,getDownloadURL } from "firebase/storage";
import {storage} from "../../firebase/firebase";
import { useToast } from "@chakra-ui/react";

export const ProductDetail = () => {
  const toast = useToast();
  const param = useParams();
  const [product, setProduct] = useState(Product);
  const { getById } = useProductContext();
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImage = () => {
    if(imageUpload == null) return;
    
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
      });
      toast({
        title: "Đăng hình ảnh thành công!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
      })
    });
  }

  useEffect(() => {
    setLoading(true);

    getById(param.productId, "accessToken")
      .then((res) => {
        setProduct(res.data);
        setImgUrl(res.data.productDetails[0].imgUrl);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [param.productId, getById]);

  useEffect(() => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    getDownloadURL(imageRef).then((downloadURL) => {
      setImgUrl(downloadURL);
    });
  },[]);
  

  // console.log({ imgUrl });

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
                  <img src={imgUrl} alt="" className="itemImg" width={"500px"} height={"500px"}/>
                  <input type="file" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    }
                  } />
                  <button onClick={UploadImage}
                          style={{border: "2px solid blue"
                                 ,borderRadius: "10px"
                                 ,width:"100px"
                                 ,height:"100px"}}>
                    Upload Image
                    </button>

                  <div className="details">
                    <h1 className="itemTitle">{product.name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Code:</span>
                      <span className="itemValue">{product.productCode}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price:</span>
                      <span className="itemValue">{product.price}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Expect Release date:</span>
                      <span className="itemValue">
                        {product.execptedReleaseDate}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{product.description}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};
