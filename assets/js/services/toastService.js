const TIMEOUT = 1600;
const FADEOUT_TIME = 400;

const newToast = (text,sytle) => {
    const toastDiv = document.createElement('div');
    toastDiv.classList.add('toastWrapper','fadeout');

    setTimeout(()=>{toastDiv.classList.remove('fadeout');},0);
    const timeoutCount = setTimeout(()=>{toastDiv.classList.add('fadeout');},TIMEOUT);

    if(sytle){
        toastDiv.classList.add('success');
    }else if (sytle === false){
        toastDiv.classList.add('error');
    }else {
        toastDiv.classList.add('warn');
    }
    
    const paragraph = document.createElement('span');
    paragraph.innerText = text;
    paragraph.classList.add('toastText');

    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.innerText = 'X';
    closeBtnWrapper.classList.add('closeBtnWrapper');
    closeBtnWrapper.addEventListener('click',()=>{
        clearTimeout(timeoutCount);
        toastDiv.classList.add('fadeout');
    });

    toastDiv.appendChild(paragraph);
    toastDiv.appendChild(closeBtnWrapper);

    return toastDiv;
}


const popToast = (text,style) => {
    const mainEl = document.getElementsByTagName('main')[0];
    const toastEl = newToast(text,style);
    mainEl.appendChild(toastEl);
    setTimeout(()=>{toastEl.remove()},TIMEOUT+FADEOUT_TIME);
}

export const divToast = (text,style) => {
    const toastDiv = document.createElement('div');
    toastDiv.innerText = text;
    return toastDiv;
}

export default popToast