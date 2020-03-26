import { Chart as TChart } from "chart.js";
import { Colors } from "../colors";
import { ITableMetricColumn } from "src/table";

/**
 * "Performance" - Red,
 * "Disk usage" - Blue,
 * "Latency" - Yellow,
 * "Resource exhaustion" - Green,
 * "Bandwidth - Purple",
 * "Operational costs" - Orange,
 * "Reliability" - Brown
 */

export class Chart {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.width = 500;
        this._canvas.classList.add("chart")
        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);

        this.drawChart();
    }

    drawChart(values?: ITableMetricColumn[]) {
        this._canvas.width = this._canvas.height = 400;
        var myChart = new TChart(this._context, values ? {
            type: 'bar',
            data: {

                datasets: [{
                    label: '# of Votes',
                    data: values.map(v => v.value),
                    backgroundColor: values.map(v => this.getColor(v.metricName)),
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        } : null);
    }

    getColor(metricName: string): string {
        switch (metricName) {
            case "Performance":
                return Colors.Green;

            case "Disk usage":
                return Colors.Blue;

            case "Latency":
                return Colors.Brown;

            case "Resource exhaustion":
                return Colors.Orange;

            case "Bandwidth - Purple":
                return Colors.Purple;

            case "Operational costs":
                return Colors.Yellow;

            case "Reliability":
                return Colors.Red;

            return Colors.Gray;
        }
    }
}