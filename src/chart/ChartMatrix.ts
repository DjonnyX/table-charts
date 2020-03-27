import { Chart as TChart } from "chart.js";
import { Colors } from "../colors";
import { ITableMetricColumn } from "../table";
import { SimpleChart } from "./SimpleChart";

export class ChartMatrix extends SimpleChart {

    drawChart(values?: any) {

        this._chart.data = {
            labels: values.metricNames,
            datasets: [{
                label: '# of Votes',
                data: values.values,
                backgroundColor: [Colors.Blue],
                borderWidth: 1
            }]
        }

        this._chart.update();
    }
}