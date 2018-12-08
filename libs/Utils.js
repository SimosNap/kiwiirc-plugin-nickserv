export function getString(key) {
    
    let data = {
        LoginText: 'Effettua il login ad un account',
        RegisterText : 'Registra il nickname attualmente in uso:',
        RegButton: 'REGISTRATI',
        IDText : 'Il nick scelto risulta registrato, inserisci la password per autenticarti.',
        IDButton : 'IDENTIFICATI',
        ConfirmReqText : 'Inserisci il codice di conferma ricevuto per email per completare la registrazione dell\' account.',
        ConfirmButton : 'CONFERMA REGISTRAZIONE'
    };
    //console.log(data[key]);

    return data[key];
}