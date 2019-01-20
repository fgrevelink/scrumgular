export class Userstory {
    public id: number;
    public title: string;
    public description: string;
    public points: number;

    constructor(
        id: number,
        title: string,
        description: string,
        points: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.points = points;
    }
}
