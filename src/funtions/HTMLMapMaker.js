// import React, { Component } from "react";
// import { OverlayView } from "window.google.maps.OverlayView";

const createHTMLMapMarker = ({
    OverlayView = window.google.maps.OverlayView,
    ...args
}) => {
    class HTMLMapMarker extends OverlayView {
        constructor() {
            super();
            this.error = args.error;
            this.falla = args.falla;
            this.nombre = args.nombre;
            this.position = args.position;
            this.html = args.html;
            this.setMap(args.map);
        }

        createDiv() {
            this.div = document.createElement("div");
            this.div.style.position = "absolute";
            if (this.html) {
                this.div.innerHTML = this.html;
            }
            window.google.maps.event.addDomListener(this.div, "click", event => {
                window.google.maps.event.trigger(this, "click");
                // console.log("Click desde div");
            });
            window.google.maps.event.addDomListener(this.div, "mouseover", () => {
                window.google.maps.event.trigger(this, "mouseover");
                // console.log("MOuseOver");
            });

            window.google.maps.event.addDomListener(this.div, "mouseout", () => {
                window.google.maps.event.trigger(this, "mouseout");
                // console.log("MOuseOUT");
            });

            window.google.maps.event.addDomListener(this.div, 'spider_click',() => { 
                window.google.maps.event.trigger(this, "spider_click");
            });
        }

        appendDivToOverlay() {
            const panes = this.getPanes();
            panes.overlayImage.appendChild(this.div);
        }

        positionDiv() {
            const point = this.getProjection().fromLatLngToDivPixel(this.position);
            let offset = 25;
            if (point) {
                this.div.style.left = `${point.x - offset}px`;
                this.div.style.top = `${point.y - offset}px`;
            }
        }

        draw() {
            if (!this.div) {
                this.createDiv();
                this.appendDivToOverlay();
            }
            this.positionDiv();
        }

        remove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        }

        getPosition() {
            return this.position;
        }

        getDraggable() {
            return false;
        }
    }

    return new HTMLMapMarker();
};

export default createHTMLMapMarker;
