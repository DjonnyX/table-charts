import { ITableMetricColumn } from "./ITableMetricColumn";
import { MetricTypes, ObjectTypes } from "../types";

const MAX_VALUE_RANGE = [-2, 2];

export class TableRow {

    private _tblEl: HTMLTableRowElement;
    public get nativeElement() {
        return this._tblEl;
    }

    public get values() {
        const value = Number.parseFloat(this._tblEl.getElementsByClassName("value")[0].textContent);
        const metricName = this._tblEl.getElementsByClassName("metric")[0].textContent;
        const objectName = this._tblEl.getElementsByClassName("object")[0].textContent;

        return {
            metricName,
            objectName,
            value
        }
    }

    private _changeValueHandler = (e: any) => {
        if (e.target.value == MAX_VALUE_RANGE[0] || e.target.value == MAX_VALUE_RANGE[1]) e.target.style.borderColor = "red";
        else e.target.style.borderColor = "inherit";

        if (this._onChange) this._onChange();
    }

    private _changeSelectHandlers = (e: any) => {
        this._onChange();

        if (this._onChange) this._onChange();
    }

    constructor(private _ctxt: HTMLTableElement, private _onChange?: () => void) {
        this._tblEl = document.createElement("tr");
        this._ctxt.appendChild(this._tblEl);
    }

    /**
     * Добавляет данные метрики в таблицу
     */
    public add(options: ITableMetricColumn) {
        const metricName = document.createElement("td");
        metricName.classList.add("metric")
        metricName.appendChild(this.createSelect(MetricTypes));
        this._tblEl.appendChild(metricName);

        const objectName = document.createElement("td");
        objectName.classList.add("object")
        objectName.appendChild(this.createSelect(ObjectTypes));
        this._tblEl.appendChild(objectName);

        const value = document.createElement("td");
        const input = document.createElement("input");
        input.classList.add("value")
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
        select.addEventListener("change", this._changeSelectHandlers)
        return select;
    }
}