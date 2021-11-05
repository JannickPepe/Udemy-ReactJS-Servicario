//This is the file for creating a service
import React, { useState } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { createService } from '../../actions';
import { Redirect } from 'react-router-dom';

//create function ServiceCreate which will have values from auth and can now get the following array functions into its useState
const ServiceCreate = ({auth}) => {
    //Make the array and pass values into it and set a useState at the end. It will have mathematics as standard and if you refresh, 
    //it will go back to mathemactics by redirect 
    const [ redirect, setRedirect ] = useState(false)
    const [ serviceForm, setServiceForm ] = useState({
        category: 'mathematics',
        title: '',
        description: '',
        image: '',
        price: null
        })
        
        //Make the function handleChange into e (event) and pass name and value into it on e.target. 
        //Take all the values from serviceForm by ea6 ... pronounce and show the name from the array and then value
        const handleChange = e => {
        const { name, value } = e.target 
        setServiceForm({...serviceForm, [name]: value})
        }
        
        //make handleSubmit with an empty arrow function, pass it into user which is set into auth so you then can have the createService function 
        //with the given values have callbacks for setRedirect on true and an alert
        const handleSubmit = () => {
            const { user } = auth 
            createService(serviceForm, user.uid)
            .then(() => setRedirect(true))
            .catch(() => alert('SOME ERROR'))
        }
    if (redirect) { return <Redirect to ="/" /> }

  //the style setup for creating a service with dropdown menu containing different categories, the information that needs to be written and a price selector 
  //get invoked by onchange={handleChange/handleSubmit}
  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                <select name="category" onChange={handleChange}>
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                    onChange={handleChange}
                    name="title"
                  className="input"
                  type="text"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="textarea"
                  placeholder="Textarea"></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                onChange={handleChange}
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                 onChange={handleChange}
                  name="price"
                  className="input"
                  type="number"
                  placeholder="Text input" />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  onClick={handleSubmit}
                  type="button" 
                  className="button is-link">Create</button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withAuthorization(ServiceCreate); 