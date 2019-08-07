//libraries
const express = require('express');

//other files
const db = require('./data/hubs-model.js');

//global objects
const server = express();

//middleware(must have to successfully post code!)
server.use(express.json());

//request handler

// GET /
server.get('/', (req, res) => {
    //what am I sending back?
    res.send('Hello world');
})

// NOW /
server.get('now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now)
})

// GET /hubs
server.get('/hubs', (req, res) => {
    db.find()
    .then(hubs => {
        res.json(hubs);
    })

    .catch(err => {
        res.status(500).json({
            err:err
        })
    })
});

// POST /
server.post('/hubs', (req, res) => {
    const newHub = req.body;
    db.add(newHub)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'failed to create new hub'
    });
});

});

//DESTROY!!! /hubs/id
server.delete('/hubs/:id', (req,res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deleteHub => {
            if(deleteHub) {
                res.json(deleteHub);
            } else {
                res.status(404).json({
                    message: 'invalid hub id'
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'failed to create new hub'
        });
    });

});

//PUT /hubs/:id
server.put('/hubs/:id', (req, res) => {
const {id} = req.params;
const changes = req.body

db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'invalid hub id'
            })
        }
})
    .catch(err => {
        res.status(500).json({
            err:err,
            message: 'failed to update hub'
        });
    });
});

server.get('/hubs/:id', (req, res) => {
       
});

//should be last step in code.
server.listen(4000, () =>{
    console.log('Server is running on port 4000...');
});
