import { getReviews } from "../../helpers/axiosHelpers"
import { setReviews } from "./reviewSlice"


export const fetchReviewAction= _id=>async dispatch=>{
    const {status,review} = await getReviews(_id)
    status === 'success' && review.length && dispatch(setReviews(review))
}