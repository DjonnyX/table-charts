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
        const cell = createTableCell();
        
    }
}