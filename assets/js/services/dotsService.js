const HtmlInnetTextMemory = {};

const dotsServices = (HtmlElement,loading) => {
    if(!HtmlInnetTextMemory[HtmlElement.id]){
        HtmlInnetTextMemory[HtmlElement.id] = {
            innerText: HtmlElement.innerText,
            width: HtmlElement.getBoundingClientRect().width,
            height: HtmlElement.getBoundingClientRect().height
        };
    }

    if(loading){
        HtmlElement.style.width = HtmlInnetTextMemory[HtmlElement.id].width + "px";
        HtmlElement.style.height = HtmlInnetTextMemory[HtmlElement.id].height + "px";
        HtmlElement.innerHTML = `<div class="loadingDots"><div></div><div></div><div></div></div>`;
    } else {
        while(HtmlElement.lastChild) HtmlElement.lastChild.remove();
        HtmlElement.innerText = HtmlInnetTextMemory[HtmlElement.id].innerText;
        HtmlElement.style.width = null;
        HtmlElement.style.height = null;

    }
}

export default dotsServices;