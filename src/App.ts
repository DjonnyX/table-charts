import { TableRow, ITableMetricColumn } from "./table";
import { Chart, ChartMatrix } from "./chart";
import { ObjectTypes, MetricTypes } from "./types";

export class App {

    private _chart: Chart;

    private _chartMatrix: ChartMatrix;

    private _rows = new Array<TableRow>();

    private _table: HTMLTableElement;

    private _openModal: HTMLButtonElement;

    private _modal: HTMLDivElement;

    private _overlay: HTMLDivElement;

    private _btnAddMetric: HTMLButtonElement;

    private _btnACancelMetric: HTMLButtonElement;

    private _openModalHandler = (e: MouseEvent) => {
        this.openModal();
    };

    private _btnAddMetricHandler = (e: MouseEvent) => {
        this.addMetricHandler();
    };

    private _btnACancelMetricHandler = (e: MouseEvent) => {
        this.closeModal();
    };

    /**
     * Изменение данных в строке
     */
    onChangeRow = () => {
        this._chart.drawChart(this._rows.map(r => r.values));

        const perfomanse =
            this._chartMatrix.drawChart(this.getMatrixValue(this._rows));
    }

    getMatrixValue(rows: Array<TableRow>) {
        const results = {
            metricsNames: MetricTypes.map(v => v),
            values: [0,0,0,0,0,0,0]
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

        this._modal = document.getElementById("modal") as HTMLTableElement;

        this._overlay = document.getElementById("overlay") as HTMLTableElement;

        this._openModal = document.getElementById("add-metric") as HTMLButtonElement;
        this._openModal.addEventListener("click", this._openModalHandler);

        this._btnACancelMetric = this._modal.getElementsByClassName("cancel")[0] as HTMLButtonElement;
        this._btnACancelMetric.addEventListener("click", this._btnACancelMetricHandler);

        this._btnAddMetric = this._modal.getElementsByClassName("add")[0] as HTMLButtonElement;
        this._btnAddMetric.addEventListener("click", this._btnAddMetricHandler);

        this.closeModal();

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
     * открывается модалка
     */
    openModal() {
        this._modal.classList.remove("hide");
        this._overlay.classList.remove("hide");
        this._btnACancelMetric.classList.remove("hide");
        this._btnAddMetric.classList.remove("hide");

        this._openModal.classList.add("hide");

    }

    /**
     * закрывается модалка
     */
    closeModal() {
        this._modal.classList.add("hide");
        this._overlay.classList.add("hide");
        this._btnACancelMetric.classList.add("hide");
        this._btnAddMetric.classList.add("hide");

        this._openModal.classList.remove("hide");
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