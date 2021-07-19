
export class User{
    constructor(
        public email: string,
        public userId: string,
        private _token,
        private _tokenExpirationDate: Date
    ){}

    get token(): string {
        if(!this._token || (new Date() >this._tokenExpirationDate)){
            return null
        }
        return this._token;
    }
}