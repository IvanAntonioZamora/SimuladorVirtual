const dataError = [{fechaCorta: 'error', folio: 999, Area: "Area 1", Piso: 10, Descripcion: "Descripcion 1", id: 1}];
const URL_AP = 'https://62e0f74698dd9c9df61a7436.mockapi.io/AreaPiso/';
const URL_SER = 'https://62e0f74698dd9c9df61a7436.mockapi.io/Servicios/';
let solicitudS = [];
let AreaP = [];
const folioEtq = document.querySelector('#Folio');
let confirm_solici = document.querySelector("#Envi_Solit");
const filasTabla = document.querySelector("#TablaAdmi");
let fechaCorta = '';
let folio = '';
let Area = '';
let Piso = '';
let Descripcion = '';
let id = '';
let estatus = '';
let usuario = '';