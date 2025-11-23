import { useState, useEffect } from "react";
import axios from "@/config/axios"
import { rowStyles } from "@/assets"

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    console.log(movies);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(fetchUrl);
            setMovies(response?.data?.results);

        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <div className="row__contents">
                <h2>{title}</h2>
                <div className="row__posters">
                    {movies.map((movie) => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            key={movie.id} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Row;



// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import Slider from "../../../../shared/components/Slider";
// import { applyCustomProps, setCustomObjectPreset, withModifiedEvent } from "../../../../canvas/utils/actions";
// import { isCustomObject } from "../Layers/LayersContextMenu";
// import { applyFilterToCustomObject } from "../../../../canvas/utils/canvasUtils";
// import Carousel from "../../../../shared/components/Carousel";
// import { Switch } from "@mantine/core";
// import ColorPickerDropdown from "../../../../shared/components/ColorPickerDropdown";
// import { object } from "yup";


// function MultiSelectionPanel() {
//     const activeCanvas = useSelector(({ canvasStoreSlice }) => canvasStoreSlice.canvas);
//     const activeObject = useSelector(({ canvasStoreSlice }) => canvasStoreSlice.activeObject);

//     const [opacity, setOpacity] = useState(100);
//     const [brightness, setBrightness] = useState(0);
//     const [scale, setScale] = useState(1);
//     const [hasCommonOpacity, setHasCommonOpacity] = useState(false);
//     const [hasCommonBrightness, setHasCommonBrightness] = useState(false);
//     const [hasCommonScale, setHasCommonScale] = useState(false);
//     const [customProperties, setCustomProperties] = useState([]);

//     const intervalRef = useRef();

//     useEffect(() => {
//         return () => {
//             if (intervalRef.current) {
//                 clearTimeout(intervalRef.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         if (!activeObject || activeObject.type !== 'activeSelection') return;

//         const objects = activeObject.getObjects();
//         if (objects.length === 0) return;

//         const firstOpacity = objects[0].opacity ?? 1;
//         const allSameOpacity = objects.every(obj => (obj.opacity ?? 1) === firstOpacity);
//         if (allSameOpacity) {
//             setOpacity(Math.round(firstOpacity * 100));
//             setHasCommonOpacity(true);
//         } else {
//             setOpacity(100);
//             setHasCommonOpacity(false);
//         }

//         const customObjects = objects.filter(obj => isCustomObject(obj));
//         if (customObjects.length > 0) {
//             const firstBrightness = customObjects[0].brightness ?? 0;
//             const allSameBrightness = customObjects.every(obj => (obj.brightness ?? 0) === firstBrightness);
//             if (allSameBrightness) {
//                 setBrightness(Math.round(firstBrightness * 100));
//                 setHasCommonBrightness(true);
//             } else {
//                 setBrightness(0);
//                 setHasCommonBrightness(false);
//             }
//         } else {
//             setHasCommonBrightness(false);
//         }

//         const firstScale = objects[0].scaleX ?? 1;
//         const allSameScale = objects.every(obj => (obj.scaleX ?? 1) === firstScale && (obj.scaleY ?? 1) === firstScale);
//         if (allSameScale) {
//             setScale(firstScale);
//             setHasCommonScale(true);
//         } else {
//             setScale(1);
//             setHasCommonScale(false);
//         }
//     }, [activeObject]);

//     const handleOpacityChange = (value) => {
//         setOpacity(value);

//         if (!activeObject || activeObject.type !== 'activeSelection') return;

//         const objects = activeObject.getObjects();
//         const opacityValue = value / 100;

//         objects.forEach(obj => {
//             withModifiedEvent(obj, activeCanvas, () => {
//                 obj.opacity = opacityValue;
//             }, ['opacity'], 'opacityChange')();
//         });

//         activeCanvas.requestRenderAll();
//         setHasCommonOpacity(true);
//     };

//     const handleBrightnessChange = (value) => {
//         clearTimeout(intervalRef.current);
//         setBrightness(value);

//         if (!activeObject || activeObject.type !== 'activeSelection') return;

//         const brightnessValue = value / 100;
//         const objects = activeObject.getObjects();
//         const customObjects = objects.filter(obj => isCustomObject(obj));

//         if (customObjects.length === 0) return;

//         intervalRef.current = setTimeout(() => {
//             customObjects.forEach(obj => {
//                 withModifiedEvent(obj, activeCanvas, () => {
//                     obj.brightness = brightnessValue;
//                     applyFilterToCustomObject(obj);
//                     obj.dirty = true;
//                 }, ['brightness'], 'brightnessChange')();
//             });

//             activeCanvas.requestRenderAll();
//             setHasCommonBrightness(true);
//         }, 200);
//     };

//     const handleScaleChange = (value) => {
//         setScale(value);

//         if (!activeObject || activeObject.type !== 'activeSelection') return;

//         const objects = activeObject.getObjects();

//         objects.forEach(obj => {
//             withModifiedEvent(obj, activeCanvas, () => {
//                 const center = obj.getCenterPoint();
//                 obj.set({
//                     scaleX: value,
//                     scaleY: value
//                 });
//                 obj.setPositionByOrigin(center, 'center', 'center');
//             }, ['scaleX', 'scaleY'], 'scaleChange')();
//         });

//         activeCanvas.requestRenderAll();
//         setHasCommonScale(true);
//     };

//     if (!activeObject || activeObject.type !== 'activeSelection') {
//         return null;
//     }

//     const objects = activeObject.getObjects();
//     const customObjects = objects.filter(obj => isCustomObject(obj));
//     const hasCustomObjects = customObjects.length > 0;

//     const getCustomizedProperties = () => {
//         if (!activeObject || activeObject.type !== "activeSelection") return [];

//         const selectedObjects = activeObject.getObjects();

//         // get all customProps arrays
//         const propsArrays = selectedObjects.map(obj => obj.custom?.customProps || []);

//         // take first object customProps as base
//         const baseProps = propsArrays[0];

//         // intersection based on id
//         const commonProps = baseProps.filter(baseProp =>
//             propsArrays.every(props =>
//                 props.some(p => (p.id === baseProp.id) && (p?.hasColor === baseProp?.hasColor))
//             )
//         );
//         console.log("common props are: ", commonProps)

//         return commonProps;
//     }

//     useEffect(() => {
//         const customProps = getCustomizedProperties();
//         setCustomProperties(customProps);
//     }, [])

//     const updateObjectPropertyVariation = (object, index, property) => {
//         let propertyObjectToUpdate = object.custom.customProps.find(p => p.id === property.id);
//         if (propertyObjectToUpdate) {
//             propertyObjectToUpdate.selectedVariationIndex = index;
//         }
//         applyCustomProps(object)
//         activeCanvas.requestRenderAll();
//         return propertyObjectToUpdate;
//     }

//     const handleVariationChange = (selectedVariation, index, property) => {
//         if (!activeObject || activeObject.type !== 'activeSelection') {
//             return null;
//         }

//         const objects = activeObject.getObjects();
//         objects.forEach(obj => {
//             withModifiedEvent(obj, activeCanvas, () => {
//                 updateObjectPropertyVariation(obj, index, property);
//             }, ['custom'], 'customObjectPropsChange', activeObject)();
//         })
//     }

//     const toggleObjectVisibility = (property) => {
//         if (!activeObject || activeObject.type !== "activeSelection") return [];

//         const objects = activeObject.getObjects();
//         objects.forEach((obj) => {
//             if (obj && isCustomObject(obj)) {
//                 withModifiedEvent(obj, activeCanvas, () => {
//                     let propertyObjectToUpdate = obj.custom.customProps.find(p => p.id === property.id);
//                     if (propertyObjectToUpdate) {
//                         propertyObjectToUpdate.value = !propertyObjectToUpdate.value;
//                     }
//                     obj.getObjects()
//                         .filter(object => propertyObjectToUpdate.layerIds.includes("" + object.id))
//                         .forEach(object => object.visible = propertyObjectToUpdate.value);
//                     obj.dirty = true;
//                     activeCanvas.requestRenderAll();
//                 }, ['custom'], 'customObjectPropsChange')()
//             }
//         })
//     }

//     return (
//         <div className="flex flex-col gap-2 pb-4 border-t border-dark-light pt-4">
//             {
//                 customProperties?.length && (
//                     <div className="border-dark-light border-b flex flex-col justify-center items-center gap-2 py-2">
//                         {customProperties.map(property => {
//                             if (property.hasVariations) {
//                                 return (
//                                     <Carousel
//                                         key={property.label}
//                                         label={property.label}
//                                         defaultValue={property.selectedVariationIndex}
//                                         items={property.variations}
//                                         hasColorInput={property.hasColor}
//                                         color={property.color}
//                                         onSelect={(selectedVariation, index) => handleVariationChange(selectedVariation, index, property)}
//                                     // onColorChange={(color) => handlePropColorChange(color, property)}
//                                     />
//                                 );
//                             } else if (property.isTogglable) {
//                                 return (
//                                     <div key={property.label} className="flex gap-2">
//                                         <h4 className="text-sm text-end">{property.label}</h4>
//                                         <div className="flex gap-2">
//                                             <Switch
//                                                 checked={property.value}
//                                                 color="orange"
//                                                 className="cursor-pointer"
//                                                 onChange={() => toggleObjectVisibility(property)}
//                                             />
//                                             {/* {!!property.hasColor && (
//                                                 <ColorPickerDropdown
//                                                     color={property.color}
//                                                 // setColor={(color) => handlePropColorChange(color, property)}
//                                                 />
//                                             )} */}
//                                         </div>
//                                     </div>
//                                 );
//                             } else {
//                                 return null;
//                             }
//                         })}
//                     </div>
//                 )
//             }

//             <div className="flex flex-col gap-2">
//                 <div className="grid grid-cols-2 gap-2">
//                     <h4 className="text-sm text-end">
//                         Opacity
//                     </h4>
//                     <Slider
//                         max={100}
//                         min={0}
//                         value={opacity}
//                         setRange={handleOpacityChange}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                     <h4 className="text-sm text-end">
//                         Scale
//                     </h4>
//                     <Slider
//                         min={0.1}
//                         max={3}
//                         step={0.1}
//                         value={scale}
//                         setRange={handleScaleChange}
//                     />
//                 </div>

//                 {hasCustomObjects && (
//                     <div className="grid grid-cols-2 gap-2">
//                         <h4 className="text-sm text-end">
//                             Brightness
//                         </h4>
//                         <Slider
//                             max={100}
//                             min={-100}
//                             value={brightness}
//                             setRange={handleBrightnessChange}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default MultiSelectionPanel;

