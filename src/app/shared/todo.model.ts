export class Todo {
text: any;

    constructor (
        public title: string,
        public description?: string,
        public completed: boolean = false,
        ) {  }

}