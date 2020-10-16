export default function cargarTanque(props) {
    const {
        id,
        altura,
        altura_max,
    } = props;

    if (!document.getElementById("root")) {
        return null;
    }
    if (!window.FusionCharts) {
        this.timeout = setTimeout(() => {
            this.cargarTanque();
        }, 1000);
        return null;
    }

    const dataSource = {
        chart: {
            lowerlimit: "0",
            upperlimit: `${altura_max.toFixed(2)}`,
            lowerlimitdisplay: "0",
            upperlimitdisplay: `${altura_max.toFixed(2)} Mts`,
            numbersuffix: "Mts",
            cylfillcolor: "#007de4",
            plottooltext: `Altura: <b>${altura.toFixed(2)} mts</b>`,
            theme: "fusion",
            baseFont: "Poppins, sans-serif",
            bgColor: "#ffffff",
            bgAlpha: "100",
            baseFontColor: "#000000"
        },
        value: `${altura}`
    };

    // document.getElementById(id).innerHTML = null;

    // var div = document.getElementById(id)
    window.FusionCharts.ready(function () {
        var myChart = new window.FusionCharts({
            type: "cylinder",
            renderAt: id,
            width: "200",
            height: "170",
            dataFormat: "json",
            dataSource
        }).render();
    });
}
