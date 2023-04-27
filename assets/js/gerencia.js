import { getLinkList, editLink, deleteLink } from "./services/apiService.js";
import { shortenLink } from "./model/shortenLink.js";
import dotsServices from "./services/dotsService.js";
import popToast from "./services/toastService.js";
import loadModal, { loadConfirm, generateInput } from "./services/modalService.js";
import isValidUrl from "./util/validateUrl.js";

let pagination_limit = 10;
let current_page = 1;
let prevOffset = [];

const editHandler = (linkId,path,url) => {
    const nodeList = [
        generateInput("Path(Slug)","path",{value: path}),
        generateInput("URL Original","url",{value: url})
    ];

    const editDispatch = (nodeList) => {
        for(let node of nodeList){
            if(node.name === 'path' && node.value === ""){
                popToast("SLUG inválido!");
                return false;
            }
            if(node.name === 'url'){
                const https = node.value.split('https://');
                const http = node.value.split('http://');
                if(https.length > 1 || http.length > 1){
                    if(!isValidUrl(https.length === 1 ? http[1] : https[1])){
                        popToast("URL inválido!");    
                        return false;
                    }
                }else{
                    popToast("URL inválido!");
                    return false;
                }
            }
        }

        const newUrl = Array.from(nodeList).filter(node=>node.name === 'url')[0].value
        const newPath = Array.from(nodeList).filter(node=>node.name === 'path')[0].value

        if(url === newUrl && path === newPath){
            popToast("Nenhum dado alterado!");
            return true;
        }
        
        editLink(linkId,newUrl,newPath).then(res=>{
            if(res.status === 200){
                popToast("Alterações salvas com sucesso!",true);
                updateLinkList();
            }else{
                popToast("Erro ao salvar alterações!",false);
            }
            return res;
        }).catch(err=>{
            console.warn(err);
            popToast(`Communication Error: ${err.message}`);
        });

        return true;
    }
    loadModal("Editar Entrada",nodeList,editDispatch);
}

const deleteHandler = (linkId) => {
    loadConfirm("Confimar apagar? (essa ação não pode ser desfeita)",()=>{
        deleteLink(linkId).then(res=>{
            if(res.status === 200){
                popToast("Deletado com sucesso!",true);
                updateLinkList();
            }else if(res.status === 404){
                popToast("Link não encontrado!",false);
            }else{
                popToast("Erro ao deleter o link!",false);
            }
        }).catch(err=>{
            console.warn(err);
            popToast(`Communication Error: ${err.message}`,false);
        })
    },"DELETAR");
}

const newTableDataColumn = (innerText) => {
    const neTaDaCo = document.createElement('div');
    neTaDaCo.classList.add('tblDataColumn');
    if(innerText) neTaDaCo.innerText = innerText;
    return neTaDaCo;
}

function updateLinkList(nextPagePromise){

    dotsServices(tblBody,true);
    
    if(!nextPagePromise) nextPagePromise = getLinkList(pagination_limit);

    nextPagePromise.then(res=>{
        dotsServices(tblBody,false);
        
        while(tblBody.lastChild) tblBody.lastChild.remove();
        
        if(res.linkList.count === 0){
            const noDataDiv = document.createElement('div');
            noDataDiv.classList.add("tblNoData")
            noDataDiv.innerText = "No Links";
            tblBody.appendChild(noDataDiv)
            return;
        }


        pageNumber.innerText = current_page;

        for(let jsonResponse of res.linkList.links){
            const sLink = new shortenLink(jsonResponse);
            const row = document.createElement('div');
            row.classList.add('tblGridRow');

            row.appendChild(newTableDataColumn(sLink.shortURL));
            row.appendChild(newTableDataColumn(sLink.originalURL));
            row.appendChild(newTableDataColumn(sLink.createdAt));

            const actionDiv = newTableDataColumn();
            actionDiv.classList.add('actionColumn');
            const editBtn = document.createElement('button');
            editBtn.innerText = "EDIT"
            editBtn.addEventListener('click',()=>{editHandler(sLink.idString, sLink.path, sLink.originalURL)});
            actionDiv.appendChild(editBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "DEL"
            deleteBtn.addEventListener('click',()=>{deleteHandler(sLink.idString)});
            actionDiv.appendChild(deleteBtn);

            row.appendChild(actionDiv);
            tblBody.appendChild(row);
        }

        if(current_page > 1){
            let targetHTMLElement;
            
            if(btnPrevWrapper.lastChild){
                btnPrevWrapper.replaceChild(btnPrevWrapper.lastChild.cloneNode(true),btnPrevWrapper.lastChild);
                targetHTMLElement = btnPrevWrapper.lastChild;
            } else {
                const previousPageBtn = document.createElement('button');
                previousPageBtn.innerText = "<"
                targetHTMLElement = previousPageBtn
                btnPrevWrapper.appendChild(previousPageBtn);
            }
            
            targetHTMLElement.addEventListener('click',()=>{
                current_page--;
                updateLinkList(getLinkList(pagination_limit,prevOffset[current_page]));
            })
            
        }else {
            if(btnPrevWrapper.lastChild) btnPrevWrapper.lastChild.remove();
        }

        if(res.linkList.nextPageToken){
            let targetHTMLElement;

            if(btnNextWrapper.lastChild){
                btnNextWrapper.replaceChild(btnNextWrapper.lastChild.cloneNode(true),btnNextWrapper.lastChild);
                targetHTMLElement = btnNextWrapper.lastChild;
            } else {
                const nextPageBtn = document.createElement('button');
                nextPageBtn.innerText = ">"
                targetHTMLElement = nextPageBtn;
                btnNextWrapper.appendChild(nextPageBtn);
            }

            targetHTMLElement.addEventListener('click',()=>{
                prevOffset[current_page] = res.offset;
                current_page++;
                updateLinkList(getLinkList(pagination_limit,res.linkList.nextPageToken));
            })
            
        }else {
            if(btnNextWrapper.lastChild) btnNextWrapper.lastChild.remove();
        }
        
    })
}

paginationSelect.addEventListener('change',(e)=>{
    if(+e.target.value !== pagination_limit){
        pagination_limit = +e.target.value;
        current_page = 1;
        updateLinkList(getLinkList(pagination_limit));
    }
})

updateLinkList();


