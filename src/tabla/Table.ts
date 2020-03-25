import { ITableMetricColumn } from "./ITableMetricColumn";
import { createTableCell, createTableRowElement } from "../utils/creators";

export class Table {

    private _tblEl: HTMLTableRowElement;

    constructor() {
        this._tblEl = createTableRowElement();
    }

    /**
     * Добавляет данные метрики в таблицу
     */
    public add(options: ITableMetricColumn) {
        const metricName = createTableCell();
        metricName.textContent = options.metricName;

        const objectName = createTableCell();
        objectName.textContent = options.metricName;

        const value = createTableCell();
        value.textContent = options.value.toString();

    }
}