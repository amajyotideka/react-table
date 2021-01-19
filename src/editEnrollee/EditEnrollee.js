import React from 'react';

class EditEnrollee extends React.Component {
  constructor(props) {
    super(props);
    console.log('EditEnrollee', props.formData);
  }

  render() {
    return <div>This is a modal</div>;
  }
}

export default EditEnrollee;