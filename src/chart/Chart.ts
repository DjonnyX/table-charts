import { Chart as TChart } from "chart.js";
import { Colors } from "../colors";
import { ITableMetricColumn } from "src/table";

export class Chart {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _chart: TChart;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.classList.add("chart")
        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);

        this._chart = new TChart(this._context, {
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

    drawChart(values?: ITableMetricColumn[]) {
        this._canvas.width = this._canvas.height = 400;
        console.log(values.map(v => v.value))

        this._chart.data = {
            labels: values.map(v => v.metricName),
            datasets: [{
                label: '# of Votes',
                data: values.map(v => v.value),
                backgroundColor: values.map(v => this.getColor(v.metricName)),
                borderWidth: 1
            }]
        }
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