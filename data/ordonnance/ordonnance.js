class Ordonnance {
    constructor(Id, Id_Hosix, designation, prescripteur, date, etat, Id_P, Id_S) {
        this.Id = Id;
        this.Id_Hosix = Id_Hosix;
        this.designation = designation;
        this.prescripteur = prescripteur;
        this.date = date;
        this.etat = etat;
        this.Id_P = Id_P;
        this.Id_S = Id_S;
    }
}

module.exports = Ordonnance;
