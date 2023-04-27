const CONFIRM_TEMPLATE = `<div class="confirm-box__card">
                                <div class="confirm-box__card__header">
                                    <span class="confirm-box__card__header__title">dummy</span>
                                    <button class="confirm-box__card__header__close">X</button>
                                </div>
                                <div class="confirm-box__content"></div>
                                <div class="confirm-box__control template-btn">
                                    <button class="confirm-box__control__btn yes">Confirma</button>
                                    <button class="confirm-box__control__btn no">Cancelar</button>
                                </div>
                            </div>`


const HTML_TEMPLATE = `<div class="card">
                            <div class="title-wrapper">
                                <h4>DUMMY TITLE</h4>
                            </div>
                            <div class="content">
                            </div>
                            <div class="modal-control">
                                <div class="template-btn btn-edit-wrapper btn-modal-save">
                                    <button>SALVAR</button>
                                </div>
                                <div class="template-btn btn-delete-wrapper btn-modal-cancel">
                                    <button>CANCELAR</button>
                                </div>
                            </div>
                        </div>`


const getConfirmTemplate = () => {
    const confirmTemplate = document.createElement('div');
    confirmTemplate.classList.add('confirm-box');
    confirmTemplate.innerHTML = CONFIRM_TEMPLATE;
    return confirmTemplate;
}

export const loadConfirm = (text,action,title = '') => {
    const cAltert = getConfirmTemplate();
    cAltert.querySelector('.confirm-box__card__header__title').innerText = title;
    cAltert.querySelector('.confirm-box__content').innerText = text;
    cAltert.querySelector('button.confirm-box__control__btn.yes').addEventListener('click',()=>{
        action();
        cAltert.remove();
    });

    cAltert.querySelector('button.confirm-box__control__btn.no').addEventListener('click',()=>{
        cAltert.remove();
    });
    document.body.appendChild(cAltert);
}

const getTemplate = () => {
    const modalTemplate = document.createElement('div')
    modalTemplate.classList.add('template-modal');
    modalTemplate.innerHTML = HTML_TEMPLATE;
    return modalTemplate;
}

const loadModal = (title,nodes,action)=>{
    const modal = getTemplate();
    modal.querySelector(".title-wrapper h4").innerHTML = title;
    
    modal.querySelector('.btn-modal-save button')?.addEventListener('click',()=>{
        if ( action(modal.querySelectorAll('.content input')) ) modal.remove();
    })

    modal.querySelector('.btn-modal-cancel button')?.addEventListener('click',()=>{
        modal.remove();
    })

    const contentDiv = modal.querySelector('.content');
    if(contentDiv) for(let aNode of nodes) contentDiv.appendChild(aNode);
    
    document.body.appendChild(modal);
}

export const generateInput = (label,name,extras) => {
    const container = document.createElement('div');
    container.className = "form-control form-template";
    
    const labelEl = document.createElement('label');
    labelEl.innerText = label;
    container.appendChild(labelEl);

    const inputWrapper = document.createElement('div');
    inputWrapper.className = "input-wrapper";
    container.appendChild(inputWrapper);

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputWrapper.appendChild(inputEl);
    inputEl.name = name;
    
    if(extras.placeholder) inputEl.placeholder = extras.placeholder
    if(extras.value) inputEl.value = extras.value;
    if(extras.changeEv) inputEl.addEventListener('change',extras.changeEv);
    if(extras.keydownEv) inputEl.addEventListener('keydown',extras.keydownEv);
    if(extras.list && extras.dataList){
        inputEl.setAttribute('list',extras.list);
        container.appendChild(extras.dataList);
    }
    if(extras.maxLength) inputEl.setAttribute('maxlength',extras.maxLength);
    
    return container;
}

export default loadModal;