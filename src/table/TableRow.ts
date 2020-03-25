import { ITableMetricColumn } from "./ITableMetricColumn";
import { createTableCell, createTableRowElement } from "../utils/creators";

export class TableRow {

    private _tblEl: HTMLTableRowElement;
    public get nativeElement() {
        return this._tblEl;
    }

    constructor() {
        this._tblEl = createTableRowElement();
    }

    /**
     * Добавляет данные метрики в таблицу
     */
    public add(options: ITableMetricColumn) {
        const metricName = createTableCell();
        metricName.textContent = options.metricName;
        this._tblEl.appendChild(metricName);

        const objectName = createTableCell();
        objectName.textContent = options.objectName;
        this._tblEl.appendChild(objectName);

        const value = createTableCell();
        value.textContent = options.value.toString();
        this._tblEl.appendChild( value);

    }
}