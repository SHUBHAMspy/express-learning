const express = require('express')
const router = express.Router()

const courses = [
    {'id': 1,'name': 'course1'},
    {'id': 2,'name': 'course2'},
    {'id': 3,'name': 'course3'}
]

// Handling get request to our endpoint/URL
router.get('/',(req,res) =>{
    res.send(courses)
})
router.get('/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {    
        res.status(404).send("The Course you requested was not found")
        return
    }    
    res.send(course)
})

router.get('/blogs/:month/:year',(req,res) =>{
    res.send(req.params)
})

// Handling post request to our endpoint/URL
router.post('/',(req,res) =>{

    //Before reading and creating a new course from the request message body we need to to validate the info or the input in the message
    //And to validate we need to define a validation schema.
        let {error} = validateRequestObject(req.body);

        if (error) {
            res.status(400).send(error.details[0].message)
            return
        }

    // Otherwise Create a new course object on the server after reading it from the request
    const course = {
        id:courses.length + 1,
        name:req.body.name
    }
    // Add this new coursewhich is an object into courses list/array
    courses.push(course)
    
    //Now by conventiona server should return this newly created object on the server to the client
    // to make it aware and better track the resource which has been created
    res.send(course)
})

// Handling put request to our endpoint/URL
router.put('/:id',(req,res) =>{
    // locate the requested file/object
    // If it is not existing then return 404 staus code-not found message
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if(!course) {    
            res.status(404).send("The Course you requested was not found")
            return
        }
    // If existing then validate the request message body
    // And if it seems invalid,return with a status code of 400-bad request
    let {error} = validateRequestObject(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    // And if it is validated then Update the course
    // and send the response of the updated course back to the client
    course.name = req.body.name;
    res.send(course);
})

// Handling delete request to our endpoint/URL
router.delete("/:id",(req,res) =>{
     // locate the requested file/object
    // If it is not existing then return 404 staus code-not found message
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) {    
        res.status(404).send("The Course you requested was not found")
        return
    }
    //If found then delete it
    // and return the deleted item/object in reponse
    let index = courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)
})

function validateRequestObject(object) {
    const schema=
        Joi.object({
            name:Joi.string().min(3).required()
        })
    
        return schema.validate(object)
    
}

module.exports = router