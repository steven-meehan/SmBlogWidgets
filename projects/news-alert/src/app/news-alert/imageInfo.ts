export class ImageInfo{
    source: string;
    title: string;
    alt: string;
    imageUrl: string;
    imageUrlTitle: string;

    constructor(model?: {
        source: string,
        title: string,
        alt: string,
        imageUrl: string,
        imageUrlTitle: string,
    }){
        if(model){
            this.source = model.source ? model.source : "";
            this.title = model.title ? model.title : "";
            this.alt = model.alt ? model.alt : "";
            this.imageUrl = model.imageUrl ? model.imageUrlTitle : "";
            this.imageUrlTitle = model.imageUrlTitle ? model.imageUrlTitle : "";
        } else {
            this.source = "";
            this.title = "";
            this.alt = "";
            this.imageUrl = "";
            this.imageUrlTitle = "";
       }
    }
}