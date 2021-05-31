const fs = require("fs");

const yargs = require('yargs');

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        console.log("Voici la liste des notes");

        fs.readFile('data.json','utf-8', (err,data) => {
            if (err) console.log(err);
            else {
                console.log(data);
                const notes = JSON.parse(data);
                console.log(notes);

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
        /*
        if ('data.json' != true) {
            let array = [];
            fs.writeFile("data.json", arrayshloug,(err) => {
                if(err) console.log(err);
                else {
                    console.log("Le fichier 'data.json' a été créé");
                }
            });
        }
        */
        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            /*
            else if ('data.json' != []) {
                const array = [];
                fs.writeFile("data.json",array,(err) => {
                    if(err) console.log(err);
                    else {
                        console.log("Un tableau a été créé");
                    }
                });
            } */
            else {
                console.log(data);
                const notes = JSON.parse(data);
                console.log(notes);

        // const lastNoteId = notes[notes.length -1].id;
        // console.log(lastNoteId);

                let newNote = {
                    // id: lastNoteId +1,
                    title: argv.title,
                    message: argv.message
                    };
                console.log(newNote);
                notes.push(newNote);
                console.log(notes);

                const newNotesJSON = JSON.stringify(notes);

                console.log(newNotesJSON);

                fs.writeFile("data.json",newNotesJSON,(err) => {
                    if(err) console.log(err);
                    else {
                        console.log("La note a été sauvegardé");
                    }
                });
            }
        })
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    builder: {
        delete: {
            describe: 'supprime une note',
            demandOption: true,
            type: 'string'
            }
        },
    handler: (argv) => {
        console.log("Chaud pour supprimer une note");

        fs.readFile('data.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            else {
                console.log(data);
                const notes = JSON.parse(data);
                console.log(notes);
                
                let newNote = argv.delete;
                console.log(newNote);
                console.log(notes[0].title);

                for(let i=0;i<=notes.length -1;i++) {
                    console.log(notes[i].title);
                    if (notes[i].title == newNote){
                        notes.splice(i, 1);
                    }
                }

                const newNotesJSON = JSON.stringify(notes);

                console.log(newNotesJSON);

                fs.writeFile("data.json",newNotesJSON,(err) => {
                    if(err) console.log(err);
                    else {
                        console.log("La note a été sauvegardé");
                    }
                });
                
            }
        })

    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    handler: () => {
        console.log("Voici le détail d'une note");
    }
}).argv;