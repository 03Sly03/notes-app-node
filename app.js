const fs = require("fs");

const yargs = require('yargs');

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {

        fs.readFile('data.json','utf-8', (err,data) => {
            if (err) console.log(err);
            else {
                // console.log(data);
                const notes = JSON.parse(data);
                // console.log(notes);

                if (notes.length == 0) {
                    console.log('La liste est vide');
                } else {
                    console.log("Voici la liste des notes:");
                }
                notes.forEach(note => {
                    console.log(`${note.id}. ${note.title}`);
                })

                /*
                for(let i=0;i<=notes.length -1;i++) {
                    console.log(`${notes[i].id}. Le titre de ma note est "${notes[i].title}", et son message est "${notes[i].message}"`);
                }
                */
            }
        })
    }
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder: {
        title: {
            describe: 'Titre de la note',
            demandOption: true,
            type: 'string'
        },
        message: {
            describe: 'Message de la note',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        
        if (fs.existsSync('data.json')) {
            // console.log("le fichier existe");
        
            fs.readFile('data.json', 'utf-8', (err, data) => {
                if (err) console.log(err);
                else {
                    // console.log(data);
                    const notes = JSON.parse(data);
                    // console.log(notes.length);

                    if (notes.length == 0) {
                        // console.log('tableau vide');

                        let newNote = {
                            id: 1,
                            title: argv.title,
                            message: argv.message
                        };
                        notes.push(newNote);
                        // console.log(notes);
                       
                        const newNotesJSON = JSON.stringify(notes);

                        // console.log(newNotesJSON);
    
                        fs.writeFile("data.json",newNotesJSON,(err) => {
                            if(err) console.log(err);
                            else {
                                console.log("La note a été sauvegardé");
                            }
                        });
                    } else {

                    const lastNoteId = notes[notes.length -1].id;
                    // console.log(lastNoteId);

                    let newNote = {
                        id: lastNoteId +1,
                        title: argv.title,
                        message: argv.message
                    };
                    // console.log(newNote);
                    notes.push(newNote);
                    // console.log(notes);

                    const newNotesJSON = JSON.stringify(notes);

                    // console.log(newNotesJSON);

                    fs.writeFile("data.json",newNotesJSON,(err) => {
                        if(err) console.log(err);
                        else {
                            console.log("La note a été sauvegardé");
                        }
                    });
                }
            }
            })
        } else {
            console.log("le fichier n'existe pas");
            let newNote = [{
                id: 1,
                title: argv.title,
                message: argv.message
                }];
            
            const newNotesJSON = JSON.stringify(newNote);

            console.log(newNotesJSON);

            fs.writeFile("data.json",newNotesJSON,(err) => {
                if(err) console.log(err);
                else {
                    console.log("La note a été sauvegardée");
                }
            });
        }
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    builder: {
        id: {
            describe: 'l\'id de la note à supprimer',
            demandOption: true,
            type: 'number'
            }
        },
    handler: (argv) => {
        console.log("Suppression de la note...");
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            else {
                // console.log(data);
                const notes = JSON.parse(data);
                const notes1 = notes.length;
                // console.log(notes);
                
                let newNote = argv.id;
                // console.log(newNote);
                // console.log(notes[0].id);

                for(let i=0;i<=notes.length -1;i++) {
                    // console.log(notes[i].id);
                    if (notes[i].id == newNote){
                        notes.splice(i, 1);
                        console.log("La note a été supprimée")
                        break;
                    }
                    
                }

                const newNotesJSON = JSON.stringify(notes);
                const notes2 = notes.length;
                // console.log(newNotesJSON);

                fs.writeFile("data.json",newNotesJSON,(err) => {
                    if(err) console.log(err);
                    else {
                        if (notes1 === notes2) {
                            console.log(`Le numéro "${argv.id}" ne correspond à aucune note`);
                        }
                    }
                });
                
            }
        })
    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    builder: {
        id: {
            describe: 'L\'id de la note dont on veut afficher le message',
            demandOption: true,
            type: 'number'
            }
        },
    handler: (argv) => {

        fs.readFile('data.json','utf-8', (err,data) => {
            if (err) console.log(err);
            else {
                // console.log(data);
                const notes = JSON.parse(data);
                // console.log(notes);

                if (notes.length === 0) {
                    console.log("Impossible, la liste est vide");
                }

                let newNote = argv.id;
                // console.log(newNote);
                // console.log(notes[newNote -1]);
                // console.log("l'index :" + notes.indexOf(notes[newNote -1]));
                

                if (notes.indexOf(notes[newNote -1]) == -1) {
                    console.log("La note n'existe pas");
                } else {
                    
                    for(let i=0;i<=notes.length -1;i++) {
                        // console.log(notes[i].title);
                        if (notes[i].id == newNote) {
                            if (notes[i].message != undefined) {
                            console.log(`Voici le message de la note "${notes[i].title}":\n ${notes[i].message}`);
                            } else {
                                console.log("La note ne contient pas de message");
                            }
                        }
                    }
                }
            }
        })

    }
}).argv;