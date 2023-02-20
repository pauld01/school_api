import express from "express"
import { buildSchema } from "graphql"
import { PrismaClient } from "@prisma/client"
import { graphqlHTTP } from "express-graphql"
import { count } from "console"

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
        getPersonnelByNom(nom_personnel : String!) : Personnel

        getParcours : [Parcours]
        getMatieres : [Matiere]
        getClasses : [Classe]
        
        getEtudiants : [Etudiant]
        getEtudiantByNom(nom : String!) : Etudiant
        getEtudiantsFromVille(ville_etudiant : String!) : [Etudiant]
        getAgeEtudiant(id_etudiant: Int!) : Int

        getCours : [Cours]

        getNotes : [Note]
        getMoyenneMatiere(id_matiere: Int!) : String
        
        getNumberEtudiantInClasse : Int
        getNumberEtudiantInParcours : Int
        getNumberEtudiantInPromo : Int
        getNumberEtudiantInPole : Int
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
        
        addParcours(nom_parcours: String!, programme: String, id_personnel: Int, id_pole: Int, nom_pole: String): [Parcours]
        removeParcours(id_parcours: Int!): [Parcours]
        updateParcours(id_parcours: Int!, nom_parcours: String, programme: String, id_personnel: Int!, id_pole: Int!, nom_pole: String): [Parcours]
        
        addMatiere(nom_matiere: String!, id_parcours: Int!): [Matiere]
        removeMatiere(id_matiere: Int!): [Matiere]
        updateMatiere(id_matiere: Int!, nom_matiere: String, id_parcours: Int!): [Matiere]
        
        addClasse(nom_classe: String!, groupe: Int!, id_parcours: Int!, nom_parcours: String, id_promo: Int, annees_promo: String): [Classe]
        removeClasse(id_classe: Int!): [Classe]
        updateClasse(id_classe: Int!, nom_classe: String!, groupe: Int!, id_parcours: Int!, nom_parcours: String, id_promo: Int, annees_promo: String): [Classe]
        
        addEtudiant(nom_etudiant: String!, prenom_etudiant: String, tel_etudiant: String, anneeNaissance_etudiant: Int, ville_etudiant: String, id_classe: Int): [Etudiant]
        removeEtudiant(id_etudiant: Int!): [Etudiant]
        updateEtudiant(id_etudiant: Int!, nom_etudiant: String, prenom_etudiant: String, mail_etudiant: String, tel_etudiant: String, anneeNaissance_etudiant: Int, ville_etudiant: String, id_classe: Int): [Etudiant]
        
        addCours(date_cours: String!, heure_debut: String!, heure_fin: String!, formateur: Int, id_matiere: Int, id_classe: Int): [Cours]
        removeCours(id_cours: Int!): [Cours]
        updateCours(id_cours: Int!, date_cours: String, heure_debut: String, heure_fin: String, formateur: Int, id_matiere: Int, id_classe: Int): [Cours]
        
        addNote(date_note: String!, note: Int!, id_etudiant: Int!, id_matiere: Int!, formateur: Int!): [Note]
        removeNote(id_note: Int!): [Note]
        updateNote(id_note: Int!, date_note: String, note: Int, id_etudiant: Int, id_matiere: Int, formateur: Int): [Note]
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
    getPersonnelByNom : async({nom_personnel}) => {
        return await prisma.personnel.findFirst({
            where:{
                nom_personnel : nom_personnel
            },
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
    addMatiere : async ({nom_matiere, id_parcours}) => {
        let nom = nom_matiere !== null ? nom_matiere : undefined
        
        await prisma.matiere.create({
            data:{
                nom_matiere : nom,
                id_parcours: id_parcours
            }
        })
        return await prisma.matiere.findMany({
            include: {
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    removeMatiere : async ({id_matiere}) => {
        await prisma.matiere.delete({
            where:{
                id_matiere : id_matiere 
            }
        })
        return await prisma.matiere.findMany({
            include: {
                parcours:{},
                cours:{},
                note:{}
            }
        })
    },
    updateMatiere : async ({id_matiere, nom_matiere, id_parcours}) => {               
        let nom = nom_matiere !== null ? nom_matiere : undefined
       
        await prisma.matiere.update({
            where: {
                id_matiere: id_matiere,
            },
            data:{
                nom_matiere : nom,
                id_parcours: id_parcours
            }
        })
        return await prisma.matiere.findMany({
            include: {
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
    addClasse : async ({nom_classe, groupe, id_parcours, id_promo}) => {
        await prisma.classe.create({
            data:{
                nom_classe : nom_classe,
                groupe : groupe,
                id_parcours: Number (id_parcours),
                id_promo: Number (id_promo)
            }
        })
        return await prisma.classe.findMany({
            include: {
                promo:{},
                parcours:{},
                etudiant:{},
                cours:{}
            }
        })
    },
    removeClasse : async ({id_classe}) => {
        await prisma.classe.delete({
            where:{
                id_classe : id_classe 
            }
        })
        return await prisma.classe.findMany({
            include: {
                promo:{},
                parcours:{},
                etudiant:{},
                cours:{}
            }
        })
    },
    updateClasse : async ({id_classe, nom_classe, groupe, id_parcours, nom_parcours, id_promo, annees_promo}) => {        
        let nom = nom_classe !== null ? nom_classe : undefined

        await prisma.classe.update({
            where: {
                id_classe: id_classe,
            },
            data:{
                nom_classe : nom_classe,
                groupe : groupe,
                id_parcours: Number (id_parcours),
                id_promo: Number (id_promo)
            }
        })
        return await prisma.classe.findMany({
            include: {
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
    getEtudiantByNom : async({nom}) => {
        return await prisma.etudiant.findFirst({
            where:{
                nom_etudiant : nom
            },
            include:{
                classe:{},
                note:{}
            }
        })
    },
    getEtudiantsFromVille : async({ville_etudiant}) => {
        return await prisma.etudiant.findMany({
            where:{
                ville_etudiant : ville_etudiant
            }
        })
    },
    getAgeEtudiant : async({id_etudiant}) => {
        let etudiant = await prisma.etudiant.findUnique({
            where:{
                id_etudiant : id_etudiant
            }
        })
        
        let current_year = new Date().getFullYear()
        let age = current_year - etudiant.anneeNaissance_etudiant

        return age;
    },
    addEtudiant : async ({nom_etudiant, prenom_etudiant, tel_etudiant, anneeNaissance_etudiant, ville_etudiant, id_classe}) => {
        let prenom = prenom_etudiant !== null ? prenom_etudiant : undefined
        let mail = prenom_etudiant+'.'+nom_etudiant+'@efrei.net'
        let tel = tel_etudiant !== null ? tel_etudiant : undefined
        let naissance = anneeNaissance_etudiant !== null ? anneeNaissance_etudiant : undefined
        let ville = ville_etudiant !== null ? ville_etudiant : undefined

        await prisma.etudiant.create({
            data:{
                nom_etudiant : nom_etudiant,
                prenom_etudiant : prenom,
                mail_etudiant : mail,
                tel_etudiant : tel,
                anneeNaissance_etudiant : naissance,
                ville_etudiant : ville, 
                classe: {
                    connect:{
                        id_classe : Number (id_classe)
                    }
                }
            }
        })
        return await prisma.etudiant.findMany({
            include: {
                classe:{},
                note:{}
            }
        })
    },
    removeEtudiant : async ({id_etudiant}) => {
        await prisma.etudiant.delete({
            where:{
                id_etudiant : id_etudiant 
            }
        })
        return await prisma.etudiant.findMany({
            include: {
                classe:{},
                note:{}
            }
        })
    },
    updateEtudiant : async ({id_etudiant, nom_etudiant, prenom_etudiant, mail_etudiant, tel_etudiant, anneeNaissance_etudiant, ville_etudiant, id_classe}) => {        
        let nom = nom_etudiant !== null ? nom_etudiant : undefined
        let prenom = prenom_etudiant !== null ? prenom_etudiant : undefined
        let mail = mail_etudiant !== null ? mail_etudiant : undefined
        let tel = tel_etudiant !== null ? tel_etudiant : undefined
        let naissance = anneeNaissance_etudiant !== null ? anneeNaissance_etudiant : undefined
        let ville = ville_etudiant !== null ? ville_etudiant : undefined

        await prisma.etudiant.update({
            where: {
              id_etudiant: id_etudiant,
            },
            data:{
                nom_etudiant : nom,
                prenom_etudiant : prenom,
                mail_etudiant : mail,
                tel_etudiant : tel,
                anneeNaissance_etudiant : naissance,
                ville_etudiant : ville, 
                classe: {
                    connect:{
                        id_classe : Number (id_classe)
                    }
                }
            }
        })
        return await prisma.etudiant.findMany({
            include: {
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
    addCours : async ({date_cours, heure_debut, heure_fin, formateur, id_matiere, id_classe}) => {
        await prisma.cours.create({
            data:{
                date_cours : new Date(date_cours),
                heure_debut : new Date(heure_debut),
                heure_fin : new Date(heure_fin),
                personnel: {
                    connect:{
                        id_personnel : Number (formateur)
                    }
                },
                matiere: {
                    connect:{
                        id_matiere : Number (id_matiere)
                    }
                },
                classe: {
                    connect:{
                        id_classe : Number (id_classe)
                    }
                }
            }
        })
        return await prisma.cours.findMany({
            include: {
                personnel:{},
                matiere:{},
                classe:{}
            }
        })
    },
    removeCours : async ({id_cours}) => {
        await prisma.cours.delete({
            where:{
                id_cours : id_cours 
            }
        })
        return await prisma.cours.findMany({
            include: {
                personnel:{},
                matiere:{},
                classe:{}
            }
        })
    },
    updateCours : async ({id_cours, date_cours, heure_debut, heure_fin, formateur, id_matiere, id_classe}) => {        
        await prisma.cours.update({
            where:{
                id_cours : id_cours 
            },
            data:{
                date_cours : date_cours,
                heure_debut : heure_debut,
                heure_fin : heure_fin,
                personnel: {
                    connect:{
                        formateur : Number (formateur)
                    }
                },
                matiere: {
                    connect:{
                        id_matiere : Number (id_matiere)
                    }
                },
                classe: {
                    connect:{
                        id_classe : Number (id_classe)
                    }
                }
            }
        })
        return await prisma.cours.findMany({
            include: {
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
    },
    addNote : async ({date_note, note, id_etudiant, id_matiere, formateur}) => {
        await prisma.note.create({
            data:{
                date_note : new Date(date_note),
                note : note,
                etudiant: {
                    connect:{
                        id_etudiant : Number (id_etudiant)
                    }
                },
                matiere: {
                    connect:{
                        id_matiere : Number (id_matiere)
                    }
                },
                personnel: {
                    connect:{
                        id_personnel : Number (formateur)
                    }
                }
            }
        })
        return await prisma.note.findMany({
            include: {
                etudiant:{},
                matiere:{},
                personnel:{}
            }
        })
    },
    removeNote : async ({id_note}) => {
        await prisma.note.delete({
            where:{
                id_note : id_note 
            }
        })
        return await prisma.note.findMany({
            include: {
                etudiant:{},
                matiere:{},
                personnel:{}
            }
        })
    },
    updateNote : async ({id_note, date_note, note, id_etudiant, id_matiere, formateur}) => {        
        await prisma.note.update({
            where:{
                id_note : id_note 
            },
            data:{
                date_note : new Date(date_note),
                note : note,
                etudiant: {
                    connect:{
                        id_etudiant : Number (id_etudiant)
                    }
                },
                matiere: {
                    connect:{
                        id_matiere : Number (id_matiere)
                    }
                },
                personnel: {
                    connect:{
                        id_personnel : Number (formateur)
                    }
                }
            }
        })
        return await prisma.note.findMany({
            include: {
                etudiant:{},
                matiere:{},
                personnel:{}
            }
        })
    },
    getMoyenneMatiere : async ({id_matiere}) => {       
        let notes = await prisma.note.findMany({
            where:{
                id_matiere : id_matiere
            }
        })

        let nb_notes = notes.length
        let total_notes = 0

        for (var i in notes) {
            total_notes = total_notes + notes[i].note
        }

        let moyenne = total_notes / nb_notes 

        return moyenne
    }
}

app.use("/school", graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

app.listen(3000)