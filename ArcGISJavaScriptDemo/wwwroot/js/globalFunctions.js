"use strict";

//#region Load view UI

/**
 * loadUnderGroundMenu - adds underground items to the view
 * @param {any} view
 * @param {any} map
 */
const loadUnderGroundMenu = (view, map) => {
    //Add html menu to the view
    view.ui.add("underGroundMenu", "top-right");

    //set click event handler on underground button
    document.getElementById("undergroundBtn").addEventListener("click", () => {
        view.goTo(map.presentation.slides.getItemAt(0).viewpoint, {
            duration: 1000
        });
    });

    //set click event handler on view underground checkbox
    document.getElementById("opacityInput").addEventListener("click", (event) => {
        if (event.currentTarget.className == 'esri-icon-checkbox-checked') {
            event.currentTarget.checked = false;
            event.currentTarget.className = 'esri-icon-checkbox-unchecked';
        } else {
            event.currentTarget.checked = true;
            event.currentTarget.className = 'esri-icon-checkbox-checked';
        }
        map.ground.opacity = event.currentTarget.checked ? 0.4 : 1;
    });
}

//#endregion Load View UI

//#region Load 3D styles

/**
 * loadGasLine3dStyles - load 3D line styles to each line layer
 * @param {any} map - current map (webscene)
 */
const loadGasLine3dStyles = map => {
    //grab top layers
    map.layers.forEach((groupLayer) => {
        if (groupLayer.type === 'group') {
            groupLayer.layers.forEach((layer) => {

                //using layer name as work around for null geometryType
                if (layer.type !== 'group' && layer.title.toLowerCase().includes('line')) {
                    try {
                        switch (layer.title.toLowerCase()) {
                            case "electric_lines": {
                                layer.renderer = _electricLinesUniqueValRenderer;
                            }
                                break;
                            case "telecomm_lines": {
                                layer.renderer = _teleCommLinesUniqueValRenderer;
                            }
                                break;
                            default: {
                                if (layer.renderer && layer.renderer.symbol && layer.renderer.symbol.symbolLayers && layer.renderer.symbol.symbolLayers.items[0].material.color) {
                                    let symbolColor = layer.renderer.symbol.symbolLayers.items[0].material.color;
                                    layer.renderer = _line3DRendererBySize(symbolColor);
                                    //layer.renderer = _line3DRenderer(symbolColor);
                                }
                            }
                        }
                    } catch (error) {
                        console.error("loadGasLine3dStyles error!: " + error);
                    }
                }
            });
        }
    });
}


//#endregion Load 3D styles
