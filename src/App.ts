import { TableRow } from "./table";
import { Chart } from "./chart";
import { ObjectTypes, MetricTypes } from "./types";

export class App {

    private _chart: Chart;

    protected rows = new Array<TableRow>();

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

        this._chart = new Chart();

        this.closeModal();

        this._chart.drawChart(this.rows.map(r => r.values));
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
        const row = new TableRow(this._table).add({
            metricName: MetricTypes[0],
            objectName: ObjectTypes[0],
            value: 0
        });

        this.rows.push(row);
    }

    /**
     * Обновление графика
     */
    drawChart() {
        this._chart.drawChart(this.rows.map(r => r.values));
    }
}