import shrinkLink from "./services/apiService.js";
import isValidUrl from "./util/validateUrl.js";
import renderResponse from "./responseFrame.js";
import dotsServices from "./services/dotsService.js";
import popToast from "./services/toastService.js";

httpSecuryWrapper.addEventListener('click',()=>{
    if(httpSecuryWrapper.firstElementChild.innerText === 'https://'){
        httpSecuryWrapper.firstElementChild.innerText = 'http://';
        httpSecuryWrapper.classList.remove('HTTPSecure');
        httpSecuryWrapper.firstElementChild.classList.remove('HTTPSecure');
    }else {
        httpSecuryWrapper.firstElementChild.innerText = 'https://';
        httpSecuryWrapper.classList.add('HTTPSecure');
        httpSecuryWrapper.firstElementChild.classList.add('HTTPSecure');   
    }
});

shortBtn.addEventListener('click',()=>{
    if(isValidUrl(urlInput.value)){
        dotsServices(shortBtn,true);
        shrinkLink(urlInput.value, httpSecuryWrapper.firstElementChild.innerText === 'https://')
        .then(data=>{
            renderResponse(resultWrapper,data);
            dotsServices(shortBtn,false);
            resetWrapper.classList.add('show');
            shortBtn.classList.add('hide');
        }).catch(err=>{
            popToast(err.message,false);
            setTimeout(()=>{dotsServices(shortBtn,false);},600);
        });
    }else{
        popToast("URL Inválido!",false);
    }
});

resetWrapper.addEventListener('click',()=>{
    resetWrapper.classList.remove('show');
    resultWrapper.classList.add('heightLessStart');
    setTimeout(()=>{
        while(resultWrapper.lastChild) resultWrapper.lastChild.remove();
        shortBtn.classList.remove('hide');
    },400);
    
});