// {
//     "originalURL": "https://olamundo.com.br",
//     "DomainId": 710710,
//     "archived": false,
//     "lcpath": "op8ih3",
//     "source": "api",
//     "cloaking": false,
//     "createdAt": "2023-04-26T23:46:12.740Z",
//     "updatedAt": "2023-04-26T23:46:12.740Z",
//     "OwnerId": 888179,
//     "tags": [],
//     "path": "Op8iH3",
//     "idString": "lnk_2YT4_9dCPkoX7yve",
//     "shortURL": "https://93it.short.gy/Op8iH3",
//     "secureShortURL": "https://93it.short.gy/Op8iH3",
//     "duplicate": false
// }


export class shortenLink {
    path;
    idString;
    originalURL;
    #createdAt;
    #updatedAt;
    shortURL;
    #timeOptions = {
        timeZone: 'America/Fortaleza',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    constructor(jsonResponse){
        this.path = jsonResponse.lcpath;
        this.idString = jsonResponse.idString;
        this.originalURL = jsonResponse.originalURL;
        this.shortURL = jsonResponse.secureShortURL;
        this.#createdAt = new Date(jsonResponse.createdAt);
        this.#updatedAt = new Date(jsonResponse.updatedAt);
        
    }

    get createdAt(){
        return  this.#createdAt.toLocaleString('pt-BR', this.#timeOptions);
    }

    get updatedAt(){
        return this.#updatedAt.toLocaleString('pt-BR', this.#timeOptions);
    }

    createdAtText(){
        const splitTime = this.createdAt.split(", ");
        return "Link criado em: " + splitTime[0] + " às " + splitTime[1];
    }
}