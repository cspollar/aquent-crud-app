export class Person {
    personId: number | null;
    firstName: string;
    lastName: string;
    emailAddress: string;
    clientName: string;
    _links: any;

    constructor(person: Partial<Person> = {}) {
        this.personId = person?.personId || null;
        this.firstName = person?.firstName || '';
        this.lastName = person?.lastName || '';
        this.emailAddress = person?.emailAddress || '';
        this.clientName = person?.clientName || '';
        this._links = person?._links || {};

    }
}