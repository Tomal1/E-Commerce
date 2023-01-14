const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    //this inculded other tableds
    include: [
      {
        //name of othere tables
        model: Product,
        //will pass this
        through: ProductTag,
      },
    ]
  })
  .then(data =>{
    return res.status(200).json(data)
  })
  .catch(err =>{
    console.log(err)
    return res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        //name of othere tables
        model: Product,
        //will pass this
        through: ProductTag,
      },
    ]
  })
  .then(data=>{
    return res.status(200).json(data)
  })
  .then(data=>{
    return res.status(500).json(data)
  })
  
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(data=>{
    return res.status(200).json(data)
  })
  .catch(err=>{
    return res.status(500).json(err)
  })
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where: {
      id: req.body.id,
    }
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
  
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then(data =>{
      return res.json(data)
    })
    .catch(err =>{
      console.log(err)
      return res.status(400).json(err)
    })
});

module.exports = router;
