exports.getPatients = (req, res) => {
    res.send('View Patients');
  };
  
  exports.addPatient = (req, res) => {
    res.send('Add Patient');
  };
  
  exports.updatePatient = (req, res) => {
    res.send(`Update Patient with ID ${req.params.id}`);
  };
  