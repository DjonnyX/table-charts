import { Chart } from "chart.js";
import { Colors } from "../colors";
import { ITableMetricColumn } from "../table";

export abstract class SimpleChart {

    protected _canvas: HTMLCanvasElement;
    public get nativeElement() {
        return this._canvas;
    }
    protected _context: CanvasRenderingContext2D;
    protected _chart: Chart;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.classList.add("chart")
        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);

        this._chart = new Chart(this._context, {
            type: 'bar',
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}