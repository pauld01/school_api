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
        annees_promo : String
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
        date_cours : String
        heure_debut : String
        heure_fin : String
        formateur : Int
        id_matiere : Int
        id_classe : Int
        personnel : Personnel
        matiere : Matiere
        classe : Classe
    }

    type Note {
        id_note : Int
        date_note : String
        note : Int
        id_etudiant : Int
        id_matiere : Int
        formateur : Int
        etudiant : Etudiant
        matiere : Matiere
        personnel : Personnel
    }

    type Query {
        getPoles : [Pole]
        getStatuts : [Statut]
        getPromos : [Promo]
        getPersonnels : [Personnel]
        getParcours : [Parcours]
        getMatieres : [Matiere]
        getClasses : [Classe]
        getEtudiants : [Etudiant]
        getCours : [Cours]
        getNotes : [Note]
    }

    type Mutation {
        addPole(nom_pole: String!): [Pole]
        removePole(id_pole: Int!): [Pole]
        updatePole(id_pole: Int!, nom_pole: String!): [Pole]
        addStatut(nom_statut: String!): [Statut]
        removeStatut(id_statut: Int!): [Statut]
        updateStatut(id_statut: Int!, nom_statut: String!): [Statut]
        addPromo(annees_promo: String!): [Promo]
        removePromo(id_promo: Int!): [Promo]
        updatePromo(id_promo: Int!, annees_promo: String!): [Promo]
        addPersonnel(nom_personnel: String!, prenom_personnel: String, mail_personnel: String, tel_personnel: String, ville_personnel: String, id_statut: Int!, nom_statut: String): [Personnel]
        removePersonnel(id_personnel: Int!): [Personnel]
        updatePersonnel(id_personnel: Int!, nom_personnel: String, prenom_personnel: String, mail_personnel: String, tel_personnel: String, ville_personnel: String, id_statut: Int!, nom_statut: String): [Personnel]
        addParcours(nom_parcours: String!, programme: String, id_personnel: Int!, id_pole: Int!, nom_pole: String): [Parcours]
        removeParcours(id_parcours: Int!): [Parcours]
        updateParcours(id_parcours: Int!, nom_parcours: String, programme: String, id_personnel: Int!, id_pole: Int!, nom_pole: String): [Parcours]
    }
`)

let root = {
    getPoles : async () => {
        return await prisma.pole.findMany({
            include:{parcours:{}}
        })
    },
    addPole : async ({nom_pole}) => {
        await prisma.pole.create({
            data:{
                nom_pole : nom_pole
            }
        })
        return await prisma.pole.findMany({
            include: {parcours:{}}
        })
    },
    removePole : async ({id_pole}) => {
        await prisma.pole.delete({
            where:{
                id_pole : id_pole 
            }
        })
        return await prisma.pole.findMany({
            include: {parcours:{}}
        })
    },
    updatePole : async ({id_pole, nom_pole}) => {        
        await prisma.pole.update({
            where: {
              id_pole: id_pole,
            },
            data: {
                nom_pole: nom_pole,
            }
        })
        return await prisma.pole.findMany({
            include: {parcours:{}}
        })
    },
    getStatuts : async () => {
        return await prisma.statut.findMany({
            include:{personnel:{}}
        })
    },
    addStatut : async ({nom_statut}) => {
        await prisma.statut.create({
            data:{
                nom_statut : nom_statut
            }
        })
        return await prisma.statut.findMany({
            include: {personnel:{}}
        })
    },
    removeStatut : async ({id_statut}) => {
        await prisma.statut.delete({
            where:{
                id_statut : id_statut 
            }
        })
        return await prisma.statut.findMany({
            include: {personnel:{}}
        })
    },
    updateStatut : async ({id_statut, nom_statut}) => {        
        await prisma.statut.update({
            where: {
              id_statut: id_statut,
            },
            data: {
                nom_statut: nom_statut,
            }
        })
        return await prisma.statut.findMany({
            include: {personnel:{}}
        })
    },
    getPromos : async () => {
        return await prisma.promo.findMany({
            include:{classe:{}}
        })
    },
    addPromo : async ({annees_promo}) => {
        await prisma.promo.create({
            data:{
                annees_promo : annees_promo
            }
        })
        return await prisma.promo.findMany({
            include: {classe:{}}
        })
    },
    removePromo : async ({id_promo}) => {
        await prisma.promo.delete({
            where:{
                id_promo : id_promo 
            }
        })
        return await prisma.promo.findMany({
            include: {classe:{}}
        })
    },
    updatePromo : async ({id_promo, annees_promo}) => {        
        await prisma.promo.update({
            where: {
              id_promo: id_promo,
            },
            data: {
                annees_promo: annees_promo,
            }
        })
        return await prisma.promo.findMany({
            include: {classe:{}}
        })
    },
    getPersonnels : async () => {
        return await prisma.personnel.findMany({
            include:{
                statut:{},
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    addPersonnel : async ({nom_personnel, prenom_personnel, mail_personnel, tel_personnel, ville_personnel, id_statut, nom_statut}) => {
        let prenom = prenom_personnel !== null ? prenom_personnel : undefined
        let mail = mail_personnel !== null ? mail_personnel : undefined
        let tel = tel_personnel !== null ? tel_personnel : undefined
        let ville = ville_personnel !== null ? ville_personnel : undefined

        await prisma.personnel.create({
            data:{
                nom_personnel : nom_personnel,
                prenom_personnel : prenom,
                mail_personnel : mail,
                tel_personnel : tel,
                ville_personnel : ville, 
                statut: {
                    connectOrCreate :
                    {
                        where : {
                            id_statut : Number (id_statut)
                        },
                        create:{
                            nom_statut : nom_statut
                        }
                    }
                }
            }
        })
        return await prisma.personnel.findMany({
            include: {
                statut:{},
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    removePersonnel : async ({id_personnel}) => {
        await prisma.personnel.delete({
            where:{
                id_personnel : id_personnel 
            }
        })
        return await prisma.personnel.findMany({
            include: {
                statut:{},
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    updatePersonnel : async ({id_personnel, nom_personnel, prenom_personnel, mail_personnel, tel_personnel, ville_personnel, id_statut, nom_statut}) => {        
        let nom = nom_personnel !== null ? nom_personnel : undefined
        let prenom = prenom_personnel !== null ? prenom_personnel : undefined
        let mail = mail_personnel !== null ? mail_personnel : undefined
        let tel = tel_personnel !== null ? tel_personnel : undefined
        let ville = ville_personnel !== null ? ville_personnel : undefined
        
        await prisma.personnel.update({
            where: {
              id_personnel: id_personnel,
            },
            data: {
                nom_personnel: nom,
                prenom_personnel: prenom,
                mail_personnel: mail,
                tel_personnel: tel,
                ville_personnel: ville,
                statut: {
                    connectOrCreate :
                    {
                        where : {
                            id_statut : Number (id_statut)
                        },
                        create:{
                            nom_statut : nom_statut
                        }
                    }
                }
            }
        })
        return await prisma.personnel.findMany({
            include: {
                statut:{},
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    getParcours : async () => {
        return await prisma.parcours.findMany({
            include:{
                personnel:{},
                pole:{},
                matiere:{},
                classe:{}
            }
        })
    },
    addParcours : async ({nom_parcours, programme, id_personnel, id_pole, nom_pole}) => {
        let programme_parcours = programme !== null ? programme : undefined
        let pole = nom_pole !== null ? nom_pole : undefined

        await prisma.parcours.create({
            data:{
                nom_parcours : nom_parcours,
                programme : programme_parcours,
                responsable: {
                    connect:{
                        id_personnel : Number (id_personnel)
                    }
                },
                pole: {
                    connectOrCreate :
                    {
                        where : {
                            id_pole : Number (id_pole)
                        },
                        create:{
                            nom_pole : pole
                        }
                    }
                }
            }
        })
        return await prisma.parcours.findMany({
            include: {
                responsable:{},
                pole:{},
                matiere:{},
                classe:{}
            }
        })
    },
    removeParcours : async ({id_parcours}) => {
        await prisma.parcours.delete({
            where:{
                id_parcours : id_parcours 
            }
        })
        return await prisma.parcours.findMany({
            include: {
                responsable:{},
                pole:{},
                matiere:{},
                classe:{}
            }
        })
    },
    updateParcours : async ({id_parcours, nom_parcours, programme, id_personnel, id_pole, nom_pole}) => {        
        let nom = nom_parcours !== null ? nom_parcours : undefined
        let programme_parcours = programme !== null ? programme : undefined
        let pole = nom_pole !== null ? nom_pole : undefined
        
        await prisma.parcours.update({
            where: {
              id_parcours: id_parcours,
            },
            data: {
                nom_parcours: nom,
                programme: programme_parcours,
                responsable: {
                    connect:{
                        id_personnel : Number (id_personnel)
                    }
                },
                pole: {
                    connectOrCreate :
                    {
                        where : {
                            id_pole : Number (id_pole)
                        },
                        create:{
                            nom_pole : pole
                        }
                    }
                }
            }
        })
        return await prisma.parcours.findMany({
            include: {
                responsable:{},
                pole:{},
                matiere:{},
                classe:{}
            }
        })
    },
    getMatieres : async () => {
        return await prisma.matiere.findMany({
            include:{
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    getClasses : async () => {
        return await prisma.classe.findMany({
            include:{
                promo:{},
                parcours:{},
                etudiant:{},
                cours:{}
            }
        })
    },
    getEtudiants : async () => {
        return await prisma.etudiant.findMany({
            include:{
                classe:{},
                note:{}
            }
        })
    },
    getCours : async () => {
        return await prisma.cours.findMany({
            include:{
                personnel:{},
                matiere:{},
                classe:{}
            }
        })
    },
    getNotes : async () => {
        return await prisma.note.findMany({
            include:{
                etudiant:{},
                personnel:{},
                matiere:{}
            }
        })
    }
}

app.use("/school", graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

app.listen(3000)