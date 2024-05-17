import { ShowSuccessMessage, ShowErrorMessage } from "../AdminMenu.js";

export class IphoneDataModel 
{
    #brand;
    #category;
    #model;
    #processor;
    #memory;
    #display_size;
    #battery;
    #osl;
    #camera;
    #color;
    #price;
    #descont_price;
    #description;
    #images;
    #incarousel;

    constructor(inputs, in_carousel, img_product_paths)
    {
        this.#brand = inputs[0].value;
        this.#category = inputs[1].value;
        this.#model = inputs[2].value;
        this.#processor = inputs[3].value;
        this.#memory = inputs[4].value;
        this.#display_size = inputs[5].value;
        this.#battery = inputs[6].value;
        this.#osl = inputs[7].value;
        this.#camera = inputs[8].value;
        this.#color = inputs[9].value;
        this.#price = inputs[10].value;
        this.#descont_price = inputs[11].value;
        this.#description = inputs[12].value;
        this.#images = img_product_paths;
        this.#incarousel = in_carousel;
    }

    async AddToLocalStorage() 
    {
        const data = 
        {
            brand: this.#brand,
            category: this.#category,
            model: this.#model,
            processor: this.#processor,
            memory: this.#memory,
            display_size: this.#display_size,
            battery: this.#battery,
            osl: this.#osl,
            camera: this.#camera,
            color: this.#color,
            price: this.#price,
            descont_price: this.#descont_price,
            description: this.#description,
            images: this.#images,
            incarousel: this.#incarousel
        };

        try 
        {
            const result_p = await window.electron.invoke('AddNewProductToLocalStorage', data);
            
            if(result_p.success)
            {
                await window.electron.invoke('AddNewProductImgToLocalStorage', this.#images);
                
                ShowSuccessMessage(result_p.message);
            }
            else
                ShowErrorMessage(result_p.message);
        } 
        catch (error) { console.error('Error when adding data to local storage: ', error); }
    }
}