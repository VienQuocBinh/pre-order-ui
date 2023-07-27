import "./new.scss";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../../model/Product";
import { useCategoryContext } from "../../context/CategoryContext";
import useUserContext from "../../hooks/useUserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useToast } from "@chakra-ui/react";
import { isValid, parseISO, isBefore, isAfter } from "date-fns";

export const NewProduct = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState(Product);
  const [categories, setCategories] = useState([]);
  const { create } = useProductContext();
  const { getAllCatgories } = useCategoryContext();
  const { accessToken } = useUserContext();
  const [formValid, setFormValid] = useState(false);
  const generateInitialValidations = () => {
    const initialValidations = {};
    inputs.forEach((input) => {
      initialValidations[input.key] = true;
    });
    return initialValidations;
  };
  const [validations, setValidations] = useState(generateInitialValidations());
  const toast = useToast();

  useEffect(() => {
    getAllCatgories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Perform validation based on the input name
    switch (name) {
      case "price":
      case "productDetails.size":
      case "productDetails.width":
      case "productDetails.height":
        setValidations((prevValidations) => ({
          ...prevValidations,
          [name]: parseFloat(value) > 0,
        }));
        break;
      case "discountRate":
        setValidations((prevValidations) => ({
          ...prevValidations,
          [name]: parseFloat(value) >= 0 && parseFloat(value) <= 100,
        }));
        break;
      case "execptedReleaseDate":
        const currentDate = new Date();
        const inputDate = parseISO(value);
        const isBeforeCurrentDate = isBefore(inputDate, currentDate);
        const isAfterCurrentDate = isAfter(inputDate, currentDate);

        setValidations((prevValidations) => ({
          ...prevValidations,
          [name]:
            !isBeforeCurrentDate && isAfterCurrentDate && isValid(inputDate),
        }));
        break;
      // Add more cases for other input keys as needed
      default:
        break;
    }
    // Split the name to get the nested property (if any)
    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [nameParts[0]]: [
          {
            ...prevFormData[nameParts[0]][0],
            [nameParts[1]]: value,
          },
        ],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    // Check if all validations are true
    const allValid = Object.values(validations).every((isValid) => isValid);
    setFormValid(allValid);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryId: categoryId,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);

      try {
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setFormData((prevFormData) => ({
              ...prevFormData,
              productDetails: [
                {
                  ...prevFormData.productDetails[0],
                  imgUrl: downloadURL,
                },
              ],
            }));
          });
          toast({
            title: "Tạo sản phẩm thành công!",
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
    create(formData, accessToken);
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit} autoComplete="off">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
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
                    value={input.value}
                    onChange={handleInputChange}
                    className={!validations[input.key] ? "invalid" : ""}
                  />
                  {!validations[input.key] && (
                    <span className="error-message">Invalid input</span>
                  )}
                </div>
              ))}

              <div className="formInput" key={"categoryId"}>
                <label>Choose a category:</label>
                <select name="categoryId" onChange={handleCategoryChange}>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={formValid ? "" : "disabled-button"}
                disabled={!formValid}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
