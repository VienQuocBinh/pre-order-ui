import "./productEdit.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductUpdate } from "../../model/Product";
import { useProductContext } from "../../context/ProductContext";
import useUserContext from "../../hooks/useUserContext";
import { CircularProgress, useToast } from "@chakra-ui/react";
import { useCategoryContext } from "../../context/CategoryContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useCampaignContext } from "../../context/CampaginContext";
import { LinearProgress } from "@mui/material";

export const ProductEdit = ({ inputs }) => {
  const params = useParams();
  const [product, setProduct] = useState(Product);
  const { getById, updateProduct } = useProductContext();
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();
  const [imgUrl, setImgUrl] = useState("");
  const toast = useToast();
  const { getAllCatgories } = useCategoryContext();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [file, setFile] = useState("");
  const { getAllCampaigns } = useCampaignContext();
  const [campagins, setCampagins] = useState([]);
  const [campaignId, setCampaignId] = useState(0);
  const [formData, setFormData] = useState(ProductUpdate);

  useEffect(() => {
    getAllCatgories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllCampaigns()
      .then((res) => setCampagins(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setLoading(true);

    getById(params.productId, accessToken)
      .then((res) => {
        setProduct(res.data);
        setProduct((prevProduct) => ({
          ...prevProduct,
          categoryId: res.data.category.id,
          productDetails: [
            {
              ...prevProduct.productDetails[0],
              updateAt: new Date().toISOString(), // Set updateAt to the current datetime
            },
          ],
        }));
        setImgUrl(res.data.productDetails[0].imgUrl);
        setCategoryId(res.data.category.id);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, [getById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Split the name to get the nested property (if any)
    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [nameParts[0]]: [
          {
            ...prevProduct[nameParts[0]][0],
            [nameParts[1]]: value,
          },
        ],
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const cId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: cId,
    }));
    setCategoryId(cId);
  };

  const handleCampaignChange = (e) => {
    const campaignId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      campainId: campaignId,
    }));
    setCampaignId(campaignId);
  };

  // Function to transform form data to the required request data format
  const transformFormData = (formData) => {
    return {
      categoryId: formData.categoryId || 0, // Use 0 as default if categoryId is not present
      campainId: formData.campainId || 0, // Use 0 as default if campainId is not present
      productCode: formData.productCode || "",
      name: formData.name || "",
      description: formData.description || "",
      price: formData.price || 0,
      execptedReleaseDate:
        formData.execptedReleaseDate || new Date().toISOString(), // Use current date as default if execptedReleaseDate is not present
      discountRate: formData.discountRate || 0,
      isActive: formData.isActive || false,
      productDetails: formData.productDetails.map((detail) => ({
        size: detail.size || "",
        color: detail.color || "",
        imgUrl: detail.imgUrl || "",
        width: detail.width || 0,
        height: detail.height || 0,
        material: detail.material || "",
        description: detail.description || "",
      })),
    };
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProduct((prevProduct) => ({
      ...prevProduct,
      campainId: campaignId,
      productDetails: [
        {
          ...prevProduct.productDetails[0],
          updateAt: new Date().toISOString(), // Set updateAt to the current datetime
        },
      ],
    }));

    if (file) {
      const imageRef = ref(
        storage,
        `images/${file.name}${product.productCode}`
      );

      try {
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setProduct((prevProduct) => ({
              ...prevProduct,
              productDetails: [
                {
                  ...prevProduct.productDetails[0],
                  updateAt: new Date().toISOString(), // Set updateAt to the current datetime
                  imgUrl: downloadURL,
                },
              ],
            }));
          });
          toast({
            title: "Cập nhật sản phẩm thành công!",
            status: "success",
            position: "top-right",
            isClosable: true,
            duration: 3000,
          });
        });
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
      }
    }

    console.log(transformFormData(product));
    console.log(product.id);
    // updateProduct(product.id, transformFormData(product), accessToken);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Product</h1>
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="bottom">
            <div className="left">
              <img
                src={
                  imgUrl
                    ? imgUrl
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlined className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="productDetails.imgUrl"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      handleInputChange(e);
                    }}
                    // style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      name={input.key}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={
                        input.key === "execptedReleaseDate"
                          ? formatDate(product[input.key])
                          : product[input.key]
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                ))}

                <div className="formInput">
                  <label>Choose a category:</label>
                  <select
                    name="categoryId"
                    value={categoryId}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <label>Choose a campaign:</label>
                  <select
                    name="campaignId"
                    value={campaignId}
                    onChange={handleCampaignChange}
                  >
                    {campagins.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button>Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
