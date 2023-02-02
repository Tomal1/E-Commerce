const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ]
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
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
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
  // create a new tag
});

router.put('/:id', (req, res) => {
  console.log(req.body)
  console.log(req.params)
  Tag.update(req.body,{
    where: {
      id: req.params.id,
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
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

module.exports = router;
