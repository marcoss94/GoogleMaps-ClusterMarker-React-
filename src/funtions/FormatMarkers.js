export default function FormatMarkers(data) {
    return data.map(item => {

        const {
            id,
            latitud,
            longitud,
            estado,
            nombre,
            cantSectores,
            tipo,
            cantPuntos,
            servicioID,
            error,
            falla,
            sectorID,
            altura_max,
            H_TQ,
            H_MAX_TQ,
            fechadata,
            altura_state,
            altura,
            porcentaje,
            PUMP_PERF_STATE,
            P_PRESSURE
        } = item;

        var newobj = {};
        newobj.id = id;
        newobj.lat = parseFloat(latitud);
        newobj.lng = parseFloat(longitud);
        newobj.icon = null;
        newobj.nombre = nombre;
        newobj.estado = estado;
        newobj.cantSectores = cantSectores;
        newobj.tipo = tipo;
        newobj.error = error;
        newobj.falla = falla;
        newobj.cantPuntos = cantPuntos;
        newobj.servicioID = servicioID;
        newobj.sectorID = sectorID;

        newobj.H_TQ = parseFloat(H_TQ);
        newobj.H_MAX_TQ = parseFloat(H_MAX_TQ);
        newobj.H_TQ_porcentaje = ( newobj.H_TQ /  newobj.H_MAX_TQ) * 100;

        newobj.PUMP_PERF_STATE = PUMP_PERF_STATE;
        newobj.P_PRESSURE = parseFloat(P_PRESSURE);


        newobj.altura_max = altura_max;
        newobj.fechadata = fechadata;
        newobj.altura_state = altura_state;
        newobj.altura = altura;
        newobj.porcentaje = porcentaje;

        newobj.info_text = `<div>
      <h3>
      ${nombre}
      </h3>
      <h4>
      ${id}
      </h4>
      <h4>
      ${tipo}
      </h4>
      
      <hr/>`;
        newobj.info_text += `</div>`;
        return newobj;
    });
}