const express = require('express')
const router = express.Router()

const Item = require('../models/items')

//Create
router.post('/', async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.status(201).json(item)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

//Read
router.get('/', async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

//Read one
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({ message: 'Item not found' })
        else res.json(item)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

//update
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body)
        if (!item) return res.status(404).json({ message: 'Item not found' })
        res.json(item)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

// Delete all 
router.delete('/', async (req, res) => {
  try {
    const result = await Item.deleteMany({})
    res.json({ message: 'All items deleted', deletedCount: result.deletedCount })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

//delete one
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        if(!item) return res.status(404).json({message: 'Item not found'})
        res.json({message : 'Item Deleted'})    
    } catch (err) {
        res.status(400).json({error : err.message})
    }
});

module.exports = router;