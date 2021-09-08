"use strict";

//#region Scene, Map and Layer Variables
const _portalUrl = "";
const _sceneId = "0359bb9202614d7ca2bd0acc278422d6";

//#endregion Scene, Map and Layer Variables

//#region display widget variables

const _showSearchTool = true;
const _showBaseMapGallery = true;
const _showLayerList = true;
const _showHomeButton = true;
const _showFilter = false;
const _showLegend = true;
const _showUnderground = true;

//use for square or round tube?
let _roundTube = false;


//#endregion show widget variables

//#region Layer Symbology

//SQUARE Tube
//options.profile = "quad",
//options.height = 30,
//options.width = 30,
//options.cap = "square"
//SQUARE Tube

//_line3DRendererBySize - line renderer for all lines by SIZE
//symColor = color for the symbol
const _line3DRendererBySize = (symColor) => {
    return {
        type: "simple",
        symbol: {
            type: "line-3d", // autocasts as new SimpleRenderer()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                material: { color: symColor },

                //ROUND tube
                profile: "circle",  // creates a round shape
                //width: 20,  // path width will also set the height to the same value
                cap: "round"
                //ROUND tube

                //SQUARE tube
                //profile: "quad",
                //height: 30,
                //width: 30,
                //cap: "square"
                //SQUARE tube

            }]
        },
        visualVariables: [{
            type: "size",
            field: "D",
            valueUnit: "inches"  //converts and extrudes all data values in inches
            //valueUnit: "feet"  //converts and extrudes all data values in feet
        }]
    };
}

//testing unique value renderer - with 3D
const _createLineSymbol3D = (fieldValue, symColor) => {
    return {
        value: fieldValue,
        symbol: {
            type: "line-3d", // autocasts as new SimpleRenderer()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                material: { color: symColor },

                //ROUND tube
                profile: "circle",  // creates a round shape
                width: .5,  // path width will also set the height to the same value
                cap: "round"
                //ROUND tube

                //SQUARE tube
                //profile: "quad",
                //height: .5,
                //width: .5,
                //cap: "square"
                //SQUARE tube

            }]
        },
        label: fieldValue
    };
}

//testing unique value renderer - hopefully can replace with 3d symbols
const _createLineSymbol2D = (value, color) => {
    return {
        value: value,
        symbol: {
            color: color,
            type: "simple-line",
            width: "1px",
            style: "solid",
            outline: {
                style: "none"
            }
        },
        label: value
    };
}

//unique value renderer for Electric Lines based on FeatType 
const _electricLinesUniqueValRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "Electric Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Electric Box Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Transmission", "rgba(168, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Transmission", "rgba(168, 0, 0, 255)")
    ]
};

//unique value renderer for TeleComm Lines based on FeatType 
const _teleCommLinesUniqueValRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "TeleComm Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Bridge Attachment Box Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Bridge Attachment Circular Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Communications Circular Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Communications Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Direct Buried Cable Communications", "rgba(255, 170, 0, 255)"),
        _createLineSymbol3D("Overhead Telecommunications", "rgba(255, 211, 127, 255)")
    ]
};

//unique value renderer for Electric Lines based on FeatType and Size
const _electricLinesUniqueValRendererAndSize = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "Electric Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Electric Box Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Electric Circular Duct Transmission", "rgba(168, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Distribution", "rgba(255, 0, 0, 255)"),
        _createLineSymbol3D("Overhead Electric Transmission", "rgba(168, 0, 0, 255)")
    ],
    visualVariables: [{
        type: "size",
        field: "D",
        valueUnit: "inches"  //converts and extrudes all data values in inches
        //valueUnit: "feet"  //converts and extrudes all data values in feet
    }]
};

//unique value renderer for TeleComm Lines based on FeatType and Size
const _teleCommLinesUniqueValRendererAndSize = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    legendOptions: {
        title: "Feature type"
    },
    defaultLabel: "TeleComm Lines",
    field: "FeatType",
    uniqueValueInfos: [
        _createLineSymbol3D("Bridge Attachment Box Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Bridge Attachment Circular Duct", "rgba(230, 152, 0, 255)"),
        _createLineSymbol3D("Communications Circular Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Communications Duct", "rgba(168, 112, 0, 255)"),
        _createLineSymbol3D("Direct Buried Cable Communications", "rgba(255, 170, 0, 255)"),
        _createLineSymbol3D("Overhead Telecommunications", "rgba(255, 211, 127, 255)")
    ],
    visualVariables: [{
        type: "size",
        field: "D",
        valueUnit: "inches"  //converts and extrudes all data values in inches
        //valueUnit: "feet"  //converts and extrudes all data values in feet
    }]
};

//#endregion Layer Symbology