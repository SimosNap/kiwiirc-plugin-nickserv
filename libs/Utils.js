let data = {
    LoginText: 'Effettua il login ad un account',
    RegisterText : 'Registra un Account',
    RegButton: 'REGISTRATI',
    IDText : 'Il nick scelto risulta registrato, inserisci la password per autenticarti.',
    IDButton : 'IDENTIFICATI',
    ConfirmReqText : 'Inserisci il codice di conferma ricevuto per email per completare la registrazione dell\' account.',
    ConfirmButton : 'CONFERMA REGISTRAZIONE'
};

export function getString(key) {
    return data[key];
}