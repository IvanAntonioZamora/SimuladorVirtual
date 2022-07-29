//API y Tabla
function mostrarFecha() {
  let fecha_horas = new Date();
  let fechaCorta = fecha_horas.toLocaleString();

  //creacion de etiqueta HTML
  const fecha_hora = document.querySelector("#Fecha");
  const f_hora = `<label for="fecha_hora"><strong>Fecha: </strong>${fechaCorta}</label>`;
  fecha_hora.innerHTML = f_hora;
  return fechaCorta;
}

function reset() {
  const formM = document.querySelector("#Solicitud");
  formM.reset();
}

const obtenerAreaPiso = async () => {
  const response = await fetch(URL_AP);
  response.status >= 400 ? (data = dataError) : (data = response.json());
  return data;
};

const obtenerServicios = async () => {
  const response = await fetch(URL_SER);
  response.status >= 400 ? (data = dataError) : (data = response.json());
  return data;
};

const folioS = async () => {
  AreaP = await obtenerServicios();
  folio = AreaP.length;
  if (folio == 0) {
    folio = 1;
  } else {
    folio += 1;
  }

  const fol_Etq = `<label for="folioEtq"><strong>Folio: </strong>${folio}</label>`;
  folioEtq.innerHTML = fol_Etq;
  return folio;
};

function PisoVa() {
  let Pisouno = document.querySelector("#Piso");
  const Piso1 = `<label for="folioEtq"><strong>Piso: </strong></label>`;
  Pisouno.innerHTML = Piso1;
}

const Select = async () => {
  let Selectuno = document.querySelector("#select1");
  SelectValue = 0;
  PisoVa();
  let contenidoJSON = await obtenerAreaPiso();
  for (const i of contenidoJSON) {
    const { Area } = i;
    Areauno = Area;
    SelectValue++;
    const Optionuno = `<option value="${SelectValue}">${Areauno}</option>`;
    Selectuno.innerHTML += Optionuno;
  }
  Selectuno.addEventListener("change", () => {
    SelectValue = 0;
    if (Selectuno.value != "Selecciona la opción") {
      for (const iterator of contenidoJSON) {
        SelectValue++;
        let variable = Selectuno.value;
        if (variable == SelectValue) {
          Piso = iterator.Piso;
          Area = iterator.Area;
          let Pisouno = document.querySelector("#Piso");
          const Piso1 = `<label for="folioEtq" id="PisoV"><strong>Piso: </strong>${Piso}</label>`;
          Pisouno.innerHTML = Piso1;
          return Piso, Area;
        }
      }
    } else {
      PisoVa();
    }
  });
};

const HTMLtabla = (fila) => {
  return `<tr>
                <td>${fila.folio}</td>
                <td>${fila.usuario}</td>
                <td>${fila.fechaCorta}</td>
                <td>${fila.area}</td>
                <td>${fila.piso}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#Modal${parseInt(
                      fila.folio
                    )}"><img src="./assets/iconos/bxs-comment-dots.svg" alt="ver descripción"> Ver</button>
                    <!-- Modal -->
                        <div class="modal fade" id="Modal${parseInt(
                          fila.folio
                        )}" tabindex="-1" aria-labelledby="ModalLabelDesc" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ModalLabelDesc">Descripción</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-start"><strong>Folio: </strong>${
                                      fila.folio
                                    }<br><strong>Área: </strong>${
    fila.area
  }<br><br>${fila.descripcion}
                                    </div>
                                    <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </td>
                <td>${fila.estatus}</td>
                <td>
                    <a class="text-decoration-none" onclick="AtendidoServicio(${fila.folio})" href="" id="${fila.folio}"><img src="./assets/iconos/bxs-check-square.svg" alt="Atendido"></a>
                    <a class="text-decoration-none" onclick="CancelarServicio(${fila.folio})" href="" id="${fila.folio}"><img src="./assets/iconos/bxs-no-entry.svg" alt="Cancelar"></a>
                    <a class="text-decoration-none" onclick="DescargarServicio(${fila.folio})" href="" id="${fila.folio}"><img src="./assets/iconos/bxs-file-doc.svg" alt="Descargar Archivo"></a>
                </td>
            </tr>`;
};

const cargoTablaServicio = async () => {
  let armoTabla = "";
  solicitudS = await obtenerServicios();
  await solicitudS.forEach((servicio) => (armoTabla += HTMLtabla(servicio)));
  filasTabla.innerHTML = armoTabla;
};
cargoTablaServicio();
