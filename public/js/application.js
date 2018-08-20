function cargaPagina() {
    document.getElementById("tablaAclaraciones").style.display = "none";
    document.getElementById("tablaAcuerdos").style.display = "none";
    document.getElementById("tablaCirculares").style.display = "none";
    document.getElementById("tablaCodigos").style.display = "none";
    document.getElementById("tablaConceptos").style.display = "none";
    document.getElementById("tablaMemorandos").style.display = "none";
    document.getElementById("tablaDecretos").style.display = "none";
    document.getElementById("tablaLeyes").style.display = "none";
    document.getElementById("tablaNotas").style.display = "none";
    document.getElementById("tablaResoluciones").style.display = "none";
    document.getElementById("tablaTotal").style.display = "inline";
}
function mostrar(id) {
    if (id === "tablaAclaraciones") {
        identifier = 1;
    } else if (id === "tablaAcuerdos") {
        identifier = 2;
    } else if (id === "tablaCirculares") {
        identifier = 3;
    } else if (id === "tablaCodigos") {
        identifier = 4;
    } else if (id === "tablaConceptos") {
        identifier = 5;
    } else if (id === "tablaMemorandos") {
        identifier = 6;
    } else if (id === "tablaDecretos") {
        identifier = 7;
    } else if (id === "tablaLeyes") {
        identifier = 8;
    } else if (id === "tablaNotas") {
        identifier = 9;
    } else if (id === "tablaResoluciones") {
        identifier = 10;
    } else if (id === "tablaTotal") {
        identifier = 11;
    }
    procesarInformacion(identifier);
}
function procesarInformacion(identifier) {
    switch (identifier) {
        case 1:
            var tablaAclaraciones = document.getElementById("tablaAclaraciones");
            tablaAclaraciones.style.display = "inline";
            tablaAclaraciones.style.overflow = "scroll";
            ocultar(tablaAclaraciones);
            cuentaFila();

            break;
        case 2:
            var tablaAcuerdos = document.getElementById("tablaAcuerdos");
            tablaAcuerdos.style.display = "inline";
            ocultar(tablaAcuerdos);
            break;
        case 3:
            var tablaCirculares = document.getElementById("tablaCirculares");
            tablaCirculares.style.display = "inline";
            ocultar(tablaCirculares);
            break;
        case 4:
            var tablaCodigos = document.getElementById("tablaCodigos");
            tablaCodigos.style.display = "inline";
            ocultar(tablaCodigos);
            break;
        case 5:
            var tablaConceptos = document.getElementById("tablaConceptos");
            tablaConceptos.style.display = "inline";
            ocultar(tablaConceptos);
            break;
        case 6:
            var tablaMemorandos = document.getElementById("tablaMemorandos");
            tablaMemorandos.style.display = "inline";
            ocultar(tablaMemorandos);
            break;
        case 7:
            var tablaDecretos = document.getElementById("tablaDecretos");
            tablaDecretos.style.display = "inline";
            ocultar(tablaDecretos);
            break;
        case 8:
            var tablaLeyes = document.getElementById("tablaLeyes");
            tablaLeyes.style.display = "inline";
            ocultar(tablaLeyes);
            break;
        case 9:
            var tablaNotas = document.getElementById("tablaNotas");
            tablaNotas.style.display = "inline";
            ocultar(tablaNotas);
            break;
        case 10:
            var tablaResoluciones = document.getElementById("tablaResoluciones");
            tablaResoluciones.style.display = "inline";
            ocultar(tablaResoluciones);
            break;
        case 11:
            var tablaTotal = document.getElementById("tablaTotal");
            tablaTotal.style.display = "inline";
            ocultar(tablaTotal);
            break;
    }
};



function ocultar(id) {
    if (id == tablaAclaraciones) {
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";
    } else if (id == tablaAcuerdos) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";
    } else if (id == tablaCirculares) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaCodigos) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaConceptos) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaMemorandos) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaDecretos) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaLeyes) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";

    } else if (id == tablaNotas) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";
    } else if (id == tablaNotas) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";
    } else if (id == tablaResoluciones) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaTotal").style.display = "none";
    } else if (id == tablaTotal) {
        document.getElementById("tablaAclaraciones").style.display = "none";
        document.getElementById("tablaAcuerdos").style.display = "none";
        document.getElementById("tablaCirculares").style.display = "none";
        document.getElementById("tablaCodigos").style.display = "none";
        document.getElementById("tablaConceptos").style.display = "none";
        document.getElementById("tablaMemorandos").style.display = "none";
        document.getElementById("tablaDecretos").style.display = "none";
        document.getElementById("tablaLeyes").style.display = "none";
        document.getElementById("tablaNotas").style.display = "none";
        document.getElementById("tablaResoluciones").style.display = "none";
    }
}

