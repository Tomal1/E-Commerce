const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    //links cat and pro models through fk and pk
    include: [Product]
  })
  .then(data =>{
    return res.json(data)
  })
  .catch(err =>{
    console.log(err)
    return res.status(500).json(err)
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {

  console.log(req.params.id)
  //used to find any property 
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  })
    .then(data =>{
      return res.json(data)
    })
    .catch(err =>{
      console.log(err)
      return res.status(400).json(err)
    })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {

  Category.create(req.body)
  .then(data =>{
    return res.json(data)
  })
  .catch(err =>{
    console.log(err)
    return res.status(400).json(err)
  })

  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
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
