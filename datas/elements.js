const elements = [
        {
            name: "Notre Dame de Strasbourg",
            position: [-2.6, 4, 0.2],
            lookAt: [-1, 3, 0],
            svg:"/images/cath.svg",
            desc1: "La cathédrale Notre-Dame de Strasbourg est assurément un des chefs d’œuvre de l’architecture médiévale, mêlant le style roman de son abside et de son transept au style gothique de sa nef et de sa façade. Sa haute flèche, qui culmine à 143 mètres, a été longtemps le monument le plus haut de la chrétienté.",
            desc2: "Parmi les merveilles qu’elle abrite, les millions de visiteurs, qu’elle attire chaque année, admirent la chaire du grand prédicateur Geiler de Kaysersberg, la célèbre Horloge astronomique réparée par Schwilgué au XIXème siècle, le Pilier des Anges, qui représente en trois dimensions le Jugement Dernier, les grandes orgues restaurées par Silbermann au XVIIIème siècle, ainsi que les multiples vitraux, dont la grande rosace de façade.",
            coord: {
                north: "48° 34' 54″ north",
                east: " 7° 45' 02″ east",
            },
            infos: {
                height:"142m",
                date: "1176-1439",
                visitors: "4 millions/an"
            },
            img: [
                "/images/monuments/cathedral-1.jpeg",
                "/images/monuments/cathedral-2.jpeg",
                "/images/monuments/cathedral-3.jpeg"
            ]
        } ,
        {
            name: "Eglise Ste Madelaine",
            position: [0, 4, -1],
            lookAt: [-1, 3, 1],
            description: "Hey c'est l'element 2"
        },
        {
            name: "Eglise St Paul",
            position: [0, 4, 0],
            lookAt: [.5, 3, -1.5],
            description: "Hey c'est l'element 3"
        },
        {
            name: "Eglise St Pierre le jeune",
            position: [-1.5, 4, -1],
            lookAt: [-2, 3.3, -2],
            description: "Hey c'est l'element 3"
        },
        {
            name: "Gare Central",
            position: [-3.5, 4, 0],
            lookAt: [-5, 3, -1],
            description: "Hey c'est l'element 3"
        },
        {
            name: "Wild Code School",
            position: [1.9, 4, 2],
            lookAt: [0.9, 3.2, 2.5],
            description: "Hey c'est l'element 3"
        },
        {
            name: "Quartier Européen",
            position: [5, 5, -1],
            lookAt: [2, 3, -4],
            description: "Hey c'est l'element 3"
        },
]

export default elements;