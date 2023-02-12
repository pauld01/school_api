import express from "express"
import { buildSchema } from "graphql"
import { PrismaClient } from "@prisma/client"
import { graphqlHTTP } from "express-graphql"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

let schema = buildSchema(`
    type Pole {
        id_pole : Int
        nom_pole : String
        parcours : [Parcours]
    }

    type Statut {
        id_statut : Int
        nom_statut : String
        personnel : [Personnel]
    }

    type Promo {
        id_promo : Int
        annnes_promo : String
        classe : [Classe]
    }

    type Personnel {
        id_personnel : Int
        nom_personnel : String
        prenom_personnel : String
        mail_personnel : String
        tel_personnel : String
        ville_personnel : String
        id_statut : Int
        statut : Statut
        parcours : [Parcours]
        cours : [Cours]
        note : [Note]
    }

    type Parcours {
        id_parcours : Int
        nom_parcours : String
        programme : String
        id_personnel : Int
        id_pole : Int
        responsable : Personnel
        pole : Pole
        matiere : [Matiere]
        classe : [Classe]
    }

    type Matiere {
        id_matiere : Int
        nom_matiere : String
        id_parcours : Int
        parcours : Parcours  
        cours : [Cours]
        note : [Note]
    }

    type Classe {
        id_classe : Int
        nom_classe : String
        groupe : Int
        id_promo : Int
        id_parcours : Int
        promo : Promo
        parcours : Parcours
        etudiant : [Etudiant]
        cours : [Cours]
    }

    type Etudiant {
        id_etudiant : Int
        nom_etudiant : String
        prenom_etudiant : String
        mail_etudiant : String
        tel_etudiant : String
        anneeNaissance_etudiant : Int
        ville_etudiant : String
        id_classe : Int
        classe : Classe
        note : [Note]
    }

    type Cours {
        id_cours : Int
        date_cours : date
        heure_debut : time
        heure_fin : time
        formateur : Int
        id_matiere : Int
        id_classe : Int
        personnel : Personnel
        matiere : Matiere
        classe : Classe
    }

    type Note {
        id_note : Int
        date_note : date
        note : Int
        id_etudiant : Int
        id_matiere : Int
        formateur : Int
        etudiant : Etudiant
        matiere : Matiere
        personnel : Personnel
    }

    type Query {

    }

    type Mutation {
        
    }
`)

let root = {
    
}

app.use("/shcool", graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

app.listen(3000)