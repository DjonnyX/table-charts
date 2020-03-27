import { TableRow, ITableMetricColumn } from "./table";
import { Chart, ChartMatrix } from "./chart";
import { ObjectTypes, MetricTypes } from "./types";

export class App {

    private _chart: Chart;

    private _chartMatrix: ChartMatrix;

    private _rows = new Array<TableRow>();

    private _table: HTMLTableElement;

    private _btnAddMetric: HTMLButtonElement;

    private _btnAddMetricHandler = (e: MouseEvent) => {
        this.addMetricHandler();
    };

    /**
     * Изменение данных в строке
     */
    onChangeRow = () => {
        this._chart.drawChart(this._rows.map(r => r.values));

        this._chartMatrix.drawChart(this.getMatrixValue(this._rows));
    }

    getMatrixValue(rows: Array<TableRow>) {
        const results = {
            metricsNames: MetricTypes.map(v => v),
            values: [0, 0, 0, 0, 0, 0, 0]
        };

        for (let i = 0, l = rows.length; i < l; i++) {
            results.values[MetricTypes.indexOf(rows[i].values.metricName)] += rows[i].values.value;
        }
        return results;
    }

    _removeRow = (ctxt: TableRow) => {
        const index = this._rows.indexOf(ctxt);
        if (index === -1) return;

        this._rows.splice(index, 1);

        this.onChangeRow();
    }

    constructor() {

        this._table = document.getElementById("tbl") as HTMLTableElement;

        this._btnAddMetric = document.getElementsByClassName("add")[0] as HTMLButtonElement;
        this._btnAddMetric.addEventListener("click", this._btnAddMetricHandler);

        const simpleHeader = document.createElement("h3");
        simpleHeader.textContent = "Simple";
        document.body.appendChild(simpleHeader);
        this._chart = new Chart();

        const matrixHeader = document.createElement("h3");
        matrixHeader.textContent = "Matrix";
        document.body.appendChild(matrixHeader);
        this._chartMatrix = new ChartMatrix();
    }

    /**
     * заполняетс дефолтовыми знаениями
     */
    addMetricHandler() {
        const row = new TableRow(this._table, this.onChangeRow, this._removeRow).add({
            metricName: MetricTypes[0],
            objectName: ObjectTypes[0],
            value: 0
        });

        this._rows.push(row);
    }
}