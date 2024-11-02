export class NewsContent{
    imageUrl: string;
    imageUrlTitle: string;
    imageUrlAlt: string;
    mainBlurb: string;
    altBlurb: string;
    url1: string;
    url1Title: string;
    url2: string;
    url2Title: string;
    url3: string;
    url3Title: string;
    title: string;
    active: boolean;
    validUntil: Date;

    constructor(model?: {
        imageUrl: string,
        imageUrlTitle: string,
        imageUrlAlt: string,
        mainBlurb: string,
        altBlurb: string,
        url1: string,
        url1Title: string;
        url2: string,
        url2Title: string;
        url3: string,
        url3Title: string;
        title: string,
        active: boolean,
        validUntil: string
    }){
        if(model){
            this.imageUrl = model.imageUrl ? model.imageUrl : "";
            this.imageUrlTitle = model.imageUrlTitle ? model.imageUrlTitle : "";
            this.imageUrlAlt = model.imageUrlAlt ? model.imageUrlAlt : "";
            this.mainBlurb = model.mainBlurb ? model.mainBlurb : "";
            this.altBlurb = model.altBlurb ? model.altBlurb : "";
            this.url1 = model.url1 ? model.url1 : "";
            this.url1Title = model.url1Title ? model.url1Title : "";
            this.url2 = model.url2 ? model.url2 : "";
            this.url2Title = model.url2Title ? model.url1Title : "";
            this.url3 = model.url3 ? model.url3 : "";
            this.url3Title = model.url3Title ? model.url1Title : "";
            this.title = model.title ? model.title : "";
            this.active = model.active ? model.active : false;
            this.validUntil = model.validUntil && !isNaN(new Date(model.validUntil).getTime()) 
                ? new Date(model.validUntil) : new Date()
        } else {
            this.imageUrl = "";
            this.imageUrlTitle = "";
            this.imageUrlAlt = "";
            this.mainBlurb = "";
            this.altBlurb = "";
            this.url1 = "";
            this.url1Title = "";
            this.url2 = "";
            this.url2Title = "";
            this.url3 = "";
            this.url3Title = "";
            this.title = "";
            this.active = false;
            this.validUntil = new Date();
        }
    }
}
