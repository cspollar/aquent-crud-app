export class Client {
    clientName: number | null;
    websiteUri: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    _links: {
        self: {
            href: string;
        },
        client: {
            href: string;
        },
        contacts: {
            href: string;
        }
    };

    constructor(person: Partial<Client> = {}) {
        this.clientName = person?.clientName || null;
        this.websiteUri = person?.websiteUri || '';
        this.phoneNumber = person?.phoneNumber || '';
        this.streetAddress = person?.streetAddress || '';
        this.city = person?.city || '';
        this.state = person?.state || '';
        this.zipCode = person?.zipCode || '';
        this._links = person?._links || {
            self: {
                href: ''
            },
            client: {
                href: ''
            },
            contacts: {
                href: ''
            }
        };

    }
}
