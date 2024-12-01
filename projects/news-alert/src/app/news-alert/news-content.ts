import { ImageInfo } from "./imageInfo";
import { UrlInfo } from "./urlInfo";

export class NewsContent{
    title: string;
    active: boolean;
    validFrom: Date;
    validUntil: Date;
    mainBlurb: string;
    altBlurb: string;
    imageInfo: ImageInfo;
    url1: UrlInfo;
    url2: UrlInfo;
    url3: UrlInfo;

    constructor(model?: {
        title: string,
        active: boolean,
        validFrom: string
        validUntil: string
        mainBlurb: string,
        altBlurb: string,
        imageInfo: ImageInfo,
        url1: UrlInfo,
        url2: UrlInfo,
        url3: UrlInfo,
    }){
        if(model){
            this.title = model.title ? model.title : "";
            this.active = model.active ? model.active : false;
            this.validFrom = model.validFrom && !isNaN(new Date(model.validFrom).getTime()) 
                ? new Date(model.validFrom) : new Date();
            this.validUntil = model.validUntil && !isNaN(new Date(model.validUntil).getTime()) 
                ? new Date(model.validUntil) : new Date();
            this.mainBlurb = model.mainBlurb ? model.mainBlurb : "";
            this.altBlurb = model.altBlurb ? model.altBlurb : "";
            this.imageInfo = new ImageInfo(model.imageInfo);
            this.url1 = new UrlInfo(model.url1);
            this.url2 = new UrlInfo(model.url2);
            this.url3 = new UrlInfo(model.url3);
        } else {
            this.title = "";
            this.active = false;
            this.validFrom = new Date();
            this.validUntil = new Date();
            this.mainBlurb = "";
            this.altBlurb = "";
            this.imageInfo = new ImageInfo({
                source: "",
                title: "",
                alt: "", 
                imageUrl: "",
                imageUrlTitle: "",
            });
            this.url1 = new UrlInfo({
                url: "",
                text: "",
                title: ""
            });
            this.url2 = new UrlInfo({
                url: "",
                text: "",
                title: ""
            });
            this.url3 = new UrlInfo({
                url: "",
                text: "",
                title: ""
            });
        }
    }
}
