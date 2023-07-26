export const Product = {
  id: 0,
  name: "",
  productCode: "",
  price: 0,
  description: "",
  execptedReleaseDate: "",
  isActive: true,
  category: {
    id: 0,
    name: "",
    isActive: true,
    createAt: "",
    updateAt: ""
  },
  campainId: 2,
  discountRate: 0,
  productDetails: [
    {
      id: 0,
      productId: 0,
      size: "",
      color: "",
      imgUrl: "",
      width: 0,
      height: 0,
      material: "",
      description: "",
    },
  ], // ProductDetail
};


// export const ProductDetails = {
//     id: 0,
//     productId: 0,
//     size: "",
//     color: 0,
//     imgUrl: "",
//     width: 0,
//     height: 0,
//     material: "",
//     description: "",
//     updateAt: "",
//   };