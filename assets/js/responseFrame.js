import { shortenLink } from "./model/shortenLink.js"
import popToast, { divToast } from "./services/toastService.js";
import { getQrCode } from "./services/apiService.js";
import dotsServices from "./services/dotsService.js";
import loadModal from "./services/modalService.js";

const render = (element,data) => {
    const sLink = new shortenLink(data);
    setTimeout(()=>{element.classList.remove('heightLessStart');},0);

    const shortenLinkWrapperDiv = document.createElement('div');
    shortenLinkWrapperDiv.classList.add('shortenLinkWrapper');

    const shortenLinkSpan = document.createElement('span');
    shortenLinkSpan.classList.add('shortenLink');
    shortenLinkSpan.innerHTML = `<a href="${sLink.shortURL}" target="_blank">${sLink.shortURL}</a>`;
    shortenLinkWrapperDiv.appendChild(shortenLinkSpan);

    const linkDateSpan = document.createElement('span');
    linkDateSpan.classList.add('linkDate');
    linkDateSpan.innerText = sLink.createdAtText();
    shortenLinkWrapperDiv.appendChild(linkDateSpan);

    element.appendChild(shortenLinkWrapperDiv);

    const shareWrapperDiv = document.createElement('div');
    shareWrapperDiv.classList.add('shareWrapper');

    const clipboardBtn = document.createElement('button');
    clipboardBtn.id = "copyToClipBtn";
    clipboardBtn.innerHTML = "<span></span>Copiar";
    clipboardBtn.addEventListener('click',copyToClipBoard());
    shareWrapperDiv.appendChild(clipboardBtn);

    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = "<span></span>Compartilhar";
    shareBtn.addEventListener('click',()=>{
        loadModal({title: "Share", nodes: []},(inputEls)=>{
            element.appendChild(divToast("test"))
            console.log(inputEls);
            return true;
        })
    });
    shareWrapperDiv.appendChild(shareBtn);

    const qrBtn = document.createElement('button');
    qrBtn.id = "generateQrCodeBtn";
    qrBtn.innerHTML = "<span></span>QR CODE";
    qrBtn.addEventListener('click',generateQrCode());
    shareWrapperDiv.appendChild(qrBtn);

    element.appendChild(shareWrapperDiv);

    function copyToClipBoard(){
        return () => navigator.clipboard.writeText(sLink.shortURL)
                            .then(()=>{
                                // element.appendChild(divToast("Copiado com sucesso!"))
                                popToast("Copiado para o ClipBoard com sucesso!",true);
                            });
    }

    function generateQrCode (){
        return () => {
            dotsServices(qrBtn,true);
            getQrCode(sLink.idString)
                .then(res=>{
                    const qrDiv = document.createElement('div');
                    qrDiv.classList.add('qrBox');
                    const qrImg = document.createElement('img');
                    qrImg.src = res;
                    qrDiv.appendChild(qrImg)
                    element.appendChild(qrDiv);
                    dotsServices(qrBtn,false);
                    popToast("Qr Code Gerado com sucesso!",true)
                })
                .catch(err=>{element.appendChild(divToast(err.message))});
        }
    }
}

export default render;