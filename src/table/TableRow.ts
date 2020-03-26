import { ITableMetricColumn } from "./ITableMetricColumn";
import { MetricTypes, ObjectTypes } from "../types";

const MAX_VALUE_RANGE = [-2, 2];

export class TableRow {

    private _tblEl: HTMLTableRowElement;
    public get nativeElement() {
        return this._tblEl;
    }

    private _changeValueHandler = (e: any) => {
        if (e.target.value == MAX_VALUE_RANGE[0] || e.target.value == MAX_VALUE_RANGE[1]) e.target.style.borderColor = "red";
        else e.target.style.borderColor = "inherit";
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
        metricName.appendChild(this.createSelect(MetricTypes));
        this._tblEl.appendChild(metricName);

        const objectName = document.createElement("td");
        objectName.appendChild(this.createSelect(ObjectTypes));
        this._tblEl.appendChild(objectName);

        const value = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.step = "0.1";
        input.min = MAX_VALUE_RANGE[0].toString();
        input.max = MAX_VALUE_RANGE[1].toString();
        input.value = options.value.toString();
        value.appendChild(input);
        this._tblEl.appendChild(value);

        input.addEventListener("change", this._changeValueHandler)

        return this;
    }

    protected createSelect(values: string[]) {
        const select = document.createElement("select")
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.text = value;
            select.appendChild(option);
        });
        select.value = values[0];
        return select;
    }
}