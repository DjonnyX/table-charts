import { ITableMetricColumn } from "./ITableMetricColumn";

export class TableRow {

    private _tblEl: HTMLTableRowElement;
    public get nativeElement() {
        return this._tblEl;
    }

    constructor(private _ctxt: HTMLTableElement) {
        this._tblEl = document.createElement("tr");
        this._ctxt.appendChild(this._tblEl);
    }

    /**
     * Добавляет данные метрики в таблицу
     */
    public add(options: ITableMetricColumn) {
        const metricName = document.createElement("td");
        metricName.textContent = options.metricName;
        this._tblEl.appendChild(metricName);

        const objectName = document.createElement("td");
        objectName.textContent = options.objectName;
        this._tblEl.appendChild(objectName);

        const value = document.createElement("td");
        value.textContent = options.value.toString();
        this._tblEl.appendChild( value);

        return this;
    }
}