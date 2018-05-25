export class GanttItem  {
    text: string;
    parent: number;
    type: 'task';
    open: true;
    unscheduled: false;
    start_date: Date;
    end_date: Date;
}

