export class UrlInfo{
    url: string;
    text: string;
    title: string;

    constructor(model?: {
        url: string,
        text: string,
        title: string,
    }){
        if(model){
            this.url = model.url ? model.url : "";
            this.text = model.text ? model.text : "";
            this.title = model.title ? model.title : "";
        } else {
            this.url = "";
            this.text = "";
            this.title = "";
       }
    }
}