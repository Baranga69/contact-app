import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import uuid from "react-native-uuid";
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
  console.log(contact);
  setContacts([...contacts, {id: uuid.v4(),...contact}]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList)
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); 
  }, [contacts]);
  return (
    <div className='ui container'>
      <Router>
          <Header/>
          <Routes>
            <Route path= "/" 
              exact
              render={(props) => (
              <ContactList 
                  {...props} 
                  contacts={contacts} 
                  getContactId = {removeContactHandler}
                />
              )}
            />
            <Route path= "/add" 
             render = {(props) => (
               <AddContact 
               {...props} 
               addContactHandler={addContactHandler}/>
             )}
            />
            <Route path='/contact/:id'
            element={ContactDetail}/>
          </Routes>
        </Router>
    </div> 
  );
}

export default App;
