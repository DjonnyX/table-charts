import { Chart as TChart } from "chart.js";
import { Colors } from "../colors";
import { ITableMetricColumn } from "../table";
import { SimpleChart } from "./SimpleChart";

export class Chart extends SimpleChart {

    drawChart(values?: ITableMetricColumn[]) {

        this._chart.data = {
            labels: values.map(v => v.metricName),
            datasets: [{
                label: '# of Votes',
                data: values.map(v => v.value),
                backgroundColor: values.map(v => this.getColor(v.metricName)),
                borderWidth: 1
            }]
        }

        this._chart.update();
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