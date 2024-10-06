export enum UserType {
    admin = "admin",
    medecin = "medecin",
    patient = "patient",
    superadmin = "superadmin",
  }

export interface IUser {
    id: string;
    email: string;
    prenom: string;
    nom: string;
    adresse: string;
    password: string;
    profil: UserType;
    sexe: string;
    age: number;
    numero: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export type UserFormData = Partial<{
    email: string;
    prenom: string;
    nom: string;
    adresse: string;
    password: string;
    profil: UserType;
    sexe: string;
    age: number;
    numero: string;
    id?: string;
}>;