export default class uiStatus{

    #domElementsTranslations={
        "welcome_message": {
                "en": "I'm a web developer (Vanilla JS focus), a problem solver, an IoT enthusiast, an aspiring Full Stack Developer, a development team player, a goal-oriented worker",
                "es": "Soy un desarrollador web (enfocado en Vanilla JS), un solucionador de problemas, un entusiasta de IoT, un futuro desarrollador Full Stack, un miembro de equipo de desarrollo y un trabajador orientado a objetivos"
        },
        "aboutTitle":{
            "en":"About",
            "es":"Sobre mí"
        },
        "nav":{
            "en":["Home","About","Resume","Demos","GCAdmin","Contact"],
            "es":["Inicio","Sobre mí","Currículum","Demos","GCAdmin","Contacto"]
        }
    };
    #about=null;
    #typed=null;
    #languageButton=null;

    constructor (){
        const language = navigator.language || navigator.userLanguage;
        this.#languageButton=document.getElementById("language-toggle");
        this.#languageButton.innerHTML=language.split("-")[0];
        this.setLanguage(this.#languageButton);
    };
    
    async getJsons(){
        try {
            const response = await fetch("./data/about.json"); // Espera a que se resuelva la promesa de fetch
            this.#about = await response.json(); // Luego, convierte la respuesta en JSON
            console.log(this.#about.short);
        } catch (error) {
            console.error("Error al cargar el JSON:", error);
        }
    }

    async setLanguage(lanButton){
        await this.getJsons();
        const lan=lanButton.innerHTML.toLowerCase();
        lanButton.innerHTML=lan==="es"?'en':'es';
        if (this.#typed) {
            this.#typed.destroy();
        }
        this.#typed=new Typed('.typed', {
                            strings: this.#domElementsTranslations["welcome_message"][lan].split(", "),
                            typeSpeed: 50,
                            backSpeed: 30,                
                            loop: true
                    });
        //about section
        document.getElementById("about_title").innerHTML=this.#domElementsTranslations.aboutTitle[lan];
        document.getElementById("shortText_about").innerHTML=this.#about.short[lan];
        
    }
}
