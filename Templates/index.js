import template1 from './template1/template1';
import elements from '../datas/elements';

import buttonCamera from './template1/buttonCamera'

document.querySelector('.scriptTemplate').innerHTML = buttonCamera.script

let templateTest = document.querySelector("#cameraClick").innerHTML;
let template1Func = Handlebars.compile(templateTest);


let temp1FromObj1 = template1Func(elements)
document.querySelector("#template1area").innerHTML = temp1FromObj1;