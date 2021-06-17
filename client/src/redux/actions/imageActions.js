import { IMAGES_URL } from '../constants/webservices'
import ActionUtility from './utilAction'


export const GET_IMAGES = 'GET_IMAGES';
export const CREATE_IMAGES = 'CREATE_IMAGES'

function getImages() {

    let url = IMAGES_URL;

    return (dispatch, getState) => {
        ActionUtility.invokeServiceGet(dispatch, GET_IMAGES, url);
    }

}

function createImageOrder(order, requestObj) {
    
    let url = IMAGES_URL;    

    return (dispatch, getState) => {
        ActionUtility.invokeServicePostFormData(dispatch, CREATE_IMAGES, requestObj, url, order);
    }
    // var date = new Date();
    // var curDate = null;
    // do { curDate = new Date(); }
    // while(curDate-date < 3000);

    // return (dispatch, getState) => {
    // console.log("actualizo la url ...")           
    //       }
    
}


export { getImages, createImageOrder };