import {
  getCategories,
  postCategories,
  deleteCategory,
  updateCategory,
} from "../../helpers/axiosHelpers";
import { setCategories } from "./CategorySlice";
import { toast } from "react-toastify";

export const fetchCategoriesAction = () => async (dispatch) => {
  // call axios for the help

  const response = await getCategories();

  response.status === "success" && dispatch(setCategories(response.result));
};

export const postCategoryAction = (catObj) => async (dispatch) => {
  const response = postCategories(catObj);
  toast.promise(response, {
    pending: "Please wait .....",
  });
  const result = await response;
  toast[result.status](result.message);
  result.status === "success" && dispatch(fetchCategoriesAction());
};

export const deleteCategoryAction = (_id) => async (dispatch) => {
  const response = deleteCategory(_id);
  toast.promise(response, {
    pending: "Please wait .....",
  });
  const result = await response;
  toast[result.status](result.message);
  result.status === "success" && dispatch(fetchCategoriesAction());
};

export const updateCategoryAction = (catObj) => async (dispatch) => {
  const response = updateCategory(catObj);
  toast.promise(response, {
    pending: "Please wait .....",
  });
  const result = await response;
  toast[result.status](result.message);
  result.status === "success" && dispatch(fetchCategoriesAction());
};
