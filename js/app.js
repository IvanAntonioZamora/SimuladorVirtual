mostrarFecha();
folioS();
Select();

$(document).ready(function () {
    $('#exampleTabla').DataTable();
    });

const agregarServicio = async ()=> {
    fechaCorta = mostrarFecha();
    folio = parseInt(folio);
    Area =  Area.toUpperCase();
    Piso = parseInt(Piso);
    let Descripcion1 = document.querySelector("#Descripcion");
    Descripcion = (Descripcion1.value).toUpperCase();
    estatus = "Pendiente";
    usuario = "Usuario " + folio;
    id = `${folio}`;
    const datos = {
        fechaCorta: fechaCorta,
        folio: folio,
        area: Area,
        piso: Piso,
        descripcion: Descripcion,
        estatus: estatus,
        usuario: usuario,
    }
    const BODY = JSON.stringify(datos);
    const OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: BODY
        }
    const response = await fetch(URL_SER, OPTIONS)

    respuesta = await response.json()
    id = respuesta.id
    cargoTablaServicio();
    reset();
    mostrarFecha();
    folioS();
    PisoVa();
}

const CancelarServicio = (param)=> {
    const resultado = solicitudS.find(c => c.id == param);
    modificarCurso(resultado);
}

const AtendidoServicio = (param)=> {
    const resultado = solicitudS.find(c => c.id == param);
    atendidoCurso(resultado);
}

const modificarCurso = async (resultado)=> {
    const idd = parseInt(resultado.id);
    const datos = {
        fechaCorta: resultado.fechaCorta,
        folio: resultado.folio,
        area: resultado.area,
        piso: resultado.piso,
        descripcion: resultado.descripcion,
        estatus: "Cancelado",
        usuario: resultado.usuario,
    }
    const FULLURL = `${URL_SER}${idd}`
        const BODY = JSON.stringify(datos)
        const OPTIONS = {
                        method: 'PUT',
                        headers: {
                                    'Content-Type': 'application/json'
                                },
                        body: BODY
                        }
        const response = await fetch(FULLURL, OPTIONS)
              respuesta = await response.json()
    cargoTablaServicio();
}

const atendidoCurso = async (resultado)=> {
    const idd = parseInt(resultado.id);
    const datos = {
        fechaCorta: resultado.fechaCorta,
        folio: resultado.folio,
        area: resultado.area,
        piso: resultado.piso,
        descripcion: resultado.descripcion,
        estatus: "Atendido",
        usuario: resultado.usuario,
    }
    const FULLURL = `${URL_SER}${idd}`
        const BODY = JSON.stringify(datos)
        const OPTIONS = {
                        method: 'PUT',
                        headers: {
                                    'Content-Type': 'application/json'
                                },
                        body: BODY
                        }
        const response = await fetch(FULLURL, OPTIONS)
              respuesta = await response.json()
    cargoTablaServicio();
}

confirm_solici.addEventListener("click", agregarServicio);