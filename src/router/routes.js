import React from "react";

export const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    fullLayout: true,
    component: React.lazy(() => import("../views/authentication/Login")),
  },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    fullLayout: true,
    component: React.lazy(() => import("../views/authentication/ForgotPassword")
    ),
  },
  {
    path: "/authentication/reg",
    exact: true,
    fullLayout: true,
    name: "Register",
    component: React.lazy(() => import("../views/authentication/register")),
  },
];

export const authRoutes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("../views/Home")),
  },

  {
    path: "/profile",
    exact: true,
    name: "admindetails",
    component: React.lazy(() => import("../views/user/adminProfile"))
  },

  {
    path: "/profile/edit",
    exact: true,
    name: "Edit Profile",
    component: React.lazy(() => import("../views/user/editAdminProfile")),
  },
  
  {
    path: "/ChangePassword",
    exact: true,
    name: "changepassword",
    component: React.lazy(() => import("../views/authentication/changePassword")),
  },

  {
    path: "/CategoryList",
    exact: true,
    name: "CategoryList",
    component: React.lazy(() => import("../views/Category/categoryList")),
  },
  {
    path: "/AddCategory",
    exact: true,
    name: "AddCategory",
    component: React.lazy(() => import("../views/Category/addCategory")),
  },
  {
    path: "/EditCategory/:_id",
    exact: true,
    name: "EditCategory",
    component: React.lazy(() => import("../views/Category/editCategory")),
  },
  {
    path: "/ViewCategory/:_id",
    exact: true,
    name: "ViewCategory",
    component: React.lazy(() => import("../views/Category/viewCategory")),
  },
  {
    path: "/SubCategoryList/:_id",
    exact: true,
    name: "SubCategoryList",
    component: React.lazy(() => import("../views/Category/subCategoryList")),
  },
  {
    path: "/AddSubCategory/:_id",
    exact: true,
    name: "AddSubCategory",
    component: React.lazy(() => import("../views/Category/addSubCategory")),
  },
  {
    path: "/EditSubCategory/:_id",
    exact: true,
    name: "EditSubCategory",
    component: React.lazy(() => import("../views/Category/editSubCategory")),
  },

  {
    path: "/Phones",
    exact: true,
    name: "categoriesPhones",
    component: React.lazy(() => import("../views/Category/SubCategory/categoryPhones")),
  },
  {
    path: "/AddPhone",
    exact: true,
    name: "AddPhone",
    component: React.lazy(() => import("../views/Category/SubCategory/Phones/addPhone")),
  },
  {
    path: "/EditPhone",
    exact: true,
    name: "EditPhone",
    component: React.lazy(() => import("../views/Category/SubCategory/Phones/editPhone")),
  },
  {
    path: "/Complaints",
    exact: true,
    name: "Complaints",
    component: React.lazy(() => import("../views/Complaint/complaintList")),
  },
  {
    path: "/AddCompliant",
    exact: true,
    name: "AddComplaint",
    component: React.lazy(() => import("../views/Complaint/addComplaint")),
  },
  {
    path: "/EditComplaint/:_id",
    exact: true,
    name: "EditComplaint",
    component: React.lazy(() => import("../views/Complaint/editComplaint")),
  },
  {
    path: "/ViewComplaint/:_id",
    exact: true,
    name: "ViewComplaint",
    component: React.lazy(() => import("../views/Complaint/viewComplaint")),
  },

  {
    path: "/Purchases",
    exact: true,
    name: "Purchases",
    component: React.lazy(() => import("../views/purchase/purchase")),
  },
  {
    path: "/AddPurchase",
    exact: true,
    name: "AddPurchase",
    component: React.lazy(() => import("../views/purchase/addPurchase")),
  },
  {
    path: "/EditPurchase/:_id",
    exact: true,
    name: "EditPurchase",
    component: React.lazy(() => import("../views/purchase/editPurchase")),
  },
  {
    path: "/ViewPurchase/:_id",
    exact: true,
    name: "ViewPurchase",
    component: React.lazy(() => import("../views/purchase/veiwPurchase")),
  },
  {
    path: "/Sales",
    exact: true,
    name: "Sales",
    component: React.lazy(() => import("../views/Seller/sales")),
  },
  {
    path: "/AddSales",
    exact: true,
    name: "AddSales",
    component: React.lazy(() => import("../views/Seller/addSales")),
  },
  {
    path: "/EditSales/:_id",
    exact: true,
    name: "EditSales",
    component: React.lazy(() => import("../views/Seller/editSales")),
  },
  {
    path: "/ViewSales/:_id",
    exact: true,
    name: "ViewSales",
    component: React.lazy(() => import("../views/Seller/viewSales")),
  },
  {
    path: "/ViewInvoiceDetails/:_id",
    exact: true,
    name: "ViewInvoiceDetails",
    component: React.lazy(() => import("../views/Seller/viewPdfDetail")),
  },
  {
    path: "/Store",
    exact: true,
    name: "Store",
    component: React.lazy(() => import("../views/stores/storeList")),
  },
  {
    path: "/AddStore",
    exact: true,
    name: "AddStore",
    component: React.lazy(() => import("../views/stores/addStore")),
  },
  {
    path: "/EditStore/:_id",
    exact: true,
    name: "EditStore",
    component: React.lazy(() => import("../views/stores/editStore")),
  },
  {
    path: "/ViewStore/:_id",
    exact: true,
    name: "EditStore",
    component: React.lazy(() => import("../views/stores/viewStore")),
  },
  {
    path: "/Products",
    exact: true,
    name: "Products",
    component: React.lazy(() => import("../views/Category/Product/productList")),
  }, 
  {
    path: "/AddProduct",
    exact: true,
    name: "AddProduct",
    component: React.lazy(() => import("../views/Category/Product/addProduct")),
  },
  {
    path: "/EditProduct/:_id",
    exact: true,
    name: "EditProduct",
    component: React.lazy(() => import("../views/Category/Product/editProduct")),
  },
  {
    path: "/ViewProduct/:_id",
    exact: true,
    name: "ViewProduct",
    component: React.lazy(() => import("../views/Category/Product/viewProduct")),
  },
];
