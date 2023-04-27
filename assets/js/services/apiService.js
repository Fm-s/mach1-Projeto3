import apiKey from '../../../secrect.js';
import base64ArrayBuffer from '../util/arrayBufferToBase64.js';
import { dummyFetch, dummyQrFetch, dummyListFetch } from '../mocks/mocks.js';

const DOMAIN = '93it.short.gy';
const DOMAIN_ID = 710710;

export const getLinkList = (limit,offSet) => {
    if(limit <= 0 || isNaN(limit) || limit > 150) limit = 150;
    const targetUrl = new URL('https://api.short.io/api/links');

    targetUrl.searchParams.append('domain_id',DOMAIN_ID);
    targetUrl.searchParams.append('limit',limit);
    if(offSet) {
        targetUrl.searchParams.append('pageToken',offSet);
    } else {
        offSet = "";
    }

    const fetchConfig = {
        method: 'GET',
        headers: {
            authorization: apiKey,
            accept: 'application/json',
        }
    }
    
    //Dummy
    // return dummyListFetch()

    return fetch(targetUrl,fetchConfig).then(res=>res.json())
        .then(res=>{
            return {
                linkList: res,
                offset: offSet
            }
        });
}

export const deleteLink = (linkId) => {
    const targetEndPoint = `https://api.short.io/links/${linkId}`;
    const fetchConfig = {
        method: 'DELETE',
        headers: {
            authorization: apiKey,
            accept: 'application/json',
            'content-type': 'application/json'
        }
    }
    return fetch(targetEndPoint,fetchConfig) //.then(res=>res.json);
}

const apiPost = (endPoint,data) => {
    const fetchConfig = {
        method: 'POST',
        headers: {
            authorization: apiKey,
            accept: 'application/json',
            'content-type': 'application/json'
            },
        body: JSON.stringify(data),
    }
    return fetch(endPoint,fetchConfig);
}

export const shrinkLink = (urlToShorten,https) => {
    const targetEndPoint = 'https://api.short.io/links'
    const data = {
        originalURL: https ? 'https://' + urlToShorten : 'http://' + urlToShorten,
        domain: DOMAIN
    }
      
    //Dummy
    // return dummyFetch();

    return apiPost(targetEndPoint,data).then(res=>res.json());
}

export const editLink = (linkId,fullUrl,newPath) => {
    const targetEndPoint = `https://api.short.io/links/${linkId}`
    const data = {
        "allowDuplicates":false, 
        "domain":DOMAIN, 
        "path": newPath,
        "originalURL": fullUrl
    };
    return apiPost(targetEndPoint,data);
}

export const getQrCode = (idString) => {
    const targetEndPoint = `https://api.short.io/links/qr/${idString}`;

    //Dummy
    // return dummyQrFetch();

    return apiPost(targetEndPoint,{type: 'png'}).then(res=>res.arrayBuffer())
        .then(res=>'data:image/jpeg;base64,' + base64ArrayBuffer(res));
}

export default shrinkLink;